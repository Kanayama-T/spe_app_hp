const history = [
  { year: "1984年", event: "システムプランエクセレンス 創業" },
  { year: "2005年", event: "有限会社システムプランエクセレンス 設立" },
  { year: "2010年代", event: "大手飲食チェーン向け人事・給与計算システムなど、大規模案件への対応を強化" },
  { year: "2020年〜", event: "生成AIを活用した業務改善支援を開始。「データ設計が先、AIは後」という方針を確立" },
  { year: "2026年", event: "AI導入設計・データ見える化を主力サービスとして体制強化。東三河を中心に支援を拡大中" },
];

const strengths = [
  {
    icon: "📋",
    title: "データ設計から始める",
    desc: "AIを入れる前に、何が正しい情報でどこに置くかを整理します。この設計なしにAIは続きません。",
  },
  {
    icon: "🔒",
    title: "既存システムは触らない",
    desc: "読み取り専用での接続が原則。長年積み上げた仕組みを壊さずにAIを乗せます。",
  },
  {
    icon: "🕰️",
    title: "42年の現場知識",
    desc: "東三河の中小企業の業務を知り尽くしているからこそ、データ構造の整理と順番の設計ができます。",
  },
  {
    icon: "🤝",
    title: "使われるまで伴走する",
    desc: "導入して終わりではありません。現場に定着するまで、長期パートナーとして関わり続けます。",
  },
];

export default function CompanyPage() {
  return (
    <div className="pt-16 bg-[#f8fcff] text-[#20384f]">
      {/* Header */}
      <section className="border-b border-[#d8edf7] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
            <span className="h-px w-8 bg-[#8dcce4]" />
            COMPANY
          </div>
          <h1 className="text-4xl font-black mb-4">会社案内</h1>
          <p className="text-[#466177] text-lg leading-8">
            創業42年。愛知・豊橋から、中小企業のIT・AIを支え続けています。
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border border-[#d8edf7] bg-[#eef8fd] p-8 md:p-12 mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
                <span className="h-px w-8 bg-[#8dcce4]" />
                MISSION
              </div>
              <h2 className="text-2xl font-black mb-6">
                派手な仕組みを作る会社ではなく、<br />
                現場が回る仕組みを作る会社でありたい。
              </h2>
              <div className="space-y-4 text-[#466177] text-sm leading-8">
                <p>
                  42年間、私たちは愛知・東三河の中小企業に寄り添い、現場の声を聞き続けてきました。
                  その経験から確信していることがあります。
                </p>
                <p>
                  <strong className="text-[#20384f]">AIは、データが整っていない会社では続かない。</strong><br />
                  どんなに優れたAIツールを導入しても、どのデータが正しいかが決まっていなければ、
                  信頼できない答えが返り続け、やがて誰も使わなくなります。
                </p>
                <p>
                  だから私たちは、AIを入れる前に「データの整理」から始めます。
                  何が正しい情報で、どこに置くかを決める。その設計が完成して初めて、
                  AIは経営の武器になります。
                </p>
                <p>
                  作って終わりにしない。使われるまで伴走する。この姿勢でこれからも続けます。
                </p>
              </div>
            </div>
          </div>

          {/* 銀行・紹介者向け紹介文 */}
          <div className="border border-[#7bbbd4] bg-white/45 p-6 mb-16">
            <div className="text-xs font-black mb-2 text-[#8dcce4]">一言でご紹介いただく場合</div>
            <p className="text-base font-black leading-8">
              「豊橋の中小企業向けシステム会社です。42年の保守実績を持ち、お客様の既存システムを壊さずにAIを乗せるアプローチで、データを経営の武器に変える支援をしています」
            </p>
          </div>

          {/* Company Info + Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-xl font-black mb-6">会社概要</h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-[#d8edf7]">
                  {[
                    ["創業", "昭和59年（1984年） システムプランエクセレンス"],
                    ["会社設立", "平成17年（2005年） 有限会社 システムプランエクセレンス"],
                    ["代表取締役", "金山 昌弘"],
                    ["資本金", "300万"],
                    ["所在地", "〒440-0832\n愛知県豊橋市中岩田二丁目7番地の11"],
                    ["電話番号", "(0532)62-6730"],
                    ["FAX番号", "(0532)62-3341"],
                    ["e-Mail", "info@sp-jp.com"],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-3 pr-4 font-black text-[#6b8397] whitespace-nowrap w-24">{label}</td>
                      <td className="py-3 text-[#466177] whitespace-pre-line">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-xl font-black mb-6">強み・特徴</h2>
              <ul className="space-y-5">
                {strengths.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-black text-sm mb-0.5">{item.title}</div>
                      <div className="text-sm text-[#466177] leading-7">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* History */}
          <div>
            <h2 className="text-xl font-black mb-8">沿革</h2>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-[#d8edf7]" />
              <div className="space-y-6">
                {history.map((h) => (
                  <div key={h.year} className="flex items-start gap-6">
                    <div className="w-16 text-right text-sm font-black text-[#8dcce4]">{h.year}</div>
                    <div className="relative">
                      <div className="absolute -left-3 top-1.5 w-2 h-2 rounded-full bg-[#20384f]" />
                    </div>
                    <div className="text-sm text-[#466177] pt-0.5 pb-2">{h.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
