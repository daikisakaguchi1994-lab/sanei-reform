/**
 * ヒーローセクション
 * Design: スライドショー背景（ペルソナ別4枚・自動再生・クロスフェードのみ）＋オーバーレイ＋テキスト
 *
 * 過去にKen Burnsズーム＋外部Unsplash画像で実装 → 制約違反（外部画像禁止／派手なアニメーション禁止）
 * のためリバートされた経緯あり。今回はローカル画像のみ・クロスフェード限定で再実装。
 * 画像素材は client/src/lib/heroSlides.ts を参照（本画像到着まで施工事例写真を仮利用）。
 */
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { HERO_SLIDES } from "@/lib/heroSlides";

const SLIDE_INTERVAL_MS = 6000;
const FADE_DURATION_MS = 900;

// LCP対策: 最初のスライド画像をできるだけ早くプリロード（モジュール読込時に一度だけ実行）
let heroPreloadInjected = false;
function preloadFirstHeroSlide() {
  if (heroPreloadInjected || typeof document === "undefined") return;
  heroPreloadInjected = true;

  const href = HERO_SLIDES[0]?.url;
  if (!href || document.querySelector(`link[rel="preload"][href="${href}"]`)) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  link.setAttribute("fetchpriority", "high");
  document.head.appendChild(link);
}
preloadFirstHeroSlide();

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // 自動再生（視差軽減設定がONの場合は止める＝手動のドット操作のみ）
  useEffect(() => {
    if (prefersReducedMotion || HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-[60vh] md:min-h-[700px] flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* スライドショー背景（クロスフェードのみ。ズーム等の演出は付けない） */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.url}
            alt={slide.alt}
            data-replace={`hero-bg-${slide.id}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === current ? 1 : 0,
              transition: prefersReducedMotion ? "none" : `opacity ${FADE_DURATION_MS}ms ease-in-out`,
            }}
            loading="eager"
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
          />
        ))}
        {/* <!-- 編集メモ: 各スライドは client/src/lib/heroSlides.ts の url を差し替え --> */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F3A5F]/85 via-[#1F3A5F]/60 to-[#1F3A5F]/30" />
      </div>

      {/* コンテンツ */}
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-xl">
          <p
            className="text-white/80 text-sm md:text-base font-medium mb-4 tracking-widest"
            data-replace="hero-subtitle"
          >
            福岡市の地域密着リフォーム会社
          </p>
          {/* <!-- 編集メモ: hero-subtitle テキスト差し替え可能 --> */}

          <h1
            className="text-[24px] md:text-[36px] text-white leading-tight mb-6"
            style={{ fontFamily: '"Noto Serif JP", serif', fontWeight: 700, letterSpacing: "0.05em" }}
            data-replace="hero-title"
          >
            <span className="block">福岡市のおうちのリフォームは</span>
            <span className="block">サンエイにお任せください。</span>
          </h1>
          {/* <!-- 編集メモ: hero-title テキスト差し替え可能 --> */}

          <p
            className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-md"
            data-replace="hero-description"
          >
            キッチン・浴室・トイレ・洗面の水回りリフォームから、クロス張替え・フローリング・間取り変更まで。
            <br className="hidden md:block" />
            福岡市・春日市・大野城市・太宰府市対応。
            <br className="hidden md:block" />
            自社施工だから中間マージンなし、無料見積り受付中。
          </p>
          {/* <!-- 編集メモ: hero-description テキスト差し替え可能 --> */}

          {/* 実績バッジ */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { num: "15", unit: "年", label: "創業" },
              { num: "福岡県", unit: "", label: "地域密着" },
              { num: "自社", unit: "施工", label: "中間マージンなし" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center justify-center px-4 py-2 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <span className="text-white font-bold text-lg leading-tight">
                  {badge.num}<span className="text-sm">{badge.unit}</span>
                </span>
                <span className="text-white/70 text-[11px] leading-tight">{badge.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-bold text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#2E7D32" }}
            >
              無料でお見積りする
            </a>
            <a
              href="#cases"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-bold border-2 border-white bg-white hover:bg-white/90 transition-colors"
              style={{ color: "#1B4F8A" }}
            >
              施工事例を見る
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ドットインジケーター */}
      {HERO_SLIDES.length > 1 && (
        <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center gap-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                backgroundColor: i === current ? "#ffffff" : "rgba(255,255,255,0.5)",
              }}
              aria-label={`スライド${i + 1}: ${slide.alt}`}
              aria-current={i === current}
            />
          ))}
        </div>
      )}

      {/* 次章フック */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 to-transparent pt-16 pb-6">
        <div className="container text-center">
          <a
            href="#strengths"
            className="inline-flex items-center gap-2 text-sm text-[#1F3A5F] font-medium hover:opacity-70 transition-opacity"
          >
            次は、サンエイが"選ばれる理由"を3つだけ紹介します
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
