/**
 * ヒーロー背景スライドショーの画像定義
 * PCとスマホで写真の形が違うので、一覧を分けている（スマホは写真の下に文字を置く）。
 *
 * 画像は client/public/images/hero/ に配置（client/scripts/make-hero-images.mjs で作成）。
 * 写真はすべて Codex で生成したイメージ（2026-11-07）。実際の施工事例ではない。
 *
 * 制約: 外部URL（Unsplash等の直リンク）は使用禁止。ローカル画像のみ。
 */
export interface HeroSlide {
  id: string;
  /** 例: /images/hero/exterior → exterior-960.webp など */
  base: string;
  widths: number[];
  alt: string;
}

const PC_WIDTHS = [960, 1376, 1672];
const SP_WIDTHS = [780, 1170];

export const HERO_SLIDES_PC: HeroSlide[] = [
  {
    id: "exterior",
    base: "/images/hero/exterior",
    widths: PC_WIDTHS,
    alt: "外壁と屋根をきれいにした2階建て住宅の外観のイメージ",
  },
  {
    id: "bath",
    base: "/images/hero/bath",
    widths: PC_WIDTHS,
    alt: "藍色の壁面が映える、明るく清潔な浴室のイメージ",
  },
  {
    id: "craft",
    base: "/images/hero/craft",
    widths: PC_WIDTHS,
    alt: "新しい木の床の室内で作業する職人の後ろ姿のイメージ",
  },
];

export const HERO_SLIDES_SP: HeroSlide[] = [
  {
    id: "kitchen",
    base: "/images/hero/kitchen-sp",
    widths: [780, 1024],
    alt: "藍色のキッチンと木の床が調和した、明るいダイニングキッチンのイメージ",
  },
  {
    id: "bath",
    base: "/images/hero/bath-sp",
    widths: SP_WIDTHS,
    alt: "藍色の壁面が映える、明るく清潔な浴室のイメージ",
  },
  {
    id: "exterior",
    base: "/images/hero/exterior-sp",
    widths: SP_WIDTHS,
    alt: "外壁と屋根をきれいにした2階建て住宅の外観のイメージ",
  },
  {
    id: "craft",
    base: "/images/hero/craft-sp",
    widths: SP_WIDTHS,
    alt: "新しい木の床の室内で作業する職人の後ろ姿のイメージ",
  },
];

/**
 * 「画像はイメージです」の表示スイッチ。
 * 確認用の画面では本番の姿で判断できるよう隠している（Daiki氏の方針 2026-11-05）。
 * AI生成の写真を出すので、公開前に必ず true に戻すこと。
 */
export const SHOW_PHOTO_NOTE = false;

export function heroSrcSet(slide: HeroSlide) {
  return slide.widths.map((w) => `${slide.base}-${w}.webp ${w}w`).join(", ");
}

export function heroSrc(slide: HeroSlide) {
  return `${slide.base}-${slide.widths[slide.widths.length - 1]}.webp`;
}
