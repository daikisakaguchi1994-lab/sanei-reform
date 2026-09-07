/**
 * ヒーロー背景スライドショー用の画像定義
 * ペルソナ別4パターン: 子育て世帯 / 趣味の家 / 一人暮らし / 60代セカンドライフ
 *
 * 画像は client/public/images/hero/ に配置。4枚は色調統一処理済み
 * （scripts/color-grade-hero.py、元画像は同ディレクトリの _originals/ にバックアップ）。
 *
 * 制約: 外部URL（Unsplash等の直リンク）は使用禁止。ローカル画像のみ。
 */
export interface HeroSlide {
  id: string;
  url: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "family",
    url: "/images/hero/hero-family.jpg",
    alt: "子育て世帯向けにフルリフォームした福岡市の明るいリビング",
  },
  {
    id: "hobby",
    url: "/images/hero/hero-hobby.jpg",
    alt: "趣味の時間を楽しむ空間にリフォームした部屋",
  },
  {
    id: "solo",
    url: "/images/hero/hero-solo.jpg",
    alt: "一人暮らし向けにリフォームしたコンパクトな住空間",
  },
  {
    id: "senior",
    url: "/images/hero/hero-senior.jpg",
    alt: "60代のセカンドライフ向けにリフォームした落ち着いた住空間",
  },
];
