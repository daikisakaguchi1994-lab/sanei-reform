/**
 * ヒーロー画像（PC用の横長・スマホ用の切り抜き）と、共有用の og-image.jpg を作る。
 *
 * 使い方（リポジトリ直下で）:
 *   SHARP_FROM=C:/projects/clients/tyd-web/node_modules/sharp \
 *   SRC=C:/projects/_archive/sanei-hero_20261107/sources \
 *   node client/scripts/make-hero-images.mjs
 *   ※ このプロジェクトには sharp を依存に入れていない。別案件の node_modules を借りる。
 *
 * 入力: SRC の PNG（Codex で生成した元画像）
 * 出力: client/public/images/hero/<id>-<幅>.webp、<id>-sp-<幅>.webp、client/public/og-image.jpg
 * スライドの一覧と順番は client/src/lib/heroSlides.ts。写真を足したらここにも足す。
 */
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_FROM || "sharp");

const SRC = process.env.SRC;
if (!SRC) throw new Error("SRC（元画像のフォルダ）を指定してください");

const root = path.resolve(import.meta.dirname, "..", "public");
const heroDir = path.join(root, "images", "hero");
mkdirSync(heroDir, { recursive: true });

// スマホの写真枠の縦横比（Hero.tsx の 74vw と合わせる）
const SP_RATIO = 100 / 74;
const PC_WIDTHS = [960, 1376, 1672];
const SP_WIDTHS = [780, 1170];

// pc: PC用に横長をそのまま使う／spLeft・spTop: スマホ用の切り抜きの左上（元画像の座標）
const PHOTOS = [
  { id: "exterior", file: "exterior.png", pc: true, spLeft: 402, spTop: 0 },
  { id: "bath", file: "bath.png", pc: true, spLeft: 390, spTop: 0 },
  { id: "craft", file: "craft.png", pc: true, spLeft: 402, spTop: 0 },
  { id: "kitchen", file: "kitchen-sp.png", pc: false, spLeft: 0, spTop: 130 },
];

async function webp(input, out, width) {
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
}

for (const p of PHOTOS) {
  const input = path.join(SRC, p.file);
  const meta = await sharp(input).metadata();
  if (p.pc) {
    for (const w of PC_WIDTHS) await webp(input, path.join(heroDir, `${p.id}-${w}.webp`), w);
  }
  // スマホ用: 縦横比を揃えて切り抜く
  const maxW = Math.min(meta.width - p.spLeft, Math.floor((meta.height - p.spTop) * SP_RATIO));
  const crop = { left: p.spLeft, top: p.spTop, width: maxW, height: Math.round(maxW / SP_RATIO) };
  const cropped = await sharp(input).extract(crop).toBuffer();
  const widths = SP_WIDTHS.map((w) => Math.min(w, crop.width));
  for (const w of new Set(widths)) await webp(cropped, path.join(heroDir, `${p.id}-sp-${w}.webp`), w);
  console.log(p.id, `${meta.width}x${meta.height}`, "crop", JSON.stringify(crop), "sp", [...new Set(widths)].join(","));
}

// 共有用画像（1200x630）。文字・暗幕は入れない。
await sharp(path.join(SRC, "exterior.png"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, "og-image.jpg"));
console.log("og-image.jpg 1200x630");
