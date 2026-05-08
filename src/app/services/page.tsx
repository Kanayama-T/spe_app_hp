import Link from "next/link";

const services = [
  {
    icon: "🗂️",
    title: "AI導入設計",
    tagline: "何から始めるかの設計が、私たちの本質的な価値",
    desc: "「AIを入れたい」ではなく「何から始めればいいかわからない」という段階からお手伝いします。業務棚卸し・データ整理・AIが効く業務の特定・パイロット構築まで、失敗しない順番で伴走します。補助金活用の段取りも一緒に考えます。",
    items: [
      "業務棚卸しと課題の整理（どの業務にAIが効くか）",
      "データ設計・何が正しい情報かの定義",
      "小規模パイロットからの段階的導入",
      "補助金（IT導入補助金等）活用サポート",
      "導入後の定着・運用支援",
    ],
  },
  {
    icon: "📊",
    title: "データ見える化",
    tagline: "既存システムは触らない。読むだけで経営が変わる",
    desc: "既存の基幹システム・販売管理システムのデータに、読み取り専用で接続します。既存システムへの改修は一切不要。売上動向・得意先分析・異常検知をリアルタイムで可視化し、経営判断の速度を上げます。",
    items: [
      "既存DBへの読み取り専用接続（MS SQL Server等）",
      "売上・取引先・在庫のリアルタイムダッシュボード",
      "AIによる異常検知・前年対比・トレンド分析",
      "経営者・現場どちらにも使いやすいUI設計",
      "月次・週次・日次の自動レポート生成",
    ],
  },
  {
    icon: "🔧",
    title: "システム開発・保守",
    tagline: "作って終わりにしない、長期パートナーとして",
    desc: "42年にわたり愛知・東三河の中小企業のシステムを作り続けてきました。業務システム・Webアプリの開発はもちろん、導入後の安定稼働・機能追加・バージョンアップまで長期で伴走します。「使われないシステム」は作りません。",
    items: [
      "業務システム・Webアプリケーション開発",
      "既存システムの改修・機能追加",
      "MS SQL Server等のデータベース管理・保守",
      "クラウド移行・インフラ整備",
      "障害対応・定期メンテナンス・ヘルプデスク",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16 bg-[#f8fcff] text-[#20384f]">
      {/* Header */}
      <section className="border-b border-[#d8edf7] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
            <span className="h-px w-8 bg-[#8dcce4]" />
            SERVICES
          </div>
          <h1 className="text-4xl font-black mb-4">サービス内容</h1>
          <p className="text-[#466177] text-lg leading-8">
            データ整理から始めて、運用に乗るまで伴走します。
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-10 px-6 bg-[#eef8fd] border-b border-[#d8edf7]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {[
              { step: "Step 1", label: "整理する", desc: "何が正しいデータか、どこにあるかを整理" },
              { step: "Step 2", label: "見える化する", desc: "既存DBから経営に必要な情報を可視化" },
              { step: "Step 3", label: "AIを乗せる", desc: "整ったデータの上に初めてAIが活きる" },
              { step: "Step 4", label: "定着させる", desc: "現場が使い続ける仕組みで完成" },
            ].map((s, i) => (
              <div key={s.step} className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 border border-[#7bbbd4] bg-[#bfe7f7] flex items-center justify-center text-xs font-black text-[#20384f]">
                  {i + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8dcce4]">{s.step}</div>
                  <div className="font-black text-sm">{s.label}</div>
                  <div className="text-xs text-[#466177] mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {services.map((s, i) => (
            <div key={s.title} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-start`}>
              <div className="flex-shrink-0 w-full md:w-64">
                <div className="border border-[#d8edf7] bg-[#eef8fd] p-8 text-center text-[#20384f]">
                  <div className="text-5xl mb-3">{s.icon}</div>
                  <div className="font-bold text-lg">{s.title}</div>
                  <div className="text-xs mt-1 text-[#466177] leading-relaxed">{s.tagline}</div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-2">{s.title}</h2>
                <p className="text-[#466177] text-sm leading-8 mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#466177]">
                      <span className="font-bold text-[#8dcce4]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#20384f] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-4">「何から始めるか」わからなくて大丈夫です</h2>
          <p className="text-[#d7e9f1] mb-6 text-sm leading-8">
            多くのお客様が「AIに興味はあるが何から始めればいいか」という状態でお問い合わせをいただきます。<br />
            その整理をすること自体が、私たちの最初のお仕事です。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#bfe7f7] px-7 py-3 text-sm font-black text-[#20384f]">
              無料相談を申し込む
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
