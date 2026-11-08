/**
 * ページの行き来の決まり。
 * トップページ以外（法人の方へ /business/ など）では、メニューの「#〜」をトップページの該当箇所へ向ける。
 */
export const BUSINESS_PATH = "/business/";

export function isHomePage() {
  return typeof window === "undefined" || window.location.pathname === "/";
}

export function isBusinessPage() {
  return typeof window !== "undefined" && window.location.pathname.startsWith("/business");
}

/** "#strengths" → トップページなら "#strengths"、ほかのページなら "/#strengths" */
export function homeHref(hash: string) {
  return isHomePage() ? hash : `/${hash}`;
}
