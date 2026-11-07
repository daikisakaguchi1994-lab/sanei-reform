/**
 * ヒーロー画像の軽量版（webp・複数幅）と、共有用の og-image.jpg を作る。
 *
 * 使い方（リポジトリ直下で）:
 *   SHARP_FROM=C:/projects/clients/tyd-web/node_modules/sharp node client/scripts/make-hero-variants.mjs
 *   ※ このプロジェクトには sharp を依存に入れていない。別案件の node_modules を借りる。
 *
 * 入力: client/public/images/hero/hero-*.jpg（元画像。差し替え時もこのスクリプトを再実行する）
 * 出力: 同じフォルダに hero-<id>-640.webp / -960.webp / -1376.webp、client/public/og-image.jpg
 */
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_FROM || "sharp");

const root = path.resolve(import.meta.dirname, "..", "public");
const heroDir = path.join(root, "images", "hero");
const WIDTHS = [640, 960, 1376];

const sources = readdirSync(heroDir).filter((f) => /^hero-[a-z]+\.jpg$/.test(f));
for (const file of sources) {
  const id = file.replace(/^hero-|\.jpg$/g, "");
  const meta = await sharp(path.join(heroDir, file)).metadata();
  for (const w of WIDTHS) {
    if (w > meta.width) continue; // 拡大はしない
    const out = path.join(heroDir, `hero-${id}-${w}.webp`);
    await sharp(path.join(heroDir, file)).resize({ width: w }).webp({ quality: 78 }).toFile(out);
  }
  console.log("variants:", id, `(元 ${meta.width}x${meta.height})`);
}

// 共有用画像（1200x630）。1枚目のスライドから作る。文字・暗幕は入れない。
await sharp(path.join(heroDir, "hero-family.jpg"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, "og-image.jpg"));
console.log("og-image.jpg 1200x630");
