/**
 * お客様の声セクション（第三者証言）
 * Design: 白背景、5件のカードUI
 * 次章フック: 「どんな会社なのか、代表の想いをお伝えします →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import { Star, ArrowRight } from "lucide-react";

interface TestimonialItem {
  id: string;
  type: string;
  summary: string;
  body: string;
  name: string;
  dataReplace: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "voice-01",
    type: "クロス張替え（1部屋・約3万円）",
    summary: "小さな工事でも嫌な顔せず、仕上がりも綺麗",
    body: "子供部屋のクロスが汚れてきたので1部屋だけお願いしました。小さな工事でも嫌な顔せず対応してくれて、仕上がりも綺麗で大満足。こんな小さな依頼でも丁寧にやってくれる業者さんは貴重です。",
    name: "福岡市内 K様",
    dataReplace: "voice-01",
  },
  {
    id: "voice-02",
    type: "網戸・建具の調整（約2〜3万円）",
    summary: "すぐに来てくれてリーズナブル、気軽に頼める",
    body: "網戸の張替えと引き戸の建て付け調整をお願いしました。連絡したらすぐに来てくれてあっという間に完了。料金もリーズナブルで、小さな困りごとでも気軽に頼めると思いました。",
    name: "福岡市内 T様",
    dataReplace: "voice-02",
  },
  {
    id: "voice-03",
    type: "トイレリフォーム（約15〜20万円）",
    summary: "予算内で最善の提案、工期も短くて大満足",
    body: "トイレの便器交換と床・クロスの張替えをお願いしました。予算を伝えたらその範囲内で最善の提案をしてくれました。工期も1〜2日と短く、対応も丁寧で大満足です。",
    name: "福岡市内 S様",
    dataReplace: "voice-03",
  },
  {
    id: "voice-04",
    type: "洗面台交換（約8〜25万円）",
    summary: "明朗価格で追加費用なし、安心して任せられた",
    body: "洗面台が古くなったので交換をお願いしました。商品の選び方から丁寧に教えてもらい、工事も1〜2日で完了。他社より価格も明朗で追加費用も一切なく安心して任せられました。",
    name: "福岡市内 M様",
    dataReplace: "voice-04",
  },
  {
    id: "voice-05",
    type: "キッチン・床リフォーム（約80〜100万円）",
    summary: "予算内で最適プラン、仕上がりも想像以上",
    body: "キッチンの交換とリビングの床張替えをまとめてお願いしました。水回りの知識が豊富で、予算内で最適なプランを提案してくれました。仕上がりも想像以上で家族全員大喜びです。",
    name: "福岡市内 N様",
    dataReplace: "voice-05",
  },
  {
    id: "voice-06",
    type: "浴室・洗面・トイレ水回り3点セット（約100〜150万円）",
    summary: "自社施工でコスト削減、仕上がりも大変満足",
    body: "築20年でまとめて水回りをリフォームしました。工程や費用を細かく説明してくれて不安なく進められました。自社施工なので中間マージンがなく、他社より大幅にコストを抑えられました。仕上がりも大変満足しています。",
    name: "福岡市内 A様",
    dataReplace: "voice-06",
  },
];

export default function Testimonials() {
  const ref = useFadeIn();

  return (
    <section id="testimonials" className="section-padding bg-white" ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-12 md:mb-16 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            VOICE
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            お客様の声
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "#666" }}>
            実際にリフォームをご依頼いただいたお客様からの声をご紹介します。
          </p>
        </div>

        {/* お客様の声カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={item.id}
              className="fade-in border border-gray-100 rounded-lg p-5 md:p-6 hover:shadow-md transition-shadow duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
              data-replace={item.dataReplace}
            >
              {/* <!-- 編集メモ: voice-0X のテキスト差し替え可能 --> */}
              {/* 工事種別 */}
              <span
                className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
                style={{ backgroundColor: "#E8EDF3", color: "#1F3A5F" }}
              >
                {item.type}
              </span>

              {/* 星 */}
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} fill="#F5A623" color="#F5A623" />
                ))}
              </div>

              {/* 一言要約 */}
              <h3 className="text-base font-bold mb-2" style={{ color: "#1F3A5F" }}>
                {item.summary}
              </h3>

              {/* 本文 */}
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "#555" }}>
                {item.body}
              </p>

              {/* 名前 */}
              <p className="text-xs" style={{ color: "#999" }}>
                — {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#company"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            どんな会社なのか、代表の想いをお伝えします
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
