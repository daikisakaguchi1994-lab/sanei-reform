/**
 * よくある質問（FAQ）セクション
 * Design: 白背景、アコーディオンUI
 * 次章フック: 「会社へのアクセス方法をご確認ください →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "faq-01",
    question: "見積もりは無料ですか？",
    answer:
      "はい、お見積もりは完全無料です。現地調査にお伺いし、ご要望をお聞きした上でお見積もりをお出しします。お見積もり後にお断りいただいても費用は一切かかりませんので、お気軽にご相談ください。",
  },
  {
    id: "faq-02",
    question: "工事中に追加費用が発生することはありますか？",
    answer:
      "工事を進める中で、想定外の状況（壁の中の配管劣化など）が見つかる場合がございます。その際は必ず事前にご説明し、お客様のご了承をいただいてから追加工事を行います。勝手に追加費用が発生することはありません。",
  },
  {
    id: "faq-03",
    question: "小さな工事でも依頼できますか？",
    answer:
      "もちろんです。ドアの修理、棚の取付、手すりの設置など、小さな工事も喜んでお受けします。「こんなことでも頼んでいいのかな？」と思うようなことでも、まずはお気軽にご相談ください。",
  },
  {
    id: "faq-04",
    question: "工期はどのくらいかかりますか？",
    answer:
      "工事内容によって異なりますが、クロス張替えなら1〜3日、水回りリフォームなら1〜2週間、全面改装なら1〜2ヶ月が目安です。現地調査の際に、より正確な工期をお伝えいたします。",
  },
  {
    id: "faq-05",
    question: "対応エリアはどこまでですか？",
    answer:
      "福岡市内全般（早良区・西区・城南区・中央区・南区・博多区・東区）を中心に対応しております。福岡市外の近隣エリアについてもご相談いただければ対応可能な場合がございます。",
  },
  {
    id: "faq-06",
    question: "工事の保証はありますか？",
    answer:
      "はい、施工箇所に応じた保証をお付けしております。万が一、施工後に不具合が発生した場合は、迅速に対応いたします。保証内容の詳細はお見積もりの際にご説明いたします。",
  },
  {
    id: "faq-07",
    question: "住みながらの工事は可能ですか？",
    answer:
      "はい、多くの場合は住みながらの工事が可能です。工事箇所や内容によっては一時的にお部屋の使用をお控えいただく場合がございますが、事前にスケジュールをご相談し、できる限りご負担の少ない進め方をご提案します。",
  },
];

export default function Faq() {
  const ref = useFadeIn();

  return (
    <section id="faq" className="section-padding bg-white" ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-12 md:mb-16 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            FAQ
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            よくある質問
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "#666" }}>
            お客様からよくいただくご質問にお答えします。
          </p>
        </div>

        {/* アコーディオン */}
        <div className="max-w-3xl mx-auto fade-in">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-gray-100 rounded-lg px-5 md:px-6 overflow-hidden"
                data-replace={item.id}
              >
                {/* <!-- 編集メモ: faq-0X のQ&Aテキスト差し替え可能 --> */}
                <AccordionTrigger className="text-left text-[15px] md:text-base font-bold py-4 hover:no-underline" style={{ color: "#1F3A5F" }}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] md:text-[15px] leading-relaxed pb-4" style={{ color: "#555" }}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#access"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            会社へのアクセス方法をご確認ください
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
