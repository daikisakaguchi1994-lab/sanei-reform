/**
 * ヘッダーセクション
 * Design: ネイビーのstickyヘッダー、白文字のロゴと電話番号
 * スクロールで影が付く。SPではハンバーガーメニュー。
 */
import { useState, useEffect } from "react";
import { Phone, Menu, X, MessageCircle } from "lucide-react";

const NAV_ITEMS = [
  { label: "強み", href: "#strengths" },
  { label: "サービス", href: "#services" },
  { label: "施工の流れ", href: "#flow" },
  { label: "施工事例", href: "#cases" },
  { label: "お客様の声", href: "#testimonials" },
  { label: "会社紹介", href: "#company" },
  { label: "FAQ", href: "#faq" },
  { label: "アクセス", href: "#access" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: "#1F3A5F" }}
    >
      {/* 上部バー: 電話番号 */}
      <div className="hidden md:block border-b border-white/10">
        <div className="container flex justify-end items-center py-2 text-white/80">
          <span className="text-xs">平日 9:00〜17:00</span>
          <span className="mx-2 text-xs">|</span>
          <a href="tel:092-407-4453" className="flex items-center gap-1.5 hover:text-white transition-colors font-bold text-sm">
            <Phone size={14} />
            092-407-4453
          </a>
        </div>
      </div>

      {/* メインヘッダー */}
      <div className="container flex items-center justify-between py-3 md:py-4">
        {/* ロゴ */}
        <a href="#hero" className="flex items-center gap-2" data-replace="logo">
          {/* <!-- 編集メモ: SVGロゴを差し替え可能 --> */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="6" fill="white" fillOpacity="0.15" />
            <path d="M10 28V16L20 10L30 16V28H24V22H16V28H10Z" fill="white" fillOpacity="0.9" />
            <rect x="17" y="18" width="6" height="5" rx="0.5" fill="#1F3A5F" />
          </svg>
          <div className="text-white">
            <div className="text-lg md:text-xl font-bold leading-tight tracking-wide">SANEI</div>
            <div className="text-[10px] md:text-xs leading-tight opacity-80">株式会社サンエイ</div>
          </div>
        </a>

        {/* PC ナビゲーション */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/85 text-sm hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://line.me/ti/p/h91M99O59l"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-full text-white hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "#06C755" }}
          >
            <MessageCircle size={15} />
            LINEで相談
          </a>
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-bold rounded"
            style={{ backgroundColor: "#2E7D32", color: "#FFFFFF" }}
          >
            お問い合わせ
          </a>
        </nav>

        {/* SP: 電話＋ハンバーガー */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="tel:092-407-4453"
            className="flex items-center gap-1.5 text-white"
            aria-label="電話をかける"
          >
            <Phone size={16} />
            <span className="text-sm font-bold">092-407-4453</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white"
            aria-label="メニューを開く"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* SP メニュー */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/10" style={{ backgroundColor: "#1F3A5F" }}>
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="text-white/85 text-base py-2.5 px-3 rounded hover:bg-white/10 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://line.me/ti/p/h91M99O59l"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="mt-2 py-3 text-center font-bold rounded text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: "#06C755" }}
            >
              <MessageCircle size={18} />
              LINEで相談
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="py-3 text-center font-bold rounded text-white"
              style={{ backgroundColor: "#2E7D32" }}
            >
              お問い合わせ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
