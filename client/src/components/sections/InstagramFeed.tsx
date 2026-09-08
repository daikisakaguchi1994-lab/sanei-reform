/**
 * Instagram施工事例フィードセクション（Behold.so ウィジェット）
 * Design: 白背景、施工事例（Cases）の直後に配置。Instagramに投稿すると自動反映される。
 * SEO: 「フルリフォーム」「福岡市」「デザインをオシャレに」を見出し・本文に自然に反映
 * 次章フック: 施工事例 → Instagram → 中間CTA の流れで社会的証明を強化
 *
 * feed-id 未設定の間は、Instagram公式アカウントへのリンクボタンをフォールバック表示する。
 */
import { useEffect } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { Instagram, ArrowRight } from "lucide-react";

// Behold.so で発行される feed-id を環境変数から参照（未発行時はプレースホルダー）
const PLACEHOLDER_FEED_ID = "REPLACE_WITH_BEHOLD_FEED_ID";
const FEED_ID = import.meta.env.PUBLIC_BEHOLD_FEED_ID ?? PLACEHOLDER_FEED_ID;
const IS_CONFIGURED = Boolean(FEED_ID) && FEED_ID !== PLACEHOLDER_FEED_ID;

const WIDGET_SRC = "https://w.behold.so/widget.js";
const INSTAGRAM_URL = "https://www.instagram.com/sanei_offical/";

/** Behold ウィジェットのスクリプトを一度だけ読み込む */
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

  return (
    <section
      id="instagram"
      className="section-padding bg-white"
      ref={ref}
      aria-label="Instagramで見る福岡市のフルリフォーム施工事例"
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

        {/* ウィジェット本体：読み込み前のレイアウトシフトを防ぐため最小高さを確保 */}
        <div
          className="fade-in rounded-lg overflow-hidden"
          style={{ minHeight: "clamp(360px, 60vw, 520px)" }}
        >
          {IS_CONFIGURED ? (
            <behold-widget feed-id={FEED_ID} />
          ) : (
            /*
             * feed-id 未設定時のフォールバック（Instagram公式アカウントへの誘導）。
             * Behold.so で feed-id を発行し、環境変数 PUBLIC_BEHOLD_FEED_ID を設定すると、
             * 上の <behold-widget> 表示に自動で切り替わり、この分岐は表示されなくなる。
             */
            <div
              className="w-full h-full flex flex-col items-center justify-center text-center px-6 py-16 rounded-lg"
              style={{ backgroundColor: "#E8EDF3", color: "#5B6B7C", minHeight: "clamp(360px, 60vw, 520px)" }}
            >
              <Instagram size={40} className="mb-4" aria-hidden="true" />
              <p className="text-base md:text-lg font-bold" style={{ color: "#1F3A5F" }}>
                Instagramで施工事例をチェック
              </p>
              <p className="text-sm mt-2">
                最新の施工事例はInstagramで随時更新しています。
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#1F3A5F" }}
              >
                <Instagram size={18} aria-hidden="true" />
                Instagramで見る
              </a>
            </div>
          )}
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            Instagramで施工事例をもっと見る（@sanei_offical）
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
