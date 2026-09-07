#!/usr/bin/env python3
"""
Hero画像4枚の色調統一スクリプト

- hero-senior.jpg を基準トーンとして、ホワイトバランス（色温度）・輝度・彩度を
  他3枚に寄せる。基準自身は実質無補正（統計差ゼロ → ゲイン≒1.0）。
- さらに「明部脱飽和（ハイライトブルーム制御）」で、逆光の窓・電球など白飛び際の
  暖色かぶり（主に hero-family の黄金グロー）を明部だけ選択的に鎮める。
  中間調（肌・木部）には触れないので温かみは保たれる。
- 構図・人物・部屋の配置は一切変更しない。
  ピクセルの移動・切り抜き・変形・生成は行わず、色調（明度/彩度/色温度）の
  数値補正のみを適用する。
- 元画像は client/scripts/hero-backups/_originals/ にバックアップしてから上書き。
  （public/ 配下の外に置くことで dist/ 出力には確実に含めない）
- 再実行: 冒頭パラメータを変えて再度実行すると、_originals/ のバックアップを
  入力として再処理する（画像を生成し直す必要はない）。

指標の考え方（4枚は逆光/タングステン等トーン分布が大きく異なるため、
フレーム全体平均は白壁・光源の面積に引きずられる。そこで内容に頑健な指標を使う）:
  - ホワイトバランス … 明部帯（本来ニュートラルな白壁・窓）の平均色を基準へ合わせる
  - 輝度            … 中間調の中央値（median）を基準へ合わせる
  - 彩度            … 「色のある画素」だけの平均彩度を基準へ合わせる（白壁・黒を除外）

依存: Pillow, numpy  （pip install --break-system-packages pillow numpy）
"""

from __future__ import annotations

import shutil
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

# ============================================================
# 調整パラメータ（ここだけ変えれば再実行できる）
# ============================================================
REPO_ROOT = Path(__file__).resolve().parent.parent
HERO_DIR = REPO_ROOT / "client" / "public" / "images" / "hero"
# バックアップ先は public/ の外（Viteは public/ を無条件に dist/ へコピーするため）
BACKUP_DIR = REPO_ROOT / "client" / "scripts" / "hero-backups" / "_originals"

REFERENCE_FILE = "hero-senior.jpg"
TARGET_FILES = ["hero-family.jpg", "hero-hobby.jpg", "hero-solo.jpg", "hero-senior.jpg"]

# 補正強度（0=無補正 / 1=基準の指標に完全一致）。部分適用で自然さを残す。
WB_STRENGTH          = 0.70   # 明部帯のホワイトバランスを基準へ寄せる割合
BRIGHTNESS_STRENGTH  = 0.55   # 中間調輝度を基準へ寄せる割合
SATURATION_STRENGTH  = 0.65   # 有彩画素の平均彩度を基準へ寄せる割合

# 補正量の上限（やり過ぎ防止 = 温かみ・信頼感・落ち着きを守るためのガード）
MAX_WB_GAIN     = 1.10          # R/B チャンネルゲインは ±10% まで
MIN_WB_GAIN     = 1.0 / MAX_WB_GAIN
MAX_BRIGHTNESS  = 1.12
MIN_BRIGHTNESS  = 0.90
MAX_SATURATION  = 1.12          # 彩度倍率の上限（超えるとSNSフィルター的な不自然さ）
MIN_SATURATION  = 0.82          # 下限（超えて落とすと生気のない発色になる）

# --- 明部脱飽和（ハイライトブルーム制御）---
# 白飛び際の暖色かぶりを、明部だけ選択的に脱飽和して抑える。中間調には無影響。
BLOOM_CONTROL_ENABLED = True
BLOOM_SKIP_REFERENCE  = True   # 基準(senior)には明部脱飽和をかけない（原本を保つ）
BLOOM_LUMA_THRESHOLD  = 0.80   # この輝度から上を対象にする
BLOOM_DESAT_MAX       = 0.65   # 輝度1.0地点での最大脱飽和率（1.0で完全グレー）
BLOOM_STRENGTH        = 1.00   # 全体強度（0で実質無効）
BLOOM_FALLOFF         = 1.6    # 立ち上がりカーブ（>1でしきい値付近を緩やかに）
BLOOM_WARM_ONLY       = True   # 暖色かぶり(R>=B)の明部だけ対象（青空・緑を守る）

# 温かみの床: 補正後の「中間調」R/B比が、基準の中間調R/Bのこの割合を下回らないようにする
# （明部脱飽和で明部が中和されても、肌・木部など中間調の温かみは守る）
WARMTH_FLOOR_MID_RB_RATIO = 0.92

# 明部帯（ホワイトバランスの基準にする＝本来ニュートラルであるべき白壁・窓）
HL_LUMA_MIN = 0.72
HL_LUMA_MAX = 0.985            # 完全な白飛び(=1.0)は色情報が無いので除外

# 中間調（輝度・中間調R/Bの基準）
MID_LUMA_MIN = 0.05
MID_LUMA_MAX = 0.97

# 有彩画素（彩度の基準）: 一定以上の彩度があり、かつ適正露出の画素のみ
VIVID_SAT_MIN  = 0.18
VIVID_LUMA_MIN = 0.12
VIVID_LUMA_MAX = 0.90

# R/B比 1% あたりの色温度換算（報告用のみ・近似値）
KELVIN_PER_RB_PERCENT = 55.0

JPEG_QUALITY = 92
# 検証用 BEFORE/AFTER 対比シートの出力先（OSの一時ディレクトリ。リポジトリは汚さない）
COMPARE_SHEET = Path(tempfile.gettempdir()) / "hero_grade_compare.png"
# ============================================================


def rgb_to_luma(arr: np.ndarray) -> np.ndarray:
    """arr: ...x3 float 0..1 (sRGB) -> Rec.709輝度 0..1"""
    return 0.2126 * arr[..., 0] + 0.7152 * arr[..., 1] + 0.0722 * arr[..., 2]


def rgb_to_sat(arr: np.ndarray) -> np.ndarray:
    """HSV彩度 0..1"""
    mx = arr.max(axis=-1)
    mn = arr.min(axis=-1)
    return np.where(mx <= 1e-12, 0.0, (mx - mn) / np.maximum(mx, 1e-12))


def measure(arr: np.ndarray) -> dict:
    """内容に頑健な指標を返す"""
    luma = rgb_to_luma(arr)
    sat = rgb_to_sat(arr)

    hl = (luma >= HL_LUMA_MIN) & (luma <= HL_LUMA_MAX)
    if hl.sum() < 200:
        hl = luma >= np.quantile(luma, 0.90)
    hl_rgb = arr[hl].mean(axis=0)

    mid = (luma >= MID_LUMA_MIN) & (luma <= MID_LUMA_MAX)
    if not mid.any():
        mid = np.ones_like(luma, dtype=bool)
    mid_luma = float(np.median(luma[mid]))
    mid_rgb = arr[mid].mean(axis=0)

    vivid = (sat >= VIVID_SAT_MIN) & (luma >= VIVID_LUMA_MIN) & (luma <= VIVID_LUMA_MAX)
    if vivid.sum() < 200:
        vivid = sat >= np.quantile(sat, 0.75)
    vivid_sat = float(sat[vivid].mean())

    return {
        "hl_rgb": hl_rgb,
        "rb": float(hl_rgb[0] / max(hl_rgb[2], 1e-6)),          # 明部R/B（WB用）
        "mid_luma": mid_luma,
        "mid_rb": float(mid_rgb[0] / max(mid_rgb[2], 1e-6)),    # 中間調R/B（温かみの床用）
        "vivid_sat": vivid_sat,
    }


# ---------- 補正（すべて色調のみ・構図不変） ----------
def apply_white_balance(arr: np.ndarray, img: dict, ref: dict):
    ir, rr = img["hl_rgb"], ref["hl_rgb"]
    gr_full = (rr[0] / rr[1]) / (ir[0] / ir[1])
    gb_full = (rr[2] / rr[1]) / (ir[2] / ir[1])
    gr = float(np.clip(1 + WB_STRENGTH * (gr_full - 1), MIN_WB_GAIN, MAX_WB_GAIN))
    gb = float(np.clip(1 + WB_STRENGTH * (gb_full - 1), MIN_WB_GAIN, MAX_WB_GAIN))
    out = arr.copy()
    out[..., 0] *= gr
    out[..., 2] *= gb
    return np.clip(out, 0, 1), (gr, gb)


def apply_brightness(arr: np.ndarray, img: dict, ref: dict):
    f_full = ref["mid_luma"] / max(img["mid_luma"], 1e-6)
    f = float(np.clip(1 + BRIGHTNESS_STRENGTH * (f_full - 1), MIN_BRIGHTNESS, MAX_BRIGHTNESS))
    return np.clip(arr * f, 0, 1), f


def apply_saturation(arr: np.ndarray, img: dict, ref: dict):
    f_full = ref["vivid_sat"] / max(img["vivid_sat"], 1e-6)
    f = float(np.clip(1 + SATURATION_STRENGTH * (f_full - 1), MIN_SATURATION, MAX_SATURATION))
    luma = rgb_to_luma(arr)[..., None]
    return np.clip(luma + f * (arr - luma), 0, 1), f


def apply_bloom_control(arr: np.ndarray, is_reference: bool = False):
    """明部だけを選択的に脱飽和（輝度保存）。中間調・暗部は不変。"""
    if not BLOOM_CONTROL_ENABLED or BLOOM_STRENGTH <= 0 or (is_reference and BLOOM_SKIP_REFERENCE):
        return arr, {"affected_pct": 0.0, "mean_desat": 0.0, "max_desat": 0.0}

    luma = rgb_to_luma(arr)
    ramp = np.clip((luma - BLOOM_LUMA_THRESHOLD) / max(1.0 - BLOOM_LUMA_THRESHOLD, 1e-6), 0.0, 1.0)
    ramp = ramp ** BLOOM_FALLOFF
    desat = ramp * BLOOM_DESAT_MAX * BLOOM_STRENGTH        # 0..BLOOM_DESAT_MAX

    if BLOOM_WARM_ONLY:
        warm = arr[..., 0] >= arr[..., 2]                  # R>=B の暖色かぶりのみ
        desat = desat * warm

    scale = (1.0 - desat)[..., None]                       # 彩度スケール（<1で脱飽和）
    out = luma[..., None] + scale * (arr - luma[..., None])
    out = np.clip(out, 0, 1)

    aff = desat > 0.01
    stats = {
        "affected_pct": float(aff.mean() * 100),
        "mean_desat": float(desat[aff].mean() * 100) if aff.any() else 0.0,
        "max_desat": float(desat.max() * 100),
    }
    return out, stats


def enforce_warmth_floor(arr: np.ndarray, floor_mid_rb: float):
    st = measure(arr)
    if st["mid_rb"] >= floor_mid_rb:
        return arr, (1.0, 1.0)
    need = floor_mid_rb / st["mid_rb"]
    gr = float(np.clip(need ** 0.5, 1.0, MAX_WB_GAIN))
    gb = float(np.clip(1.0 / (need ** 0.5), MIN_WB_GAIN, 1.0))
    out = arr.copy()
    out[..., 0] *= gr
    out[..., 2] *= gb
    return np.clip(out, 0, 1), (gr, gb)


# ---------- 入出力 ----------
def load_source(name: str) -> np.ndarray:
    live = HERO_DIR / name
    bak = BACKUP_DIR / name
    if not bak.exists():
        BACKUP_DIR.mkdir(parents=True, exist_ok=True)
        shutil.copy2(live, bak)  # 生バイトコピー（再エンコードしない = 完全な原本を保持）
        print(f"  backup作成: {bak}")
    src = bak if bak.exists() else live
    return np.asarray(Image.open(src).convert("RGB"), dtype=np.float64) / 255.0


def save_image(arr: np.ndarray, name: str):
    Image.fromarray(np.round(arr * 255).astype(np.uint8), "RGB").save(
        HERO_DIR / name, "JPEG", quality=JPEG_QUALITY
    )


def build_compare_sheet(rows):
    cell_w, pad, label_h = 460, 12, 22
    thumbs = []
    for name, before, after in rows:
        h = int(before.shape[0] * (cell_w / before.shape[1]))
        b = Image.fromarray(np.round(before * 255).astype(np.uint8)).resize((cell_w, h))
        a = Image.fromarray(np.round(after * 255).astype(np.uint8)).resize((cell_w, h))
        thumbs.append((name, b, a, h))
    cell_h = thumbs[0][3]
    sheet = Image.new(
        "RGB",
        (pad + len(thumbs) * (cell_w + pad), pad + 2 * (label_h + cell_h + pad)),
        (245, 245, 245),
    )
    d = ImageDraw.Draw(sheet)
    for i, (name, b, a, _h) in enumerate(thumbs):
        x = pad + i * (cell_w + pad)
        d.text((x, 2), f"BEFORE  {name}", fill=(20, 20, 20))
        sheet.paste(b, (x, label_h))
        y2 = label_h + cell_h + pad
        d.text((x, y2 + 2), f"AFTER   {name}", fill=(20, 20, 20))
        sheet.paste(a, (x, y2 + label_h))
    COMPARE_SHEET.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(COMPARE_SHEET, "PNG")
    print(f"\n対比シート: {COMPARE_SHEET}")


def fmt_pct(x: float) -> str:
    return f"{(x - 1) * 100:+.1f}%"


def main() -> int:
    if not HERO_DIR.exists():
        print(f"ERROR: {HERO_DIR} が存在しません", file=sys.stderr)
        return 1

    print(f"基準トーン: {REFERENCE_FILE}")
    ref_stats = measure(load_source(REFERENCE_FILE))
    floor_mid_rb = ref_stats["mid_rb"] * WARMTH_FLOOR_MID_RB_RATIO
    print(
        f"  基準指標  中間調輝度={ref_stats['mid_luma']*255:5.1f}  "
        f"有彩平均彩度={ref_stats['vivid_sat']*100:4.1f}%  "
        f"明部R/B={ref_stats['rb']:.3f}  中間調R/B={ref_stats['mid_rb']:.3f}"
    )
    print(f"  温かみの床（中間調R/B下限）= {floor_mid_rb:.3f}\n")

    rows = []
    for name in TARGET_FILES:
        src = load_source(name)
        before = measure(src)

        arr, (wb_r, wb_b) = apply_white_balance(src, before, ref_stats)
        arr, br_f = apply_brightness(arr, before, ref_stats)
        arr, sat_f = apply_saturation(arr, before, ref_stats)
        arr, bloom = apply_bloom_control(arr, is_reference=(name == REFERENCE_FILE))
        arr, (fl_r, fl_b) = enforce_warmth_floor(arr, floor_mid_rb)

        after = measure(arr)
        save_image(arr, name)
        rows.append((name, src, arr))

        rb_change_pct = (after["rb"] / before["rb"] - 1) * 100
        kelvin_equiv = -rb_change_pct * KELVIN_PER_RB_PERCENT
        wb_r_tot, wb_b_tot = wb_r * fl_r, wb_b * fl_b

        print(f"■ {name}")
        print(
            f"    中間調輝度   {before['mid_luma']*255:5.1f} → {after['mid_luma']*255:5.1f}"
            f"   （明度補正 ×{br_f:.3f} = {fmt_pct(br_f)}）"
        )
        print(
            f"    有彩平均彩度 {before['vivid_sat']*100:4.1f}% → {after['vivid_sat']*100:4.1f}%"
            f"   （彩度補正 ×{sat_f:.3f} = {fmt_pct(sat_f)}）"
        )
        print(
            f"    明部R/B      {before['rb']:.3f} → {after['rb']:.3f}"
            f"   （WB R×{wb_r_tot:.3f} B×{wb_b_tot:.3f}"
            f" ≒ 色温度 {kelvin_equiv:+.0f}K 相当 {'クール方向' if kelvin_equiv > 0 else '暖色方向'}・近似）"
        )
        print(
            f"    中間調R/B    {before['mid_rb']:.3f} → {after['mid_rb']:.3f}"
            + ("  ※温かみ床で微調整" if (fl_r, fl_b) != (1.0, 1.0) else "")
        )
        if bloom["affected_pct"] > 0:
            print(
                f"    明部脱飽和   対象 {bloom['affected_pct']:.1f}%px / "
                f"平均 -{bloom['mean_desat']:.1f}% / 最大 -{bloom['max_desat']:.1f}%"
            )
        print()

    build_compare_sheet(rows)
    print(f"完了。元画像は {BACKUP_DIR} にあります。パラメータを変えて再実行可能です。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
