/**
 * 固定CTAバー（モバイル底部 + PC右下フローティング）
 * Design: スクロール300px以降で表示
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

  return (
    <>
      {/* PC用: 右下フローティングボタン */}
      <div
        className={`hidden lg:flex flex-col gap-3 fixed z-50 transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ right: "1.5rem", bottom: "1.5rem" }}
      >
        {/* 電話ボタン */}
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-16 whitespace-nowrap text-sm font-medium text-white px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ backgroundColor: "#1B4F8A" }}>
            お電話はこちら
          </span>
          <a
            href="tel:092-407-4453"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:opacity-85 transition-opacity"
            style={{ backgroundColor: "#1B4F8A" }}
            aria-label="電話する"
          >
            <Phone size={22} className="text-white" />
          </a>
        </div>

        {/* LINEボタン */}
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-16 whitespace-nowrap text-sm font-medium text-white px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ backgroundColor: "#06C755" }}>
            LINEで相談
          </span>
          <a
            href="https://line.me/ti/p/~sanei_kai1105"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:opacity-85 transition-opacity"
            style={{ backgroundColor: "#06C755" }}
            aria-label="LINEで相談"
          >
            <MessageCircle size={22} className="text-white" />
          </a>
        </div>
      </div>

      {/* モバイル用: 底部固定バー */}
    <div className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}>
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
          href="https://line.me/ti/p/~sanei_kai1105"
          target="_blank"
          rel="noopener noreferrer"
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
    </>
  );
}
