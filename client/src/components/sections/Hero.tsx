/**
 * ヒーローセクション（2026-11-07 作り直し）
 * スマホ: 上に写真をはっきり見せ、紺色へ溶け込ませて、下に文字とボタン（TYD・BLASTMADEの実測を参考）
 * PC: 全面の写真。左側だけ暗くして文字を載せる
 *
 * 過去にKen Burnsズーム＋外部Unsplash画像で実装 → 制約違反（外部画像禁止／派手なアニメーション禁止）
 * のためリバートされた経緯あり。ローカル画像のみ・クロスフェード限定とする。
 * 写真の定義は client/src/lib/heroSlides.ts を参照。
 */
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { yearsSinceFounded } from "@/lib/company";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  HERO_SLIDES_PC,
  HERO_SLIDES_SP,
  SHOW_PHOTO_NOTE,
  heroSrc,
  heroSrcSet,
} from "@/lib/heroSlides";

const SLIDE_INTERVAL_MS = 6000;
const FADE_DURATION_MS = 900;
const SWIPE_MIN_PX = 50;
const PHONE_QUERY = "(max-width: 767px)";
// 読み込み前の透明な1ピクセル（2枚目以降の取得を、1枚目の表示後まで止める）
const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const BUTTON_MOTION =
  "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white";
const ARROW_MOTION =
  "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105";

const FACTS = [
  { num: String(yearsSinceFounded()), unit: "年", label: "創業" },
  { num: "福岡県", unit: "", label: "地域密着" },
  { num: "自社", unit: "管理", label: "責任を持って施工" },
];

export default function Hero() {
  const [isPhone, setIsPhone] = useState(() => window.matchMedia(PHONE_QUERY).matches);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // 2枚目以降は、1枚目の表示後に読み込む（最初の表示で回線を取り合わない）
  const [loadRest, setLoadRest] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const slides = isPhone ? HERO_SLIDES_SP : HERO_SLIDES_PC;
  const active = current % slides.length;
  const autoplay = !paused && !prefersReducedMotion && slides.length > 1;

  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsPhone(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // 1枚目のonLoadが取りこぼされても、一定時間後には必ず読み込みを始める
    const timer = setTimeout(() => setLoadRest(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // 自動再生（手で送ったら、そこから数え直す）
  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setCurrent((prev) => (prev + 1) % slides.length), SLIDE_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [autoplay, active, slides.length]);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_MIN_PX) return;
    setCurrent((active + (dx < 0 ? 1 : -1) + slides.length) % slides.length);
  };

  return (
    <>
      <section
        id="hero"
        className="relative pt-16 md:flex md:items-center md:pt-[109px] md:min-h-[clamp(640px,calc(100svh-52px),800px)]"
        style={{ backgroundColor: "#1F3A5F" }}
      >
        {/* 写真（スマホは上に置き、PCは全面に敷く。動きはクロスフェードのみ） */}
        <div
          className="relative h-[74vw] overflow-hidden md:absolute md:inset-x-0 md:bottom-0 md:top-[109px] md:h-auto"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, i) => {
            const ready = i === 0 || loadRest;
            return (
              <img
                key={slide.base}
                src={ready ? heroSrc(slide) : BLANK}
                srcSet={ready ? heroSrcSet(slide) : undefined}
                sizes="100vw"
                alt={ready ? slide.alt : ""}
                aria-hidden={i === active ? undefined : true}
                data-replace={`hero-bg-${slide.id}`}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: i === active ? 1 : 0,
                  transition: prefersReducedMotion ? "none" : `opacity ${FADE_DURATION_MS}ms ease-in-out`,
                }}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
                onLoad={i === 0 ? () => setLoadRest(true) : undefined}
              />
            );
          })}

          {/* スマホ: 写真の下端を紺色へ溶かす／PC: 文字の載る左側だけ暗くする */}
          <div
            className="absolute inset-x-0 bottom-0 h-[34%] md:hidden"
            style={{ background: "linear-gradient(180deg, rgba(31,58,95,0) 0%, rgba(31,58,95,.75) 62%, #1F3A5F 100%)" }}
          />
          <div className="hero-shade absolute inset-0 hidden md:block" />

          {SHOW_PHOTO_NOTE && (
            <span className="absolute right-2 top-2 rounded bg-black/45 px-1.5 py-1 text-xs leading-none text-white md:bottom-2 md:top-auto">
              画像はイメージです
            </span>
          )}

          {/* 写真の切り替え */}
          {slides.length > 1 && (
            <div className="absolute inset-x-0 bottom-7 z-10 flex items-center justify-center gap-4 md:bottom-3">
              {slides.map((slide, i) => (
                <button
                  key={slide.base}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className="relative rounded-full shadow-[0_0_4px_rgba(0,0,0,.45)] transition-all duration-300 before:absolute before:-inset-x-2 before:-inset-y-[18px] before:content-['']"
                  style={{
                    width: i === active ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: i === active ? "#ffffff" : "rgba(255,255,255,0.6)",
                  }}
                  aria-label={`写真${i + 1}: ${slide.alt}`}
                  aria-current={i === active}
                />
              ))}
              {!prefersReducedMotion && (
                <button
                  type="button"
                  onClick={() => setPaused((v) => !v)}
                  className="-my-[18px] flex h-11 w-11 items-center justify-center text-white drop-shadow-[0_0_3px_rgba(0,0,0,.6)]"
                  aria-label={paused ? "写真の切り替えを再開する" : "写真の切り替えを止める"}
                  aria-pressed={paused}
                >
                  {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                </button>
              )}
            </div>
          )}
        </div>

        {/* 文字（スマホは「見出し→ボタン→説明」、PCは「見出し→説明→ボタン」） */}
        <div className="container relative z-10 -mt-5 flex flex-col pb-6 md:mt-0 md:py-10 md:[text-shadow:0_1px_14px_rgba(10,25,45,.45)]">
          <p className="order-1 mb-2 text-[13px] font-medium tracking-[0.12em] text-white/85 md:mb-3 md:text-[15px]" data-replace="hero-subtitle">
            福岡市の地域密着リフォーム会社
          </p>

          <h1 className="hero-title order-2 text-white" data-replace="hero-title">
            <span className="block">福岡市のおうちのリフォームは</span>
            <span className="block">サンエイにお任せください。</span>
          </h1>

          <p
            className="order-4 mt-4 max-w-[540px] text-[15px] leading-[1.75] text-white/92 [text-wrap:pretty] md:order-3 md:mt-4 md:text-[17px]"
            data-replace="hero-description"
          >
            キッチン・浴室・トイレ・洗面の水回りリフォームから、クロス張替え・フローリング・間取り変更まで。
            <br className="hidden md:block" />
            福岡市・春日市・大野城市・太宰府市・糸島市対応、他のエリアもご相談ください。
            <br className="hidden md:block" />
            自社が責任を持って施工を管理します。無料見積り受付中。
          </p>

          <div className="order-3 mt-4 flex flex-col gap-2.5 md:order-4 md:mt-6 md:flex-row md:gap-3">
            <a
              href="#contact"
              className={`group flex h-[58px] items-center justify-between gap-5 rounded-xl pl-[22px] pr-2.5 text-[17px] font-bold text-white shadow-[0_10px_24px_rgba(10,40,20,.32)] hover:shadow-[0_14px_30px_rgba(10,40,20,.42)] md:h-[62px] md:[text-shadow:none] ${BUTTON_MOTION}`}
              style={{ backgroundColor: "#2E7D32" }}
            >
              無料でお見積りする
              <span className={`flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-white/20 ${ARROW_MOTION}`} aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </a>
            <a
              href="#cases"
              className={`group flex h-[58px] items-center justify-between gap-5 rounded-xl bg-white pl-[22px] pr-2.5 text-[17px] font-bold md:h-[62px] md:[text-shadow:none] ${BUTTON_MOTION}`}
              style={{ color: "#1B4F8A" }}
            >
              施工事例を見る
              <span className={`flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-[#1F3A5F]/8 ${ARROW_MOTION}`} aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </a>
          </div>

          {/* 実績 */}
          <div className="order-5 mt-4 flex max-w-[520px] border-t border-white/20 pt-3 md:mt-6">
            {FACTS.map((fact, i) => (
              <div key={fact.label} className={i === 0 ? "pr-3" : "border-l border-white/20 px-3"}>
                <span className="block text-[15px] font-bold leading-[1.3] text-white md:text-[17px]">
                  {fact.num}
                  <span className="text-[13px]">{fact.unit}</span>
                </span>
                <span className="block text-xs leading-[1.4] text-white/80">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 次章フック */}
      <div className="bg-white px-4 py-3 text-center">
        <a
          href="#strengths"
          className="inline-flex min-h-[28px] items-center gap-1.5 text-xs font-medium text-[#1F3A5F] transition-opacity [text-wrap:balance] hover:opacity-70 md:text-sm"
        >
          次は、サンエイが"選ばれる理由"を3つだけ紹介します
          <ArrowDown size={14} className="shrink-0 animate-bounce" />
        </a>
      </div>
    </>
  );
}
