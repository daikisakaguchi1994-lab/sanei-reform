/**
 * 施工の流れセクション（不安解消）
 * Design: 白背景、ステップ形式の縦タイムライン
 * 次章フック: 「実際の施工事例を写真でご覧ください →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "お問い合わせ",
    description: "お電話・LINE・メールにてお気軽にご連絡ください。ご相談内容をお伺いし、現地調査の日程を調整します。",
    dataReplace: "flow-step-01",
  },
  {
    number: "02",
    title: "現地調査・ヒアリング",
    description: "ご自宅にお伺いし、現状を確認。ご要望やご予算をじっくりお聞きします。調査・ヒアリングは無料です。",
    dataReplace: "flow-step-02",
  },
  {
    number: "03",
    title: "お見積もり・ご提案",
    description: "調査結果をもとに、最適なプランとお見積もりをご提示。ご予算に合わせた複数プランのご提案も可能です。",
    dataReplace: "flow-step-03",
  },
  {
    number: "04",
    title: "ご契約・着工",
    description: "内容にご納得いただけましたらご契約。工事スケジュールを決定し、近隣へのご挨拶も当社で行います。",
    dataReplace: "flow-step-04",
  },
  {
    number: "05",
    title: "施工",
    description: "自社の職人が責任を持って施工。工事中の進捗もこまめにご報告し、変更があれば都度ご相談します。",
    dataReplace: "flow-step-05",
  },
  {
    number: "06",
    title: "完工・お引き渡し",
    description: "仕上がりをご確認いただき、お引き渡し。アフターフォローもしっかり対応いたします。",
    dataReplace: "flow-step-06",
  },
];

export default function Flow() {
  const ref = useFadeIn();

  return (
    <section id="flow" className="section-padding bg-white" ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-12 md:mb-16 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            FLOW
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            施工の流れ
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "#666" }}>
            お問い合わせからお引き渡しまで、安心のステップをご紹介します。
          </p>
        </div>

        {/* タイムライン */}
        <div className="max-w-2xl mx-auto">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="fade-in flex gap-4 md:gap-6 relative"
              style={{ transitionDelay: `${i * 80}ms` }}
              data-replace={step.dataReplace}
            >
              {/* <!-- 編集メモ: flow-step-0X のテキスト差し替え可能 --> */}
              {/* 左: 番号＋ライン */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: "#1F3A5F" }}
                >
                  {step.number}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-0.5 flex-1 my-2" style={{ backgroundColor: "#D0D8E0" }} />
                )}
              </div>

              {/* 右: テキスト */}
              <div className={`pb-8 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
                <h3 className="text-lg md:text-[20px] font-bold mb-2" style={{ color: "#1F3A5F" }}>
                  {step.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#555" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#cases"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            実際の施工事例を写真でご覧ください
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
