/**
 * お問い合わせセクション（行動）
 * Design: ネイビー背景、ここまで読んだ人の心理を受けて背中を押す文言
 * 電話・LINE・メールの3つの導線
 */
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { Phone, MessageCircle, Mail, ChevronDown, ChevronUp } from "lucide-react";

export default function Contact() {
  const ref = useFadeIn();
  const [optionalOpen, setOptionalOpen] = useState(false);

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: "#1F3A5F" }} ref={ref}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* 見出し */}
          <div className="fade-in mb-8">
            <p className="text-sm font-medium tracking-[0.15em] mb-3 text-white/60">
              CONTACT
            </p>
            <h2 className="text-[22px] md:text-[28px] font-bold text-white mb-4">
              お問い合わせ
            </h2>
            <p className="text-white/80 text-[15px] md:text-base leading-relaxed" data-replace="contact-message">
              {/* <!-- 編集メモ: contact-message テキスト差し替え可能 --> */}
              ここまでお読みいただき、ありがとうございます。
              <br />
              「まだ具体的に決まっていない」「とりあえず話だけ聞きたい」
              <br className="hidden md:block" />
              そんな段階でも大丈夫です。
              <br />
              お見積もりは無料ですので、まずはお気軽にご連絡ください。
            </p>
          </div>

          {/* 連絡手段 */}
          <div className="fade-in grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {/* 電話 */}
            <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <Phone size={24} className="text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-base">📞 電話で相談</p>
                <p className="text-white/90 text-lg font-bold mt-1">092-407-4453</p>
                <p className="text-white/60 text-xs mt-1">受付時間：平日 9:00〜18:00</p>
              </div>
              <a
                href="tel:092-407-4453"
                className="mt-auto w-full py-2.5 rounded-lg text-sm font-bold text-white text-center transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#1B4F8A" }}
              >
                電話をかける
              </a>
            </div>

            {/* LINE */}
            <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-14 h-14 rounded-full bg-[#06C755]/80 flex items-center justify-center">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-base">💬 LINEで相談</p>
                <p className="text-white/70 text-sm mt-1">気軽にメッセージを送る</p>
                <p className="text-white/60 text-xs mt-1">24時間受付・2営業日以内に返信</p>
              </div>
              <a
                href="https://line.me/ti/p/h91M99O59l"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full py-2.5 rounded-lg text-sm font-bold text-white text-center transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#06C755" }}
              >
                LINEで送る
              </a>
            </div>

            {/* フォーム */}
            <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <Mail size={24} className="text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-base">✉️ フォームで相談</p>
                <p className="text-white/70 text-sm mt-1">24時間受付中</p>
                <p className="text-white/60 text-xs mt-1">2営業日以内に返信</p>
              </div>
              <a
                href="#contact-form"
                className="mt-auto w-full py-2.5 rounded-lg text-sm font-bold text-white text-center transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#2E7D32" }}
              >
                フォームへ
              </a>
            </div>
          </div>

          {/* 携帯番号 */}
          <div className="fade-in">
            <p className="text-white/50 text-sm">
              お電話が繋がらない場合や、お急ぎの方は直通番号へご連絡ください。：
              <a href="tel:080-4277-9209" className="text-white/70 hover:text-white transition-colors font-medium">
                080-4277-9209
              </a>
            </p>
          </div>

          {/* お問い合わせフォーム */}
          <div id="contact-form" className="fade-in mt-10 bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 text-left">
            <h3 className="text-white font-bold text-lg mb-6 text-center">お問い合わせフォーム</h3>
            <form className="space-y-4">
              {/* お名前 */}
              <div>
                <label className="block text-white/80 text-sm mb-1.5">
                  お名前 <span className="text-red-400 ml-1">必須</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="山田 太郎"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"
                />
              </div>

              {/* 電話番号 */}
              <div>
                <label className="block text-white/80 text-sm mb-1.5">
                  電話番号 <span className="text-red-400 ml-1">必須</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="092-000-0000"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label className="block text-white/80 text-sm mb-1.5">
                  メールアドレス <span className="text-red-400 ml-1">必須</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"
                />
              </div>

              {/* お住まいの地域 */}
              <div>
                <label className="block text-white/80 text-sm mb-1.5">
                  お住まいの地域 <span className="text-red-400 ml-1">必須</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例：福岡市早良区"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"
                />
              </div>

              {/* 工事内容 */}
              <div>
                <label className="block text-white/80 text-sm mb-1.5">
                  工事内容 <span className="text-red-400 ml-1">必須</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="ご希望の工事内容をできるだけ詳しくご記入ください"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50 resize-none"
                />
              </div>

              {/* 任意項目アコーディオン */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOptionalOpen(!optionalOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-white/70 text-sm hover:bg-white/10 transition-colors"
                >
                  <span>任意項目を入力する（ご住所・連絡方法・希望時間帯・写真添付）</span>
                  {optionalOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {optionalOpen && (
                  <div className="px-4 pb-4 space-y-4 border-t border-white/20 pt-4">
                    {/* ご住所 */}
                    <div>
                      <label className="block text-white/80 text-sm mb-1.5">ご住所</label>
                      <input
                        type="text"
                        placeholder="〒000-0000 福岡県..."
                        className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"
                      />
                    </div>

                    {/* ご希望の連絡方法 */}
                    <div>
                      <label className="block text-white/80 text-sm mb-1.5">ご希望の連絡方法</label>
                      <div className="flex gap-4">
                        {["LINE", "電話", "メール"].map((method) => (
                          <label key={method} className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                            <input type="radio" name="contact-method" value={method} className="accent-green-500" />
                            {method}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* ご希望時間帯 */}
                    <div>
                      <label className="block text-white/80 text-sm mb-1.5">ご希望時間帯</label>
                      <input
                        type="text"
                        placeholder="例：平日 10:00〜17:00"
                        className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"
                      />
                    </div>

                    {/* 写真添付 */}
                    <div>
                      <label className="block text-white/80 text-sm mb-1.5">写真添付</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="w-full text-white/70 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:text-white file:cursor-pointer"
                        style={{ fileColor: "white" } as React.CSSProperties}
                      />
                      <p className="text-white/40 text-xs mt-1">複数枚選択可（JPG・PNG）</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 送信ボタン */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg font-bold text-white text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2E7D32" }}
              >
                無料でお見積りを依頼する
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
