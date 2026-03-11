/**
 * サービスセクション（対応できること）
 * Design: グレー背景、サービスカード一覧
 * 次章フック: 「実際の施工はどう進むのか？次は"施工の流れ"をご覧ください →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import { Droplets, PaintBucket, Hammer, Home, Ruler, Lightbulb, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Droplets,
    title: "水回りリフォーム",
    items: ["キッチン", "浴室", "トイレ", "洗面所"],
    dataReplace: "service-water",
  },
  {
    icon: PaintBucket,
    title: "クロス張替え",
    items: ["壁紙張替え", "天井クロス", "アクセントクロス", "防カビ仕様"],
    dataReplace: "service-cross",
  },
  {
    icon: Ruler,
    title: "床工事",
    items: ["フローリング張替え", "クッションフロア", "畳からフローリング", "床下補修"],
    dataReplace: "service-floor",
  },
  {
    icon: Hammer,
    title: "大工工事",
    items: ["間取り変更", "建具交換", "収納造作", "階段補修"],
    dataReplace: "service-carpenter",
  },
  {
    icon: Home,
    title: "総合リフォーム",
    items: ["全面改装", "中古住宅リノベ", "戸建の外壁塗装", "バリアフリー"],
    dataReplace: "service-total",
  },
  {
    icon: Lightbulb,
    title: "小さな工事もOK",
    items: ["ドア修理", "棚の取付", "手すり設置", "その他ご相談"],
    dataReplace: "service-small",
  },
];

export default function Services() {
  const ref = useFadeIn();

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: "#F7F8FA" }} ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-12 md:mb-16 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            SERVICES
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            対応できる工事
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "#666" }}>
            福岡市・福岡県全域で、小さな修繕から大規模リフォームまで、住まいのお困りごとをワンストップで解決します。
          </p>
        </div>

        {/* サービスグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="fade-in bg-white rounded-lg p-6 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
                data-replace={service.dataReplace}
              >
                {/* <!-- 編集メモ: service カードのテキスト差し替え可能 --> */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#1F3A5F" }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: "#1F3A5F" }}>
                    {service.title}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[15px]" style={{ color: "#555" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#2E7D32" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#flow"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            実際の施工はどう進むのか？次は"施工の流れ"をご覧ください
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
