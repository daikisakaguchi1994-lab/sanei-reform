/**
 * Instagram / 施工事例セクション
 * Design: 白背景、施工事例（Cases）の直後に配置。
 *   - ビフォーアフタースライダー（既存の施工写真）を主役に常時表示
 *   - 浴室のサムネイル → クリックで拡大モーダル
 *   - 「こんな空間を、あなたのお家にも」＋お問い合わせ導線
 *   - 「もっと事例を見る（Instagram）」ボタン
 *   - PUBLIC_BEHOLD_FEED_ID 設定時のみ、その下にライブフィード（Beholdウィジェット）を追加
 * SEO: 「フルリフォーム」「福岡市」「デザインをオシャレに」を見出し・本文に自然に反映
 */
import { useEffect, useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { Instagram, ArrowRight } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Behold.so で発行される feed-id を環境変数から参照（未発行時はプレースホルダー）
const PLACEHOLDER_FEED_ID = "REPLACE_WITH_BEHOLD_FEED_ID";
const FEED_ID = import.meta.env.PUBLIC_BEHOLD_FEED_ID ?? PLACEHOLDER_FEED_ID;
const IS_CONFIGURED = Boolean(FEED_ID) && FEED_ID !== PLACEHOLDER_FEED_ID;

const WIDGET_SRC = "https://w.behold.so/widget.js";
const INSTAGRAM_URL = "https://www.instagram.com/sanei_offical/";

// 拡大表示用サムネイル（既存の施工写真）
const THUMBS = [
  { src: "/images/bath-before.jpg", label: "浴室 Before" },
  { src: "/images/bath-after.jpg", label: "浴室 After" },
];

/** Behold ウィジェットのスクリプトを一度だけ読み込む（feed-id 設定時のみ） */
function useBeholdWidgetScript() {
  useEffect(() => {
    if (!IS_CONFIGURED) return;
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.type = "module";
    script.async = true;
    document.head.appendChild(script);
  }, []);
}

export default function InstagramFeed() {
  const ref = useFadeIn();
  useBeholdWidgetScript();
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  return (
    <section
      id="instagram"
      className="section-padding bg-white"
      ref={ref}
      aria-label="福岡市のフルリフォーム施工事例（ビフォーアフター）"
    >
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-8 md:mb-10 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            INSTAGRAM
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            Instagramで見る、福岡市のフルリフォーム事例
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "#666" }}>
            キッチン・浴室の水回りから、間取りを変えるフルリフォームまで。
            デザインをオシャレに一新した最新の施工事例を、公式Instagram
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:opacity-70 transition-opacity"
              style={{ color: "#1F3A5F" }}
            >
              （@sanei_offical）
            </a>
            で更新しています。
          </p>
        </div>

        {/* ビフォーアフタースライダー（feed-id の有無に関わらず常時表示） */}
        <div className="fade-in">
          <p
            className="text-center text-sm md:text-[15px] font-medium mb-3"
            style={{ color: "#1F3A5F" }}
          >
            スライダーを動かして、変化を体感してください
          </p>
          <div className="mx-auto max-w-3xl">
            <BeforeAfterSlider
              beforeSrc="/images/room-before.jpg"
              afterSrc="/images/room-after.jpg"
              beforeAlt="リフォーム前の和室"
              afterAlt="フルリフォーム後の明るい洋室"
              className="shadow-md"
            />
          </div>
        </div>

        {/* サムネイル（クリックで拡大表示） */}
        <div className="fade-in mt-6 flex justify-center gap-3">
          {THUMBS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setModalIdx(i)}
              className="group relative h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 transition-transform hover:scale-[1.03]"
              aria-label={`${t.label}の写真を拡大表示`}
            >
              <img
                src={t.src}
                alt={t.label}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute inset-x-0 bottom-0 bg-black/45 py-0.5 text-center text-[10px] font-medium text-white">
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* CTA：一文＋お問い合わせ導線 */}
        <div className="fade-in mt-10 text-center">
          <p className="text-lg md:text-xl font-bold mb-4" style={{ color: "#1F3A5F" }}>
            こんな空間を、あなたのお家にも
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-base font-bold text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#2E7D32" }}
          >
            無料でお見積り・ご相談
            <ArrowRight size={18} />
          </a>
        </div>

        {/* もっと事例を見る（Instagram） */}
        <div className="fade-in mt-6 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors hover:bg-[#1F3A5F] hover:text-white"
            style={{ color: "#1F3A5F", border: "1px solid #1F3A5F" }}
          >
            <Instagram size={18} aria-hidden="true" />
            もっと事例を見る（Instagram）
          </a>
        </div>

        {/* ライブフィード：feed-id 設定時のみ、上記の下に追加（スライダーは置き換えない） */}
        {IS_CONFIGURED && (
          <div className="fade-in mt-14">
            <p className="text-center text-sm font-medium mb-4" style={{ color: "#666" }}>
              Instagramの最新投稿
            </p>
            <div
              className="rounded-lg overflow-hidden"
              style={{ minHeight: "clamp(360px, 60vw, 520px)" }}
            >
              <behold-widget feed-id={FEED_ID} />
            </div>
          </div>
        )}
      </div>

      {/* サムネイル拡大モーダル */}
      <Dialog open={modalIdx !== null} onOpenChange={(open) => !open && setModalIdx(null)}>
        <DialogContent className="max-w-3xl border-0 bg-white p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {modalIdx !== null ? THUMBS[modalIdx].label : "施工事例"}
          </DialogTitle>
          {modalIdx !== null && (
            <img
              src={THUMBS[modalIdx].src}
              alt={THUMBS[modalIdx].label}
              className="h-auto w-full"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
