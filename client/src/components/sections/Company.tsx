/**
 * 会社紹介・代表挨拶セクション（顔の見える信頼）
 * Design: グレー背景、左に代表写真枠＋右にテキスト、下に会社概要テーブル
 * 次章フック: 「よくあるご質問にお答えします →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import { ArrowRight } from "lucide-react";

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

        {/* 代表挨拶 */}
        <div className="fade-in bg-white rounded-lg p-6 md:p-10 mb-10">
          <div data-replace="ceo-message">
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1F3A5F" }}>
              地域の皆様の暮らしに寄り添い続けます
            </h3>
            <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: "#555" }}>
              <p>
                株式会社サンエイのホームページをご覧いただき、ありがとうございます。代表の甲斐一也です。
              </p>
              <p>
                私たちは福岡市を拠点に、地域の皆様の住まいに関するお困りごとを解決するリフォーム会社です。「小さな修繕でも気軽に頼める」「顔の見える職人に任せたい」——そんなお客様の声に応えるため、自社施工一貫体制にこだわっています。
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
