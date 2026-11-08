/**
 * 法人の方へ（/business/）の「対応できる工事」の線画アイコン（6点）。
 * 「施工の流れ」（FlowIcons.tsx）と同じ描き方: 紺の線＋緑の差し色、人物は描かない。
 */
const NAVY = "#1F3A5F";
const GREEN = "#2E7D32";
const LIGHT = "#DCEFDD";

const navy = { stroke: NAVY, strokeWidth: 2.2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const green = { stroke: GREEN, strokeWidth: 2.2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const fillGreen = { stroke: GREEN, strokeWidth: 2.2, fill: LIGHT, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ICONS = [
  // 原状回復工事: 何もない部屋（奥の壁と床）ときらめき
  <>
    <path d="M8 10h48v44H8z" {...navy} />
    <path d="M20 20h24v22H20z" {...navy} />
    <path d="M8 10l12 10M56 10L44 20" {...navy} />
    <path d="M20 42h24l12 12H8z" {...fillGreen} />
    <path d="M27 26h10v8H27z" {...navy} />
    <path d="M50 2v6M47 5h6" {...green} />
  </>,
  // クロス・床の張り替え: 壁紙のロールと床板
  <>
    <rect x="8" y="9" width="34" height="12" rx="6" {...navy} />
    <path d="M14 15h22" {...navy} />
    <path d="M26 21v25h14V21" {...fillGreen} />
    <path d="M6 52h52M6 58h52M18 52v6M34 52v6M50 52v6" {...navy} />
  </>,
  // 水まわりの修繕・設備交換: 水栓としずく
  <>
    <path d="M6 24h20a10 10 0 0 1 10 10v2" {...navy} />
    <path d="M16 24v-9M10 15h12" {...navy} />
    <path d="M32 36h8" {...navy} />
    <path d="M36 42s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z" {...fillGreen} />
    <path d="M8 60h48" {...navy} />
  </>,
  // 外壁・屋根: 家と塗装のローラー
  <>
    <path d="M4 30 22 15l18 15" {...navy} />
    <path d="M8 27v27h28V27" {...navy} />
    <path d="M18 54V43h8v11" {...navy} />
    <rect x="43" y="30" width="15" height="8" rx="2" {...fillGreen} />
    <path d="M50.5 38v6h-6v12" {...green} />
  </>,
  // 店舗の内装・リフォーム: 日よけのある店構え
  <>
    <path d="M8 12h48v9H8z" {...navy} />
    <path d="M8 21h48l-3 9H11z" {...fillGreen} />
    <path d="M20 21l-1 9M32 21v9M44 21l1 9" {...green} />
    <path d="M12 30v24h40V30" {...navy} />
    <path d="M19 54V40h10v14" {...navy} />
    <path d="M35 40h11v8H35z" {...navy} />
  </>,
  // 小さな修繕: ドアとドライバー
  <>
    <path d="M10 8h24v48H10z" {...navy} />
    <circle cx="29" cy="33" r="1.8" fill={NAVY} />
    <path d="M6 56h32" {...navy} />
    <rect x="45" y="12" width="10" height="16" rx="4" {...fillGreen} />
    <path d="M50 28v18" {...green} />
    <path d="M48 46h4l-2 4z" {...green} />
  </>,
];

export default function BusinessIcon({ index }: { index: number }) {
  return (
    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#EEF3F8] md:h-16 md:w-16">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-10 w-10 md:h-11 md:w-11">
        {ICONS[index]}
      </svg>
    </div>
  );
}
