import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// スクロール出現（.fade-in）は、この印が付いたときだけ「最初は透明」にする。
// スクリプトが読み込めなかった場合は、内容が透明のまま残らず、そのまま表示される。
document.documentElement.classList.add("fade-ready");

createRoot(document.getElementById("root")!).render(<App />);
