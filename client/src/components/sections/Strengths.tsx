/**
 * 強みセクション（3つの強み）
 * Design: 白背景、3カラムカード、数字を大きく表示
 * 次章フック: 「具体的にどんな工事ができるのか、次のセクションでご紹介します →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import { Shield, Wrench, Clock, ArrowRight } from "lucide-react";

const STRENGTHS = [
  {
    icon: Shield,
    number: "01",
    title: "地域密着・自社施工",
    description:
      "福岡市内を中心に、自社の職人が責任を持って施工します。下請けに丸投げしないから、品質管理も万全。お客様との距離が近い、顔の見える対応をお約束します。",
    dataReplace: "strength-01",
  },
  {
    icon: Wrench,
    number: "02",
    title: "適正価格・明朗会計",
    description:
      "中間マージンを省いた自社施工だからこそ実現できる適正価格。お見積もりは無料で、追加費用が発生する場合は必ず事前にご説明します。予算に合わせたご提案も可能です。",
    dataReplace: "strength-02",
  },
  {
    icon: Clock,
    number: "03",
    title: "スピード対応",
    description:
      "お問い合わせへの返答、現地調査、お見積もりまで迅速に対応。「すぐに来てほしい」「早く直したい」そんなお客様の声に、地域密着だからこそお応えできます。",
    dataReplace: "strength-03",
  },
];

export default function Strengths() {
  const ref = useFadeIn();

  return (
    <section id="strengths" className="section-padding bg-white" ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="text-center mb-12 md:mb-16 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            STRENGTHS
          </p>
          <h2 className="text-[22px] md:text-[28px] font-bold" style={{ color: "#1F3A5F" }}>
            サンエイが選ばれる<span className="text-[#2E7D32]">3</span>つの理由
          </h2>
        </div>

        {/* 実績数字バー */}
        <div className="fade-in grid grid-cols-3 gap-4 mb-12 md:mb-16 max-w-2xl mx-auto">
          {[
            { num: "15", unit: "年", label: "創業" },
            { num: "福岡県", unit: "", label: "全域対応" },
            { num: "0", unit: "円", label: "お見積もり" },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center py-5 rounded-lg"
              style={{ backgroundColor: "#F7F8FA" }}
            >
              <div className="text-[28px] md:text-[36px] font-bold leading-none mb-1" style={{ color: "#1F3A5F" }}>
                {item.num}<span className="text-base md:text-lg">{item.unit}</span>
              </div>
              <div className="text-xs md:text-sm font-medium" style={{ color: "#666" }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* 3カラムカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STRENGTHS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="fade-in bg-white border border-gray-100 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
                style={{
                  borderTop: "4px solid #1F3A5F",
                  transitionDelay: `${i * 100}ms`,
                }}
                data-replace={item.dataReplace}
              >
                {/* <!-- 編集メモ: strength-0X のテキスト差し替え可能 --> */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#E8EDF3" }}
                  >
                    <Icon size={24} style={{ color: "#1F3A5F" }} />
                  </div>
                  <span className="text-[40px] font-bold leading-none" style={{ color: "#1F3A5F", opacity: 0.15 }}>
                    {item.number}
                  </span>
                </div>
                <h3 className="text-[20px] font-bold mb-3" style={{ color: "#1F3A5F" }}>
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#333333" }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            具体的にどんな工事ができるのか、次のセクションでご紹介します
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
