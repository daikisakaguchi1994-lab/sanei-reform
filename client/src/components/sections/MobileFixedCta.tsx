/**
 * スマホ固定CTAバー
 * Design: 画面下部に固定表示（電話/LINE/問い合わせ）
 * スクロール300px以降で表示
 */
import { useState, useEffect } from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";

export default function MobileFixedCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div
        className="flex items-stretch shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* 電話 */}
        <a
          href="tel:092-407-4453"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 border-r border-gray-100"
          style={{ color: "#1F3A5F" }}
        >
          <Phone size={20} />
          <span className="text-[10px] font-medium">電話する</span>
        </a>

        {/* LINE */}
        <a
          href="#"
          data-replace="line-url-mobile"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 border-r border-gray-100"
          style={{ color: "#06C755" }}
        >
          {/* <!-- 編集メモ: line-url-mobile のhrefをLINEリンクに差し替え --> */}
          <MessageCircle size={20} />
          <span className="text-[10px] font-medium">LINE</span>
        </a>

        {/* お問い合わせ */}
        <a
          href="#contact"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-white"
          style={{ backgroundColor: "#2E7D32" }}
        >
          <Mail size={20} />
          <span className="text-[10px] font-bold">お問い合わせ</span>
        </a>
      </div>
    </div>
  );
}
