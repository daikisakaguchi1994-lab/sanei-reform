/**
 * ホームページ（メインページ）
 * Design: 「街の信頼」コーポレートモダン × ローカルトラスト
 * セクション順: Hero → 強み → サービス → CTA → 施工の流れ → 施工事例 → CTA → お客様の声 → 会社紹介 → FAQ → アクセス → お問い合わせ → フッター
 */
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Strengths from "@/components/sections/Strengths";
import Services from "@/components/sections/Services";
import CtaBar from "@/components/sections/CtaBar";
import Flow from "@/components/sections/Flow";
import Cases from "@/components/sections/Cases";
import Testimonials from "@/components/sections/Testimonials";
import Company from "@/components/sections/Company";
import Faq from "@/components/sections/Faq";
import Access from "@/components/sections/Access";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import MobileFixedCta from "@/components/sections/MobileFixedCta";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー（sticky） */}
      <Header />

      <main>
        {/* 1. ヒーロー（安心の宣言） */}
        <Hero />

        {/* 2. 強み（3つ） */}
        <Strengths />

        {/* 3. 対応できること（サービス） */}
        <Services />

        {/* 中間CTA（迷いを先に回収） */}
        <CtaBar message="リフォームのこと、まずはお気軽にご相談ください" />

        {/* 4. 施工の流れ（不安解消） */}
        <Flow />

        {/* 5. 施工事例（証拠） */}
        <Cases />

        {/* 中間CTA */}
        <CtaBar message="気になる工事がありましたら、お気軽にお問い合わせください" />

        {/* 6. お客様の声（第三者証言） */}
        <Testimonials />

        {/* 7. 会社紹介/代表挨拶（顔の見える信頼） */}
        <Company />

        {/* 8. よくある質問（最後の不安解消） */}
        <Faq />

        {/* 9. アクセス（地図） */}
        <Access />

        {/* 10. お問い合わせ（行動） */}
        <Contact />
      </main>

      {/* フッター */}
      <Footer />

      {/* スマホ固定CTA */}
      <MobileFixedCta />
    </div>
  );
}
