/**
 * 会社紹介・代表挨拶セクション（顔の見える信頼）
 * Design: 単色グレー背景。代表挨拶は1カラムの白カード（引用符アイコン＋実績バッジ＋本文）、
 *         その下に会社概要テーブルの白カード。
 * 次章フック: 「よくあるご質問にお答えします →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import { ArrowRight, Quote } from "lucide-react";

// 会社概要（創業年・対応エリア・自社施工体制）から抜粋。Heroの実績バッジと同じスタイル。
const CEO_BADGES = [
  { num: "15", unit: "年", label: "創業" },
  { num: "福岡市", unit: "", label: "対応エリア" },
  { num: "自社", unit: "施工", label: "一貫体制" },
];

export default function Company() {
  const ref = useFadeIn();

  return (
    <section id="company" className="section-padding" style={{ backgroundColor: "#F7F8FA" }} ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-12 md:mb-16 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            COMPANY
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            会社紹介・代表挨拶
          </h2>
        </div>

        {/* 代表挨拶（代表者本人の言葉。1カラムの白カード） */}
        <div className="fade-in bg-white rounded-lg p-6 md:p-10 mb-10">
          {/* 代表者本人の言葉であることを示す引用符 */}
          <Quote
            size={32}
            className="mb-3"
            style={{ color: "#1F3A5F", opacity: 0.25 }}
            aria-hidden="true"
          />

          <div data-replace="ceo-message">
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1F3A5F" }}>
              地域の皆様の暮らしに寄り添い続けます
            </h3>

            {/* 実績バッジ（Heroと同じスタイルを白背景向けの配色に調整） */}
            <div className="flex flex-wrap gap-3 mb-6">
              {CEO_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center justify-center px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: "rgba(31,58,95,0.06)",
                    border: "1px solid rgba(31,58,95,0.15)",
                  }}
                >
                  <span className="font-bold text-lg leading-tight" style={{ color: "#1F3A5F" }}>
                    {badge.num}
                    <span className="text-sm">{badge.unit}</span>
                  </span>
                  <span className="text-[11px] leading-tight" style={{ color: "rgba(31,58,95,0.6)" }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: "#555" }}>
              <p>
                株式会社サンエイのホームページをご覧いただき、ありがとうございます。代表の甲斐一也です。
              </p>
              <p>
                私たちは福岡市を拠点に、地域の皆様の住まいに関するお困りごとを解決するリフォーム会社です。「小さな修繕でも気軽に頼める」「どこに頼めばいいかわからない」そんなお客様の声に応えるため、自社施工一貫体制にこだわっています。
              </p>
              <p>
                大手にはない小回りの良さと、職人としての確かな技術。この2つを武器に、お客様一人ひとりのご要望とご予算に合わせた最適なご提案をいたします。
              </p>
              <p>
                住まいのことで何かお困りのことがございましたら、どうぞお気軽にご相談ください。
              </p>
            </div>
          </div>
        </div>

        {/* 会社概要テーブル */}
        <div className="fade-in bg-white rounded-lg p-6 md:p-8">
          <h3 className="text-lg font-bold mb-6" style={{ color: "#1F3A5F" }}>
            会社概要
          </h3>
          <table className="w-full text-[15px]">
            <tbody>
              {[
                ["会社名", "株式会社サンエイ"],
                ["代表者", "甲斐 一也"],
                ["所在地", "〒814-0165 福岡県福岡市早良区次郎丸4-1-45"],
                ["TEL", "092-407-4453"],
                ["FAX", "092-407-4592"],
                ["メール", "sanei_kai1105@yahoo.co.jp"],
                ["設立", "平成22年10月"],
                ["定休日", "土日、祝日"],
                ["事業内容", "総合リフォーム（個人宅）、クロス・床・大工・水回り全般"],
                ["対応エリア", "福岡県福岡市内全般、その他エリアもご相談ください"],
                ["他社との違い", "地域密着型、自社施工・一貫体制"],
                ["選ばれる理由", "レスポンスの早さ、適正価格、予算に合わせた的確な提案"],
                ["得意な工事", "水回りの工事、内装仕上げ工事（クロス、床工事）"],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-gray-100">
                  <th
                    className="text-left py-3 pr-4 font-medium w-32 md:w-40 align-top"
                    style={{ color: "#1F3A5F" }}
                  >
                    {label}
                  </th>
                  <td className="py-3" style={{ color: "#555" }} data-replace={`company-${label}`}>
                    {label === "TEL" ? (
                      <a href="tel:092-407-4453" className="hover:underline" style={{ color: "#1F3A5F" }}>
                        {value}
                      </a>
                    ) : label === "メール" ? (
                      <a href="mailto:sanei_kai1105@yahoo.co.jp" className="hover:underline" style={{ color: "#1F3A5F" }}>
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 法人向け案内 */}
        <div className="fade-in bg-white rounded-lg p-5 md:p-6 mt-6 border-l-4" style={{ borderColor: "#1F3A5F" }}>
          <p className="text-[15px]" style={{ color: "#555" }}>
            <span className="font-bold" style={{ color: "#1F3A5F" }}>法人様のご依頼も承ります。</span>
            賃貸不動産の原状回復工事、店舗リフォーム等、お気軽にご相談ください。
          </p>
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#faq"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            よくあるご質問にお答えします
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
