import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// スクロール出現（.fade-in）は、この印が付いたときだけ「最初は透明」にする。
// スクリプトが読み込めなかった場合は、内容が透明のまま残らず、そのまま表示される。
document.documentElement.classList.add("fade-ready");

// 画面外のセクションの「配置の後回し」（index.css の content-visibility）は、ページ内リンクで移動するときに解除する。
// 解除しないと、なめらかスクロールの途中で通り過ぎるセクションの高さが変わり、行き先がずれる。
// 「#contact」付きのURLで開いたときは、最初から解除する。
const root = document.documentElement;
if (location.hash) root.classList.add("cv-off");
const releaseOnAnchor = (e: Event) => {
  if ((e.target as Element | null)?.closest?.('a[href^="#"]')) {
    root.classList.add("cv-off");
    document.removeEventListener("click", releaseOnAnchor, true);
  }
};
document.addEventListener("click", releaseOnAnchor, true);

createRoot(document.getElementById("root")!).render(<App />);
