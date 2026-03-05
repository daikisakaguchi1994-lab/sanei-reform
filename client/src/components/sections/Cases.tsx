/**
 * 施工事例セクション（証拠）
 * Design: グレー背景、ビフォー・アフターカード
 * ユーザー提供の実際の施工写真を使用
 * 次章フック: 「実際にリフォームされたお客様の声をご紹介します →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import {
  CASE_KITCHEN_BEFORE,
  CASE_KITCHEN_AFTER,
  CASE_BATH_BEFORE,
  CASE_ROOM_BEFORE,
  CASE_ROOM_AFTER_1,
  CASE_WASHSTAND_BEFORE,
  CASE_WASHSTAND_AFTER,
  CASE_ROOM_AFTER_2,
} from "@/lib/images";
import { ArrowRight } from "lucide-react";

interface CaseItem {
  id: string;
  title: string;
  period: string;
  point: string;
  beforeImg: string | null;
  afterImg: string | null;
  beforeLabel: string;
  afterLabel: string;
  dataReplaceBefore: string;
  dataReplaceAfter: string;
}

const CASES: CaseItem[] = [
  {
    id: "case-01",
    title: "キッチンリフォーム",
    period: "工期：2日〜1週間",
    point: "古い木目調のキッチンを、明るく清潔感のあるダークブラウンのシステムキッチンへ。壁面もクロスに張替えて、まるで新築のような仕上がりに。",
    beforeImg: CASE_KITCHEN_BEFORE,
    afterImg: CASE_KITCHEN_AFTER,
    beforeLabel: "施工前",
    afterLabel: "施工後",
    dataReplaceBefore: "case-01-before",
    dataReplaceAfter: "case-01-after",
  },
  {
    id: "case-02",
    title: "和室→洋室リフォーム",
    period: "工期：4日〜1週間",
    point: "古い和室を明るい洋室にフルリフォーム。畳からフローリングへ、壁・天井もクロス張替え。クローゼットを新設し、使い勝手も大幅に向上。",
    beforeImg: CASE_ROOM_BEFORE,
    afterImg: CASE_ROOM_AFTER_1,
    beforeLabel: "施工前（和室）",
    afterLabel: "施工後（洋室）",
    dataReplaceBefore: "case-02-before",
    dataReplaceAfter: "case-02-after",
  },
  {
    id: "case-03",
    title: "洗面所リフォーム",
    period: "工期：約3日",
    point: "古くなった洗面台を最新のシャンプードレッサーに交換。壁・床も一新し、清潔感のある明るい空間に生まれ変わりました。",
    beforeImg: CASE_WASHSTAND_BEFORE,
    afterImg: CASE_WASHSTAND_AFTER,
    beforeLabel: "施工前",
    afterLabel: "施工後",
    dataReplaceBefore: "case-03-before",
    dataReplaceAfter: "case-03-after",
  },
  {
    id: "case-04",
    title: "浴室リフォーム",
    period: "工期：3日〜1週間",
    point: "老朽化したステンレス浴槽のお風呂を、最新のユニットバスに交換。断熱性・清掃性が大幅に向上し、快適なバスタイムを実現。",
    beforeImg: CASE_BATH_BEFORE,
    afterImg: null,
    beforeLabel: "施工前",
    afterLabel: "施工後（写真準備中）",
    dataReplaceBefore: "case-04-before",
    dataReplaceAfter: "case-04-after",
  },
  {
    id: "case-05",
    title: "内装クロス・床張替え",
    period: "工期：2日〜1週間",
    point: "全室のクロスとフローリングを張替え。明るいホワイト系で統一し、窓からの光が映える開放的な空間に。",
    beforeImg: null,
    afterImg: CASE_ROOM_AFTER_2,
    beforeLabel: "施工前（写真準備中）",
    afterLabel: "施工後",
    dataReplaceBefore: "case-05-before",
    dataReplaceAfter: "case-05-after",
  },
];

function ImageSlot({
  src,
  alt,
  label,
  dataReplace,
}: {
  src: string | null;
  alt: string;
  label: string;
  dataReplace: string;
}) {
  return (
    <div className="flex-1">
      <div className="aspect-[4/3] rounded-md overflow-hidden image-placeholder">
        {src ? (
          <img
            src={src}
            alt={alt}
            data-replace={dataReplace}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-sm"
            data-replace={dataReplace}
            style={{ backgroundColor: "#E8EDF3", color: "#8899AA" }}
          >
            写真準備中
          </div>
        )}
      </div>
      {/* <!-- 編集メモ: data-replace で画像差し替え可能 --> */}
      <p className="text-xs mt-2 text-center font-medium" style={{ color: "#666" }}>
        {label}
      </p>
    </div>
  );
}

export default function Cases() {
  const ref = useFadeIn();

  return (
    <section id="cases" className="section-padding" style={{ backgroundColor: "#F7F8FA" }} ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-12 md:mb-16 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            WORKS
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            施工事例
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "#666" }}>
            実際の施工写真をビフォー・アフターでご紹介します。
          </p>
        </div>

        {/* 事例カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {CASES.map((caseItem, i) => (
            <div
              key={caseItem.id}
              className="fade-in bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-replace={caseItem.id}
            >
              {/* ビフォー・アフター画像 */}
              <div className="flex gap-1 p-3 pb-0">
                <ImageSlot
                  src={caseItem.beforeImg}
                  alt={`${caseItem.title} 施工前`}
                  label={caseItem.beforeLabel}
                  dataReplace={caseItem.dataReplaceBefore}
                />
                <div className="flex items-center px-1">
                  <ArrowRight size={20} style={{ color: "#2E7D32" }} />
                </div>
                <ImageSlot
                  src={caseItem.afterImg}
                  alt={`${caseItem.title} 施工後`}
                  label={caseItem.afterLabel}
                  dataReplace={caseItem.dataReplaceAfter}
                />
              </div>

              {/* テキスト情報 */}
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold mb-1" style={{ color: "#1F3A5F" }}>
                  {caseItem.title}
                </h3>
                <p className="text-xs font-medium mb-2" style={{ color: "#2E7D32" }}>
                  {caseItem.period}
                </p>
                <p className="text-[14px] leading-relaxed" style={{ color: "#555" }}>
                  {caseItem.point}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#testimonials"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            実際にリフォームされたお客様の声をご紹介します
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
