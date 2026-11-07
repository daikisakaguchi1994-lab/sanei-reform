import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-medium tracking-[0.15em]" style={{ color: "#1F3A5F" }}>
          404
        </p>
        <h1 className="mb-4 text-[22px] font-bold" style={{ color: "#1F3A5F" }}>
          ページが見つかりません
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed" style={{ color: "#555" }}>
          お探しのページは、移動または削除された可能性があります。
          <br />
          トップページからお探しいただくか、お電話でお問い合わせください。
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg px-6 font-bold text-white"
            style={{ backgroundColor: "#2E7D32" }}
          >
            <Home size={18} />
            トップページへ戻る
          </a>
          <a
            href="tel:092-407-4453"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border-2 px-6 font-bold"
            style={{ borderColor: "#1F3A5F", color: "#1F3A5F" }}
          >
            <Phone size={18} />
            092-407-4453
          </a>
        </div>
      </div>
    </main>
  );
}
