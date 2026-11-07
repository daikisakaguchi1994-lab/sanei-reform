/**
 * 「施工の流れ」の線画アイコン（6点）。紺の線＋緑の差し色の2色だけ、人物は描かない。
 * 見本と作り方: C:\projects\_archive\sanei-flow-mock_20261107\
 */
const NAVY = "#1F3A5F";
const GREEN = "#2E7D32";
const LIGHT = "#DCEFDD";

const navy = { stroke: NAVY, strokeWidth: 2.2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const green = { stroke: GREEN, strokeWidth: 2.2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const fillGreen = { stroke: GREEN, strokeWidth: 2.2, fill: LIGHT, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ICONS = [
  // 01 お問い合わせ: スマホと吹き出し
  <>
    <rect x="14" y="12" width="22" height="40" rx="4" {...navy} />
    <path d="M22 17h6" {...navy} />
    <circle cx="25" cy="46" r="1.6" fill={NAVY} />
    <path d="M33 16h17a5 5 0 0 1 5 5v7a5 5 0 0 1-5 5h-9l-6 5v-5h-2" {...fillGreen} />
    <circle cx="39.5" cy="24.5" r="1.5" fill={GREEN} />
    <circle cx="44.5" cy="24.5" r="1.5" fill={GREEN} />
    <circle cx="49.5" cy="24.5" r="1.5" fill={GREEN} />
  </>,
  // 02 現地調査・ヒアリング: 家と虫めがね
  <>
    <path d="M9 31 25 17l16 14" {...navy} />
    <path d="M13 28v22h24V28" {...navy} />
    <path d="M21 50V39h8v11" {...navy} />
    <circle cx="44" cy="39" r="8" {...fillGreen} />
    <path d="m50 45 6 6" {...green} />
  </>,
  // 03 お見積もり・ご提案: 書類と円のしるし
  <>
    <path d="M15 10h20l8 8v32H15z" {...navy} />
    <path d="M35 10v8h8" {...navy} />
    <path d="M21 25h14M21 31h14M21 37h9" {...navy} />
    <circle cx="45" cy="45" r="10" {...fillGreen} />
    <path d="m41 40 4 5 4-5M45 45v6M41.5 46.5h7M41.5 49.5h7" {...green} />
  </>,
  // 04 ご契約・着工: 書類とペン（署名）
  <>
    <path d="M13 12h24v38H13z" {...navy} />
    <path d="M19 21h12M19 27h12" {...navy} />
    <path d="M18 42c3-4 5 3 8-1s4 2 6 0" {...green} strokeWidth={2} />
    <path d="m40 44 13-13 4 4-13 13-6 2z" {...fillGreen} />
    <path d="m50 34 4 4" {...green} />
  </>,
  // 05 施工: ヘルメット（職人の仕事）
  <>
    <path d="M14 40a18 18 0 0 1 36 0" {...fillGreen} />
    <path d="M10 40h44a2 2 0 0 1 0 6H10a2 2 0 0 1 0-6z" {...navy} />
    <path d="M27 23v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" {...navy} />
    <path d="M32 18v22" {...navy} />
    <path d="M22 28v12M42 28v12" {...green} strokeWidth={2} />
  </>,
  // 06 完工・お引き渡し: 家と鍵、きらめき
  <>
    <path d="M7 31 23 17l16 14" {...navy} />
    <path d="M11 28v22h24V28" {...navy} />
    <path d="M19 50V39h8v11" {...navy} />
    <circle cx="45" cy="38" r="6" {...fillGreen} />
    <path d="M45 44v10M45 49h4M45 53h3" {...green} />
    <path d="M51 14v6M48 17h6M57 25v4M55 27h4" {...green} />
  </>,
];

/** 番号の札つきの丸い線画。番号は文字のまま残す（読み上げ・検索のため）。 */
export default function FlowIcon({ index, number }: { index: number; number: string }) {
  return (
    <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#EEF3F8] md:h-[88px] md:w-[88px]">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12 md:h-16 md:w-16">
        {ICONS[index]}
      </svg>
      <span className="absolute -left-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#1F3A5F] px-1.5 text-xs font-bold leading-none text-white ring-[3px] ring-white md:h-7 md:min-w-7 md:text-[13px]">
        {number}
      </span>
    </div>
  );
}
