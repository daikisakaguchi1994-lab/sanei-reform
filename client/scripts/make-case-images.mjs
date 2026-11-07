/**
 * 施工事例の写真を、表示の大きさに合わせた軽い webp にする（写真の内容は変えない）。
 *
 * 使い方（リポジトリ直下で）:
 *   SHARP_FROM=C:/projects/clients/tyd-web/node_modules/sharp \
 *   SRC=C:/projects/_archive/sanei-case-images_20261107/sources \
 *   node client/scripts/make-case-images.mjs
 *   ※ このプロジェクトには sharp を依存に入れていない。別案件の node_modules を借りる。
 *
 * 入力: SRC の jpg（お客様の物件の写真の原本）
 * 出力: client/public/images/cases/<name>.webp、client/public/line-qr.png
 */
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_FROM || "sharp");

const SRC = process.env.SRC;
if (!SRC) throw new Error("SRC（元画像のフォルダ）を指定してください");

const pub = path.resolve(import.meta.dirname, "..", "public");
const out = path.join(pub, "images", "cases");
mkdirSync(out, { recursive: true });

// 施工事例の枠は最大でも約270px。比較スライダー（room-*-2）は最大約640px。高精細の画面の分を見込む。
const PHOTOS = [
  ["kitchen-before", 640],
  ["kitchen-after", 640],
  ["room-before", 640],
  ["room-after", 640],
  ["washstand-before", 640],
  ["washstand-after", 640],
  ["bath-before", 640],
  ["bath-after", 640],
  ["room-before-2", 887],
  ["room-after-2", 887],
];

for (const [name, width] of PHOTOS) {
  const input = path.join(SRC, `${name}.jpg`);
  const file = path.join(out, `${name}.webp`);
  // rotate(): スマホ写真の向きの情報を画像に焼き込む（消すと横倒しになる）
  const info = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(file);
  console.log(name, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}

// LINEのQRコード（表示は96px）。読み取りのため余裕をもって480pxにする。
const qr = await sharp(path.join(SRC, "line-qr.jpg")).resize(480, 480).png({ palette: true, colors: 64 }).toFile(path.join(pub, "line-qr.png"));
console.log("line-qr.png", `${qr.width}x${qr.height}`, `${Math.round(qr.size / 1024)}KB`);
