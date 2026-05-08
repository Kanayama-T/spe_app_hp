import Link from "next/link";

const cases = [
  {
    industry: "リサイクル・環境業",
    company: "東三河・従業員80名超",
    title: "既存DBから売上分析ダッシュボードを構築",
    challenge: "基幹システムにデータは蓄積されていたが、経営判断に使えていなかった。月次の集計をExcelで手作業で行っており、傾向の変化に気づくのが遅かった。",
    solution: "既存DBに読み取り専用で接続。既存システムは一切改修せず、売上動向・得意先ABC分析・前年対比をリアルタイムで可視化するダッシュボードを構築。",
    result: "月次経営レビューが定着。経営者が自ら数字を確認する習慣が生まれた",
    tag: "データ見える化",
  },
  {
    industry: "大手飲食チェーン",
    company: "全国展開・アルバイト数万人規模",
    title: "独自評価制度に基づく給与計算システム",
    challenge: "数万人規模のアルバイトの給与計算が、独自の人事評価制度により複雑化。担当者依存の属人業務になっており、引き継ぎのたびに品質が揺らいでいた。",
    solution: "評価ロジックをシステムに完全実装。外部テストサービスとAPI連携し、毎月の給与計算を自動化。担当者が変わっても同じ品質を維持できる仕組みに。",
    result: "10年以上安定稼働。担当者交代後も品質・精度を維持し続けている",
    tag: "システム開発",
  },
  {
    industry: "電子部品製造業",
    company: "豊橋市・プリント基板実装",
    title: "DX推進の業務棚卸しとAI導入計画策定",
    challenge: "「DXを進めたいが何から始めればいいかわからない」状態。部署ごとにシステムが独立しており、横断的な情報把握ができず、どの業務がAI化に向いているか判断できなかった。",
    solution: "業務棚卸しから着手し、どの業務でAIが効くかを整理。補助金を活用したDX導入計画を策定。「AIを入れる順番」の設計から伴走支援。",
    result: "優先順位が明確になり補助金申請へ。「何から始めるか」の迷いが解消された",
    tag: "AI導入設計",
  },
  {
    industry: "建設・土木業",
    company: "静岡県・従業員50名",
    title: "施工計画書の作成をAIで自動化",
    challenge: "施工計画書の作成に1件あたり2週間（実働30時間）かかっており、現場監督が書類作業に追われ、現場管理に集中できていなかった。",
    solution: "過去の施工実績データと入札資料をAIに学習させ、計画書の叩き台を自動生成。「AIが70%を作り、人が30%を仕上げる」運用ルールを設計。",
    result: "2週間→1時間に短縮。60代のベテラン社員も日常的に活用するように",
    tag: "AI導入設計",
  },
  {
    industry: "卸売業",
    company: "中部地区・従業員15名",
    title: "得意先別売上異常の自動検知",
    challenge: "得意先ごとの売上傾向の変化に気づくのが遅く、取引量が減り始めてから対応していた。担当者の感覚頼みで、数字での早期察知ができていなかった。",
    solution: "既存基幹システムのデータを読み取り専用で参照し、単価異常・発注頻度の変化・前年対比をAIが自動検出。気になる変化をダッシュボードに表示。",
    result: "変化の早期察知が可能に。担当者が能動的に対策を打てるようになった",
    tag: "データ見える化",
  },
  {
    industry: "物流・運送業",
    company: "東三河・従業員30名",
    title: "配車・ルート管理のデジタル化",
    challenge: "配車計画を手書きとホワイトボードで管理。車両ごとの稼働状況やルートが可視化できず、非効率な空車走行が続いていた。",
    solution: "配車実績データを蓄積できるシステムを構築。稼働状況・走行距離・コストを可視化し、改善の根拠となるデータ基盤を整備。",
    result: "データに基づく配車改善が可能に。年間コスト削減の算出根拠が明確になった",
    tag: "システム開発",
  },
];

const tagColors: Record<string, string> = {
  "AI導入設計": "#20384f",
  "データ見える化": "#8dcce4",
  "システム開発": "#466177",
};

export default function CasesPage() {
  return (
    <div className="pt-16 bg-[#f8fcff] text-[#20384f]">
      {/* Header */}
      <section className="border-b border-[#d8edf7] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
            <span className="h-px w-8 bg-[#8dcce4]" />
            CASES
          </div>
          <h1 className="text-4xl font-black mb-4">導入実績</h1>
          <p className="text-[#466177] text-lg leading-8">
            実際に運用され続けているシステム・AI活用の事例をご紹介します。
          </p>
        </div>
      </section>

      {/* Philosophy note */}
      <section className="py-10 px-6 bg-[#eef8fd] border-b border-[#d8edf7]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#466177] text-sm leading-8">
            私たちが大切にしているのは、<strong>「使われ続けているか」</strong>という一点です。<br />
            デモで動くことではなく、1年後も現場で使われているかを導入の成功基準にしています。
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <div key={c.title} className="bg-white/45 border border-[#d8edf7] overflow-hidden transition-colors hover:bg-white">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="inline-block px-2 py-1 text-xs font-black text-white"
                    style={{ backgroundColor: tagColors[c.tag] ?? "#20384f" }}
                  >
                    {c.tag}
                  </span>
                  <span className="text-xs text-[#6b8397]">{c.industry}｜{c.company}</span>
                </div>
                <h3 className="font-black text-lg mb-4">{c.title}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-black text-[#8dcce4] mb-1">課題</div>
                    <p className="text-sm text-[#466177] leading-7">{c.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#8dcce4] mb-1">アプローチ</div>
                    <p className="text-sm text-[#466177] leading-7">{c.solution}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#d8edf7] flex items-start gap-2">
                  <span className="text-[#8dcce4] text-base mt-0.5">✓</span>
                  <span className="font-black text-sm leading-7">{c.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#20384f] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-4">まず「何から始めるか」を一緒に整理しましょう</h2>
          <p className="text-[#d7e9f1] mb-6 text-sm leading-8">業種・規模・システムの状況を問わずご相談ください。<br />御社のデータと業務を聞いた上で、失敗しない順番をご提案します。</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#bfe7f7] px-8 py-4 text-sm font-black text-[#20384f]">
            無料相談を申し込む
          </Link>
        </div>
      </section>
    </div>
  );
}
