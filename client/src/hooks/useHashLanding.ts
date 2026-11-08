import { useEffect } from "react";

/**
 * 「/#flow」「/business/#contact」のように、# 付きのURLで開いたときに、その場所へ移動する。
 * 中身はスクリプトで作るため、ブラウザ任せだと移動しない（2026-11-08 本番で確認）。
 * 書体や写真の読み込みで位置がずれるので、読み込み完了時にもう一度合わせる（その間に利用者が動かしたら合わせない）。
 */
export function useHashLanding() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let userMoved = false;
    const markMoved = () => (userMoved = true);
    const land = () => {
      if (userMoved) return;
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    };
    const frame = requestAnimationFrame(land);
    window.addEventListener("wheel", markMoved, { passive: true, once: true });
    window.addEventListener("touchstart", markMoved, { passive: true, once: true });
    window.addEventListener("keydown", markMoved, { once: true });
    const onLoad = () => land();
    if (document.readyState === "complete") document.fonts?.ready.then(land);
    else window.addEventListener("load", onLoad, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("wheel", markMoved);
      window.removeEventListener("touchstart", markMoved);
      window.removeEventListener("keydown", markMoved);
    };
  }, []);
}
