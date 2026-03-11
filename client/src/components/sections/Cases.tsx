/**
 * 施工事例セクション（証拠）
 * Design: グレー背景、ビフォー・アフターカード
 * ユーザー提供の実際の施工写真を使用
 * 次章フック: 「実際にリフォームされたお客様の声をご紹介します →」
 */
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import {
  CASE_KITCHEN_BEFORE,
  CASE_KITCHEN_AFTER,
  CASE_BATH_BEFORE,
  CASE_BATH_AFTER,
  CASE_ROOM_BEFORE,
  CASE_ROOM_AFTER_1,
  CASE_WASHSTAND_BEFORE,
  CASE_WASHSTAND_AFTER,
  CASE_ROOM_BEFORE_2,
  CASE_ROOM_AFTER_2,
} from "@/lib/images";
import { ArrowRight } from "lucide-react";

type Category = "すべて" | "水回り" | "キッチン" | "内装" | "外装" | "店舗";
const TABS: Category[] = ["すべて", "水回り", "キッチン", "内装", "外装", "店舗"];

interface CaseItem {
  id: string;
  category: Category;
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
    category: "キッチン",
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
    category: "内装",
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
    category: "水回り",
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
    category: "水回り",
    title: "浴室リフォーム",
    period: "工期：3日〜1週間",
    point: "青いタイル張りの在来浴室を、清潔感あふれるユニットバスへ全面リフォーム。水色のアクセントパネルと鏡・棚付きの機能的な空間に生まれ変わり、保温性・清掃性も大幅に向上しました。",
    beforeImg: CASE_BATH_BEFORE,
    afterImg: CASE_BATH_AFTER,
    beforeLabel: "施工前",
    afterLabel: "施工後",
    dataReplaceBefore: "case-04-before",
    dataReplaceAfter: "case-04-after",
  },
  {
    id: "case-05",
    category: "内装",
    title: "内装クロス・床張替え",
    period: "工期：2日〜1週間",
    point: "畳・木天井・押し入れの古い和室を全面リフォーム。明るい天然木調フローリングと白いクロスで統一し、開放感あふれる洋室に。折り戸クローゼットを新設し、収納力も大幅にアップしました。",
    beforeImg: CASE_ROOM_BEFORE_2,
    afterImg: CASE_ROOM_AFTER_2,
    beforeLabel: "施工前",
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
  const [activeTab, setActiveTab] = useState<Category>("すべて");

  const filtered = activeTab === "すべて" ? CASES : CASES.filter((c) => c.category === activeTab);

  return (
    <section id="cases" className="section-padding" style={{ backgroundColor: "#F7F8FA" }} ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-8 md:mb-10 fade-in">
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

        {/* カテゴリーフィルタータブ */}
        <div className="flex flex-wrap gap-2 mb-8 fade-in">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-sm font-medium px-4 py-1.5 rounded-full transition-colors duration-200"
                style={
                  isActive
                    ? { backgroundColor: "#1F3A5F", color: "#FFFFFF", border: "1px solid #1F3A5F" }
                    : { backgroundColor: "#FFFFFF", color: "#666", border: "1px solid #DDD" }
                }
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 事例カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filtered.map((caseItem, i) => (
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
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold" style={{ color: "#1F3A5F" }}>
                    {caseItem.title}
                  </h3>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: "#EEF2F8", color: "#1F3A5F" }}
                  >
                    {caseItem.category}
                  </span>
                </div>
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
