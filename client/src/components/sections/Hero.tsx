/**
 * ヒーローセクション
 * Design: フルワイドの背景画像＋オーバーレイ＋安心の宣言テキスト
 * 次章フック: 「サンエイが選ばれる3つの理由をご紹介します →」
 */
import { HERO_BG } from "@/lib/images";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[60vh] md:min-h-[700px] flex items-center"
      style={{ paddingTop: "80px" }}
    >
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="リフォーム後の美しいリビング"
          data-replace="hero-bg"
          className="w-full h-full object-cover"
        />
        {/* <!-- 編集メモ: hero-bg を差し替え可能 --> */}
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
            <span className="block">福岡市の水回り・内装リフォームは</span>
            <span className="block">サンエイにお任せください</span>
          </h1>
          {/* <!-- 編集メモ: hero-title テキスト差し替え可能 --> */}

          <p
            className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-md"
            data-replace="hero-description"
          >
            水回り・内装・クロス張替え・床工事まで。
            <br className="hidden md:block" />
            小さな修繕から大規模リフォームまで、
            <br className="hidden md:block" />
            自社施工一貫体制で適正価格をお約束します。
            <br />
            <span className="text-white/80 text-sm mt-1 inline-block font-medium">無料見積り・相談受付中</span>
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
