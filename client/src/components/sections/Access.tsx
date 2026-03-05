/**
 * アクセスセクション（地図）
 * Design: グレー背景、Googleマップ埋め込み＋住所情報
 * 次章フック: 「お問い合わせはこちらから →」
 */
import { useFadeIn } from "@/hooks/useFadeIn";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Access() {
  const ref = useFadeIn();

  return (
    <section id="access" className="section-padding" style={{ backgroundColor: "#F7F8FA" }} ref={ref}>
      <div className="container">
        {/* セクション見出し */}
        <div className="mb-12 md:mb-16 fade-in">
          <p className="text-sm font-medium tracking-[0.15em] mb-3" style={{ color: "#1F3A5F" }}>
            ACCESS
          </p>
          <h2 className="section-heading text-[22px] md:text-[28px]">
            アクセス
          </h2>
        </div>

        <div className="fade-in grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 地図 */}
          <div className="lg:col-span-3">
            <div className="rounded-lg overflow-hidden shadow-sm" style={{ aspectRatio: "16/10" }}>
              <iframe
                title="株式会社サンエイ Googleマップ"
                src="https://www.google.com/maps?q=33.5517239,130.3290875&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                style={{ minHeight: "320px" }}
              />
            </div>
          </div>

          {/* 住所情報 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 md:p-8 h-full">
              <h3 className="text-lg font-bold mb-6" style={{ color: "#1F3A5F" }}>
                株式会社サンエイ
              </h3>

              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#1F3A5F" }} />
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: "#999" }}>所在地</p>
                    <p className="text-[15px]" style={{ color: "#333" }}>
                      〒814-0165<br />
                      福岡県福岡市早良区次郎丸4-1-45
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#1F3A5F" }} />
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: "#999" }}>お電話</p>
                    <p className="text-[15px]">
                      <a href="tel:092-407-4453" className="font-bold hover:underline" style={{ color: "#1F3A5F" }}>
                        092-407-4453
                      </a>
                      <span className="text-xs ml-2" style={{ color: "#999" }}>（平日 9:00〜17:00）</span>
                    </p>
                    <p className="text-[14px] mt-1" style={{ color: "#666" }}>
                      繋がらない場合：
                      <a href="tel:080-4277-9209" className="hover:underline" style={{ color: "#1F3A5F" }}>
                        080-4277-9209
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#1F3A5F" }} />
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: "#999" }}>メール</p>
                    <a
                      href="mailto:sanei_kai1105@yahoo.co.jp"
                      className="text-[15px] hover:underline"
                      style={{ color: "#1F3A5F" }}
                    >
                      sanei_kai1105@yahoo.co.jp
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <a
                  href="https://www.google.com/maps?q=33.5517239,130.3290875"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  style={{ color: "#1F3A5F" }}
                >
                  Googleマップで開く
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 次章フック */}
        <div className="text-center mt-12 fade-in">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#1F3A5F" }}
          >
            お問い合わせはこちらから
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
