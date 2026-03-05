/**
 * フッターセクション
 * Design: ダークネイビー背景、会社情報＋ナビリンク＋コピーライト
 */

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#162D4A" }}>
      <div className="container py-10 md:py-14">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* ロゴ＋会社情報 */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4" data-replace="footer-logo">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="6" fill="white" fillOpacity="0.1" />
                <path d="M10 28V16L20 10L30 16V28H24V22H16V28H10Z" fill="white" fillOpacity="0.7" />
                <rect x="17" y="18" width="6" height="5" rx="0.5" fill="#162D4A" />
              </svg>
              <div>
                <div className="text-white text-base font-bold">SANEI</div>
                <div className="text-white/50 text-[10px]">株式会社サンエイ</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              〒814-0165<br />
              福岡県福岡市早良区次郎丸4-1-45<br />
              TEL: 092-407-4453
            </p>
          </div>

          {/* ナビリンク */}
          <div className="flex gap-8 md:gap-12">
            <div>
              <p className="text-white/40 text-xs font-medium mb-3 tracking-wider">MENU</p>
              <nav className="flex flex-col gap-2">
                {[
                  { label: "強み", href: "#strengths" },
                  { label: "サービス", href: "#services" },
                  { label: "施工の流れ", href: "#flow" },
                  { label: "施工事例", href: "#cases" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-white/40 text-xs font-medium mb-3 tracking-wider">INFO</p>
              <nav className="flex flex-col gap-2">
                {[
                  { label: "お客様の声", href: "#testimonials" },
                  { label: "会社紹介", href: "#company" },
                  { label: "FAQ", href: "#faq" },
                  { label: "アクセス", href: "#access" },
                  { label: "お問い合わせ", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* コピーライト */}
      <div className="border-t border-white/10">
        <div className="container py-4">
          <p className="text-white/30 text-xs text-center">
            &copy; {new Date().getFullYear()} 株式会社サンエイ All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
