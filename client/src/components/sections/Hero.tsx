/**
 * ヒーローセクション
 * Design: フルワイドの背景画像＋オーバーレイ＋安心の宣言テキスト
 * 次章フック: 「サンエイが選ばれる3つの理由をご紹介します →」
 */
import { HERO_BG } from "@/lib/images";
import { Phone, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[600px] md:min-h-[700px] flex items-center"
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
            className="text-[28px] md:text-[40px] font-bold text-white leading-tight mb-6"
            data-replace="hero-title"
          >
            住まいの「困った」を
            <br />
            まるごと解決します
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
          </p>
          {/* <!-- 編集メモ: hero-description テキスト差し替え可能 --> */}

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="cta-button">
              無料相談・お見積もり
            </a>
            <a
              href="tel:092-407-4453"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 backdrop-blur-sm text-white font-bold rounded-md hover:bg-white/25 transition-colors text-base"
            >
              <Phone size={18} />
              092-407-4453
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
