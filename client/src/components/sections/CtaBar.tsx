/**
 * 中間CTAバー
 * Design: ネイビー背景に白文字＋グリーンボタン
 * 2〜3セクションごとに挟み、迷いを先に回収する
 */
import { Phone, MessageCircle } from "lucide-react";

interface CtaBarProps {
  message?: string;
}

export default function CtaBar({ message = "リフォームのこと、まずはお気軽にご相談ください" }: CtaBarProps) {
  return (
    <div className="py-10 md:py-14" style={{ backgroundColor: "#1F3A5F" }}>
      <div className="container text-center">
        <p className="text-white text-base md:text-lg font-medium mb-6">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:092-407-4453"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1F3A5F] font-bold rounded-md hover:bg-gray-100 transition-colors text-base"
          >
            <Phone size={18} />
            092-407-4453
          </a>
          <a
            href="#contact"
            className="cta-button"
          >
            <MessageCircle size={18} />
            無料相談・お見積もり
          </a>
        </div>
        <p className="text-white/60 text-xs mt-4">
          受付時間：平日 9:00〜17:00 ／ お急ぎの方は直通番号へ：080-4277-9209
        </p>
      </div>
    </div>
  );
}
