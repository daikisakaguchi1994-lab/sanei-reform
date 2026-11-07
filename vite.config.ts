import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import { yearsSinceFounded } from "./client/src/lib/company";

const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com/css2";
const SOURCE_DIRS = ["client/src/components/sections", "client/src/pages"];

function unescapeJs(text: string) {
  return text
    .replace(/\\u\{([0-9a-f]+)\}/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\u([0-9a-f]{4})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/** 文字の集合。半角英数記号は常に含める。絵文字は Noto に無いので外す。 */
function collectChars(text: string) {
  const chars = new Set<string>();
  for (let code = 32; code < 127; code++) chars.add(String.fromCharCode(code));
  for (const char of text) {
    if (char.charCodeAt(0) < 128) continue;
    if (/\p{Extended_Pictographic}|\p{Cs}|\p{Co}|️/u.test(char)) continue;
    if (/[\p{L}\p{N}\p{P}\p{S}　]/u.test(char)) chars.add(char);
  }
  return [...chars].join("");
}

/** 明朝体を使う見出し（h1・h2）の文字。式が入っていたら字が欠けるのでビルドを止める。 */
function headingText(root: string) {
  let text = "";
  for (const dir of SOURCE_DIRS) {
    for (const file of fs.readdirSync(path.join(root, dir))) {
      if (!file.endsWith(".tsx")) continue;
      const source = fs.readFileSync(path.join(root, dir, file), "utf8");
      for (const match of source.matchAll(/<h[12]\b[^>]*>([\s\S]*?)<\/h[12]>/g)) {
        const body = match[1].replace(/<[^>]+>/g, "").replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");
        if (body.includes("{")) {
          throw new Error(`font-subset: ${file} の見出しに式があり、使う文字を数えられません: ${body.trim().slice(0, 60)}`);
        }
        text += body;
      }
    }
  }
  return text;
}

/**
 * 本番ビルドで、Google Fonts の読み込みを「サイトで使っている文字だけ」に絞る。
 * 文字はビルドのたびに数えるので、文言を変えても字は欠けない。開発サーバーは全文字のまま。
 */
function fontSubset(root: string): Plugin {
  return {
    name: "font-subset",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        let code = html;
        for (const item of Object.values(ctx.bundle)) {
          if (item.type === "chunk") code += item.code;
        }
        const link = (family: string, chars: string) =>
          `<link href="${GOOGLE_FONTS_CSS}?family=${family}&amp;display=swap&amp;text=${encodeURIComponent(chars)}" rel="stylesheet" />`;
        const links = [
          link("Noto+Sans+JP:wght@400;500;700", collectChars(unescapeJs(code))),
          link("Noto+Serif+JP:wght@700", collectChars(headingText(root))),
        ].join("\n    ");
        const pattern = /<link href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>/;
        if (!pattern.test(html)) throw new Error("font-subset: index.html に Google Fonts の link がありません");
        return html.replace(pattern, () => links);
      },
    },
  };
}

/** index.html の説明文の「創業○年」を、ビルドの時点の年数にする。 */
function companyYears(): Plugin {
  return {
    name: "company-years",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replace(/%COMPANY_YEARS%/g, String(yearsSinceFounded())),
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), companyYears(), fontSubset(import.meta.dirname)],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  // VITE_ に加え、Behold ウィジェット用の PUBLIC_ プレフィックスもクライアントへ渡す
  envPrefix: ["VITE_", "PUBLIC_"],
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
