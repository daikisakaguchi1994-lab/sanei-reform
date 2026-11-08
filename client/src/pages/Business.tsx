/**
 * 法人の方へ（/business/）
 * ターゲット: 福岡市周辺の不動産会社・管理会社のご担当者、オーナー、店舗。
 * 目的: まず1件、お見積もりを依頼してもらう（→ 継続のお取引）。
 * 流れ: 困りごと → 解決（対応できる工事）→ 任せる理由（写真で証拠）→ 依頼の流れ → 会社情報 → お問い合わせ。
 * 事実は社長の確認済み（2026-11-08「すべて対応可能」）と、サイトに既にある表記だけを使う。数値の約束（何日で〜）は書かない。
 * 見出し（h1・h2）は文字をそのまま書く（式を入れると書体の文字数えが止まる。vite.config.ts）。
 */
import Header from "@/components/sections/Header";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import MobileFixedCta from "@/components/sections/MobileFixedCta";
import BusinessIcon from "@/components/BusinessIcons";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useHashLanding } from "@/hooks/useHashLanding";
import { yearsSinceFounded } from "@/lib/company";
import { ArrowDown, ArrowRight, Check, Phone } from "lucide-react";

const NAVY = "#1F3A5F";

function Photo({
  base,
  widths,
  sizes,
  alt,
  className = "",
  eager = false,
}: {
  base: string;
  widths: number[];
  sizes: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={`${base}-${widths[widths.length - 1]}.webp`}
      srcSet={widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={900}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
      className={className}
    />
  );
}

const PAINS = [
  {
    pain: "退去が重なって、原状回復の手配が追いつかない",
    answer: "クロス・床・水まわり・小さな修繕まで、まとめてお任せいただけます。",
  },
  {
    pain: "現地に何度も足を運ぶ時間がない",
    answer: "工事が終わったら、仕上がりを写真つきでご報告します。",
  },
  {
    pain: "入居者さまから、急な不具合の連絡が入った",
    answer: "水漏れや設備の故障など、お急ぎのご相談もお受けします。",
  },
  {
    pain: "小さな修繕を頼める業者が見つからない",
    answer: "ドアの調整や棚の取付など、1か所からお受けします。",
  },
];

const WORKS = [
  { title: "原状回復工事", desc: "退去後のお部屋を、次の入居に向けて整えます。" },
  { title: "クロス・床の張り替え", desc: "壁紙や床材の張り替え、部分的な補修。" },
  { title: "水まわりの修繕・設備交換", desc: "水栓・トイレ・洗面台などの交換や修理。" },
  { title: "外壁・屋根", desc: "外壁の塗装や補修、屋根の補修。" },
  { title: "店舗の内装・リフォーム", desc: "店舗の内装工事や改装。" },
  { title: "小さな修繕", desc: "ドアの調整、棚や手すりの取付など。" },
];

const STEPS = [
  { title: "ご連絡", desc: "お電話・LINE・フォームで、物件の場所とご依頼の内容をお知らせください。" },
  { title: "現地確認・お見積もり", desc: "現地を確認して、お見積もりをお出しします。お見積もりは無料です。" },
  { title: "施工", desc: "日程を調整し、自社が責任を持って施工を管理します。お急ぎの場合もご相談ください。" },
  { title: "完了のご報告", desc: "仕上がりを写真つきでご報告します。ご請求のかたちは、ご相談に応じます。" },
];

function BusinessHero() {
  const years = yearsSinceFounded();
  const facts = [
    { big: `${years}年`, small: "創業" },
    { big: "自社", small: "施工を管理" },
    { big: "写真", small: "つきでご報告" },
  ];
  return (
    <section id="biz-hero" className="pt-16 md:pt-[109px]" style={{ backgroundColor: NAVY }}>
      <div className="md:grid md:min-h-[520px] md:grid-cols-2 lg:min-h-[560px]">
        {/* 写真（スマホは上、PCは右） */}
        <div className="relative h-[58vw] md:order-2 md:h-auto">
          <Photo
            base="/images/business/vacant"
            widths={[780, 1170, 1600]}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="原状回復を終えた、明るい賃貸マンションの空室のイメージ"
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
            eager
          />
        </div>

        {/* 文字 */}
        <div className="flex flex-col justify-center px-4 pb-10 pt-7 text-white md:order-1 md:py-14 md:pl-6 md:pr-10 lg:pl-[max(2rem,calc((100vw-1080px)/2+2rem))]">
          <p className="text-[13px] font-medium tracking-[0.06em] text-white/80 md:text-sm">
            不動産会社・管理会社・オーナーの皆さまへ
          </p>
          {/* 1行目（11文字）が折り返さない大きさ。スマホは画面幅から、PCは文字の欄の幅から決めた */}
          <h1 className="mt-3 text-[min(26px,calc((100vw-32px)/11.6))] leading-[1.42] md:text-[26px] lg:text-[34px] xl:text-[40px]" style={{ color: "#FFFFFF" }}>
            原状回復から修繕まで、
            <br />
            窓口ひとつで。
          </h1>
          <p className="mt-4 max-w-[480px] text-[15px] leading-[1.9] text-white/90 md:text-base">
            福岡市を拠点に、賃貸物件の原状回復・修繕から、店舗のリフォームまで。自社が責任を持って施工を管理し、工事のあとは写真つきでご報告します。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="cta-button !px-6 !py-3.5 !text-base">
              無料でお見積もりを依頼
              <ArrowRight size={18} />
            </a>
            <a
              href="tel:092-407-4453"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/60 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
              aria-label="電話をかける 092-407-4453"
            >
              <Phone size={18} />
              092-407-4453
            </a>
          </div>
          <ul className="mt-7 flex max-w-[480px] border-t border-white/20 pt-4 text-center md:text-left">
            {facts.map((f, i) => (
              <li key={f.small} className={`flex-auto px-1 md:flex-none ${i === 0 ? "md:pl-0 md:pr-4" : "border-l border-white/20 md:px-4"}`}>
                <span className="block text-lg font-bold leading-tight md:text-xl">{f.big}</span>
                <span className="block text-xs text-white/75">{f.small}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-white/75">
            個人のお客様は
            <a href="/" className="mx-1 underline underline-offset-2 hover:text-white">
              トップページ
            </a>
            をご覧ください。
          </p>
        </div>
      </div>
    </section>
  );
}

function Pains() {
  const ref = useFadeIn();
  return (
    <section id="biz-pains" className="section-padding" style={{ backgroundColor: "#F4F7FA" }} ref={ref}>
      <div className="container">
        <div className="fade-in mb-8 md:mb-12">
          <p className="mb-3 text-sm font-medium tracking-[0.15em]" style={{ color: NAVY }}>
            PROBLEMS
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            こんなお困りごとは
            <br className="sm:hidden" />
            ありませんか
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {PAINS.map((p, i) => (
            <div
              key={p.pain}
              className="fade-in overflow-hidden rounded-lg border border-[#E2E8F0] bg-white"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="px-5 pb-3 pt-4 text-[15px] leading-relaxed" style={{ color: "#555" }}>
                <span className="mr-2 inline-block rounded bg-[#EEF1F5] px-2 py-0.5 text-xs font-bold" style={{ color: "#5A6B80" }}>
                  お困りごと
                </span>
                {p.pain}
              </p>
              <div className="flex items-start gap-3 border-t border-[#E2E8F0] bg-[#F7FBF7] px-5 py-4">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                  <Check size={15} strokeWidth={3} />
                </span>
                <p className="text-[15px] font-bold leading-relaxed" style={{ color: NAVY }}>
                  {p.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works() {
  const ref = useFadeIn();
  return (
    <section id="biz-works" className="section-padding bg-white" ref={ref}>
      <div className="container">
        <div className="fade-in mb-8 md:mb-12">
          <p className="mb-3 text-sm font-medium tracking-[0.15em]" style={{ color: NAVY }}>
            SERVICE
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">対応できる工事</h2>
          <p className="mt-4 text-[15px]" style={{ color: "#666" }}>
            工事の大小にかかわらず、1か所からお受けします。まとめてのご依頼も歓迎です。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {WORKS.map((w, i) => (
            <div
              key={w.title}
              className="fade-in flex items-center gap-4 rounded-lg border border-[#E2E8F0] bg-white p-4 md:p-5"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <BusinessIcon index={i} />
              <div>
                <h3 className="text-base font-bold leading-snug md:text-[17px]" style={{ color: NAVY }}>
                  {w.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "#666" }}>
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reasons() {
  const ref = useFadeIn();
  const years = yearsSinceFounded();
  return (
    <section id="biz-reasons" className="section-padding" style={{ backgroundColor: "#F4F7FA" }} ref={ref}>
      <div className="container">
        <div className="fade-in mb-8 md:mb-12">
          <p className="mb-3 text-sm font-medium tracking-[0.15em]" style={{ color: NAVY }}>
            REASONS
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">サンエイにお任せいただく理由</h2>
        </div>

        <div className="space-y-10 md:space-y-14">
          {/* 01 写真つきのご報告 */}
          <div className="fade-in grid items-center gap-5 md:grid-cols-2 md:gap-10">
            <Photo
              base="/images/business/report"
              widths={[640, 960, 1280]}
              sizes="(min-width: 1080px) 504px, (min-width: 768px) 45vw, 100vw"
              alt="仕上がった部屋をスマートフォンで撮影する職人の手元のイメージ"
              className="aspect-[16/10] w-full rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-bold tracking-[0.1em]" style={{ color: "#2E7D32" }}>
                01
              </p>
              <h3 className="mt-1 text-xl font-bold leading-snug md:text-2xl" style={{ color: NAVY }}>
                現地に行かなくても、仕上がりがわかります
              </h3>
              <p className="mt-3 text-[15px] leading-[1.9]" style={{ color: "#555" }}>
                工事が終わったら、仕上がりを写真つきでご報告します。ご担当者さまが現地へ確認に行く手間を減らし、オーナーさまへのご説明にもお使いいただけます。
              </p>
            </div>
          </div>

          {/* 02 急ぎの不具合 */}
          <div className="fade-in grid items-center gap-5 md:grid-cols-2 md:gap-10">
            <Photo
              base="/images/business/repair"
              widths={[640, 960, 1280]}
              sizes="(min-width: 1080px) 504px, (min-width: 768px) 45vw, 100vw"
              alt="洗面台の水栓を交換する職人の手元のイメージ"
              className="aspect-[16/10] w-full rounded-lg object-cover md:order-2"
            />
            <div className="md:order-1">
              <p className="text-sm font-bold tracking-[0.1em]" style={{ color: "#2E7D32" }}>
                02
              </p>
              <h3 className="mt-1 text-xl font-bold leading-snug md:text-2xl" style={{ color: NAVY }}>
                入居中の急な不具合も、ご相談ください
              </h3>
              <p className="mt-3 text-[15px] leading-[1.9]" style={{ color: "#555" }}>
                水漏れや設備の故障など、入居者さまからの急なご連絡にも対応します。水栓やトイレなど、設備の交換もお任せください。
              </p>
            </div>
          </div>

          {/* 03 自社が責任を持つ */}
          <div className="fade-in grid items-center gap-5 md:grid-cols-2 md:gap-10">
            <dl className="grid grid-cols-3 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white text-center">
              <div className="px-2 py-6">
                <dt className="text-xs" style={{ color: "#666" }}>
                  創業
                </dt>
                <dd className="mt-1 text-2xl font-bold md:text-3xl" style={{ color: NAVY }}>
                  {years}
                  <span className="ml-0.5 text-base">年</span>
                </dd>
              </div>
              <div className="border-l border-[#E2E8F0] px-2 py-6">
                <dt className="text-xs" style={{ color: "#666" }}>
                  お返事の目安
                </dt>
                <dd className="mt-1 text-base font-bold leading-tight md:text-lg" style={{ color: NAVY }}>
                  当日〜
                  <br />
                  翌営業日
                </dd>
              </div>
              <div className="border-l border-[#E2E8F0] px-2 py-6">
                <dt className="text-xs" style={{ color: "#666" }}>
                  施工の管理
                </dt>
                <dd className="mt-1 text-2xl font-bold md:text-3xl" style={{ color: NAVY }}>
                  自社
                </dd>
              </div>
            </dl>
            <div>
              <p className="text-sm font-bold tracking-[0.1em]" style={{ color: "#2E7D32" }}>
                03
              </p>
              <h3 className="mt-1 text-xl font-bold leading-snug md:text-2xl" style={{ color: NAVY }}>
                窓口から完了まで、自社が責任を持ちます
              </h3>
              <p className="mt-3 text-[15px] leading-[1.9]" style={{ color: "#555" }}>
                平成22年の設立から、福岡市で住まいの工事を続けてきました。工事を丸投げせず、ご連絡の窓口から完了のご報告まで、自社が責任を持って施工を管理します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const ref = useFadeIn();
  return (
    <section id="biz-flow" className="section-padding bg-white" ref={ref}>
      <div className="container">
        <div className="fade-in mb-8 md:mb-12">
          <p className="mb-3 text-sm font-medium tracking-[0.15em]" style={{ color: NAVY }}>
            FLOW
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">ご依頼の流れ</h2>
          <p className="mt-4 text-[15px]" style={{ color: "#666" }}>
            窓口はひとつ。ご連絡から完了のご報告まで、同じ窓口でお受けします。
          </p>
        </div>
        <ol className="grid gap-3 md:grid-cols-4 md:gap-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="fade-in relative rounded-lg border border-[#E2E8F0] bg-white p-5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  {i + 1}
                </span>
                <h3 className="text-base font-bold md:text-[17px]" style={{ color: NAVY }}>
                  {s.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "#555" }}>
                {s.desc}
              </p>
              {i < STEPS.length - 1 && (
                <ArrowDown size={18} className="absolute -bottom-[15px] left-1/2 z-10 -translate-x-1/2 text-[#9AA8B8] md:hidden" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CompanyInfo() {
  const ref = useFadeIn();
  const rows: [string, string][] = [
    ["会社名", "株式会社サンエイ"],
    ["所在地", "〒814-0165 福岡県福岡市早良区次郎丸4-1-45"],
    ["設立", "平成22年10月"],
    ["対応エリア", "福岡市・春日市・大野城市・太宰府市・糸島市（その他のエリアもご相談ください）"],
    ["受付時間", "平日 9:00〜17:00（土日祝定休）"],
    ["電話", "092-407-4453"],
  ];
  return (
    <section id="biz-company" className="section-padding" style={{ backgroundColor: "#F4F7FA" }} ref={ref}>
      <div className="container">
        <div className="fade-in mb-8">
          <p className="mb-3 text-sm font-medium tracking-[0.15em]" style={{ color: NAVY }}>
            COMPANY
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">会社情報</h2>
        </div>
        <div className="fade-in overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
          <table className="w-full text-left text-[15px]">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} className="border-b border-[#E2E8F0] last:border-b-0">
                  <th className="w-[96px] bg-[#F8FAFC] px-4 py-3 align-top text-sm font-bold md:w-[160px] md:px-6" style={{ color: NAVY }}>
                    {k}
                  </th>
                  <td className="px-4 py-3 leading-relaxed md:px-6" style={{ color: "#444" }}>
                    {k === "電話" ? (
                      <a href="tel:092-407-4453" className="font-bold underline-offset-2 hover:underline" style={{ color: NAVY }}>
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function Business() {
  useHashLanding();
  return (
    <div className="biz-page flex min-h-screen flex-col">
      <Header />
      <main>
        <BusinessHero />
        <Pains />
        <Works />
        <Reasons />
        <Steps />
        <CompanyInfo />
        <Contact variant="business" />
      </main>
      <Footer />
      <MobileFixedCta />
    </div>
  );
}
