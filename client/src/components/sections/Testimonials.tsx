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
  isGoogle?: boolean;
  date?: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "voice-01",
    type: "クロス張替え（1部屋・約3万円）",
    summary: "小さな工事でも嫌な顔せず、仕上がりも綺麗",
    body: "子供部屋のクロスが汚れてきたので1部屋だけお願いしました。小さな工事でも嫌な顔せず対応してくれて、仕上がりも綺麗で大満足。こんな小さな依頼でも丁寧にやってくれる業者さんは貴重です。",
    name: "福岡市内 K様",
    dataReplace: "voice-01",
    date: "2026年2月",
  },
  {
    id: "voice-02",
    type: "網戸・建具の調整（約2〜3万円）",
    summary: "すぐに来てくれてリーズナブル、気軽に頼める",
    body: "網戸の張替えと引き戸の建て付け調整をお願いしました。連絡したらすぐに来てくれてあっという間に完了。料金もリーズナブルで、小さな困りごとでも気軽に頼めると思いました。",
    name: "福岡市内 T様",
    dataReplace: "voice-02",
    date: "2026年1月",
  },
  {
    id: "voice-03",
    type: "トイレリフォーム（約15〜20万円）",
    summary: "予算内で最善の提案、工期も短くて大満足",
    body: "トイレの便器交換と床・クロスの張替えをお願いしました。予算を伝えたらその範囲内で最善の提案をしてくれました。工期も1〜2日と短く、対応も丁寧で大満足です。",
    name: "福岡市内 S様",
    dataReplace: "voice-03",
    date: "2025年11月",
  },
  {
    id: "voice-04",
    type: "洗面台交換（約8〜25万円）",
    summary: "明朗価格で追加費用なし、安心して任せられた",
    body: "洗面台が古くなったので交換をお願いしました。商品の選び方から丁寧に教えてもらい、工事も1〜2日で完了。他社より価格も明朗で追加費用も一切なく安心して任せられました。",
    name: "福岡市内 M様",
    dataReplace: "voice-04",
    date: "2025年8月",
  },
  {
    id: "voice-05",
    type: "キッチン・床リフォーム（約80〜100万円）",
    summary: "予算内で最適プラン、仕上がりも想像以上",
    body: "キッチンの交換とリビングの床張替えをまとめてお願いしました。水回りの知識が豊富で、予算内で最適なプランを提案してくれました。仕上がりも想像以上で家族全員大喜びです。",
    name: "福岡市内 N様",
    dataReplace: "voice-05",
    date: "2025年5月",
  },
  {
    id: "voice-06",
    type: "浴室・洗面・トイレ水回り3点セット（約100〜150万円）",
    summary: "自社施工でコスト削減、仕上がりも大変満足",
    body: "築20年でまとめて水回りをリフォームしました。工程や費用を細かく説明してくれて不安なく進められました。自社施工なので中間マージンがなく、他社より大幅にコストを抑えられました。仕上がりも大変満足しています。",
    name: "福岡市内 A様",
    dataReplace: "voice-06",
    date: "2025年2月",
  },
];

const GOOGLE_REVIEWS: TestimonialItem[] = [
  {
    id: "google-01",
    type: "店舗内装工事",
    summary: "丁寧な対応と的確な提案で大満足",
    body: "対応も丁寧でお店にあった提案をして頂いて、大満足です！！",
    name: "",
    dataReplace: "google-01",
    isGoogle: true,
    date: "2024年11月",
  },
  {
    id: "google-02",
    type: "飲食店内装工事",
    summary: "飲食店の内装工事、満足のいく仕上がり",
    body: "うちの飲食店の内装工事をお願いしました。",
    name: "",
    dataReplace: "google-02",
    isGoogle: true,
    date: "2024年10月",
  },
  {
    id: "google-03",
    type: "水回り緊急対応",
    summary: "迅速な対応で非常に助かりました",
    body: "トイレが流れなくなり、困っていましたが、迅速な対応をして頂いたので非常に助かりました。ありがとうございました。",
    name: "",
    dataReplace: "google-03",
    isGoogle: true,
    date: "2024年10月",
  },
  {
    id: "google-04",
    type: "中古マンションリフォーム",
    summary: "的確な提案で予算内に収まり大変満足",
    body: "中古マンションのリフォームをしていただきました。的確な提案をしていただき、予算以内で工事をする事が出来てとても満足です。",
    name: "",
    dataReplace: "google-04",
    isGoogle: true,
    date: "2024年10月",
  },
  {
    id: "google-05",
    type: "各種工事",
    summary: "誠実なお人柄で安心、また頼みたい",
    body: "伝えた予算内で希望通りの工事をしてもらえました！相談しやすい雰囲気と誠実なお人柄で安心できました。またどこか不具合がでた時はお願いしたいです。",
    name: "",
    dataReplace: "google-05",
    isGoogle: true,
    date: "2024年10月",
  },
  {
    id: "google-06",
    type: "和室リフォーム",
    summary: "丁寧な説明で安心してお任せできました",
    body: "和室のリフォームをご依頼させていただきました。見積もり内容や工事のやり方まで丁寧に説明していただき安心してお願いできました。ありがとうございます。",
    name: "",
    dataReplace: "google-06",
    isGoogle: true,
    date: "2024年10月",
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
              <div className="flex items-center justify-between mb-3">
                <span
                  className="inline-block text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "#E8EDF3", color: "#1F3A5F" }}
                >
                  {item.type}
                </span>
                {item.date && (
                  <span className="text-xs" style={{ color: "#999" }}>{item.date}</span>
                )}
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} fill="#F5A623" color="#F5A623" />
                ))}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: "#1F3A5F" }}>
                {item.summary}
              </h3>
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "#555" }}>
                {item.body}
              </p>
              <p className="text-xs" style={{ color: "#999" }}>
                — {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Googleマップの口コミ */}
        <div className="mt-14 md:mt-20 fade-in">
          {/* 小見出し */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: "#DADCE0" }}>
              {/* Google "G" ロゴ風カラーアイコン */}
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-bold" style={{ color: "#444" }}>Googleマップの口コミ</span>
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={11} fill="#F5A623" color="#F5A623" />
                ))}
              </div>
              <span className="text-sm font-bold" style={{ color: "#444" }}>5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {GOOGLE_REVIEWS.map((item, i) => (
              <div
                key={item.id}
                className="fade-in rounded-lg p-5 md:p-6 hover:shadow-md transition-shadow duration-300"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  border: "1px solid #DADCE0",
                  backgroundColor: "#FAFAFA",
                }}
              >
                {/* Googleバッジ＋日付 */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "#E8F0FE", color: "#1A73E8" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google口コミ
                  </span>
                  <span className="text-xs" style={{ color: "#999" }}>{item.date}</span>
                </div>

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
                <p className="text-[14px] leading-relaxed" style={{ color: "#555" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Googleマップ口コミリンク */}
        <div className="text-center mt-10 fade-in">
          <a
            href="https://www.google.com/maps?q=33.5517239,130.3290875"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold border-2 hover:opacity-80 transition-opacity"
            style={{ color: "#1F3A5F", borderColor: "#1F3A5F" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            Googleの口コミをすべて見る
          </a>
        </div>

        {/* 次章フック */}
        <div className="text-center mt-8 fade-in">
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
