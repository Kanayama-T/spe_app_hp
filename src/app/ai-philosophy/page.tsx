import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "システムプランのAIに対する考え方 | 有限会社システムプラン エクセレンス",
  description:
    "AIを目的化せず、業務とデータを整えることから始める。有限会社システムプラン エクセレンスのAI活用に対する基本姿勢をご紹介します。",
};

const principles = [
  {
    number: "01",
    title: "AIは目的ではなく、業務を支える道具です。",
    text: "便利そうだから入れるのではなく、誰のどの作業を軽くするのかを先に決めます。導入の前に、業務の流れと判断の基準を一緒に整理します。",
  },
  {
    number: "02",
    title: "正しいデータがあって、初めてAIは役に立ちます。",
    text: "AIの答えは、参照する情報の質に左右されます。部署ごとに数字が違う、古い台帳が残っている、入力ルールが曖昧。そうした状態を整えることから始めます。",
  },
  {
    number: "03",
    title: "既存システムを壊さないことを大切にします。",
    text: "長く使ってきた基幹システムには、現場の知恵と業務の歴史が詰まっています。まずは読み取り専用でつなぎ、無理な置き換えを前提にしません。",
  },
  {
    number: "04",
    title: "現場に残る仕組みだけを作ります。",
    text: "デモで驚かせることより、毎日の仕事で自然に使われることを重視します。小さく試し、改善しながら、使い続けられる形へ育てます。",
  },
];

const steps = [
  "業務を棚卸しする",
  "正しいデータを定義する",
  "既存システムから安全に読む",
  "小さくAIを試す",
  "現場運用に合わせて直す",
];

const comparisons = [
  {
    label: "よくあるAI導入",
    items: ["ツール選定から始まる", "データの場所が曖昧なまま進む", "デモでは動くが業務に残らない"],
  },
  {
    label: "システムプランの進め方",
    items: ["業務とデータの整理から始める", "既存DBは読み取り専用で安全につなぐ", "現場が使い続ける単位まで落とし込む"],
  },
];

export default function AiPhilosophyPage() {
  return (
    <div className="pt-16 bg-[#f8fcff] text-[#20384f]">
      <section className="relative overflow-hidden border-b border-[#d8edf7]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
              <span className="h-px w-8 bg-[#8dcce4]" />
              AI PHILOSOPHY
            </div>
            <h1 className="text-[42px] font-black leading-[1.25] tracking-normal sm:text-[56px] lg:text-[64px]">
              <span className="whitespace-nowrap">システムプランの</span>
              <span className="relative mt-2 block w-fit">
                <span className="relative z-10 whitespace-nowrap">AIに対する考え方。</span>
                <span className="absolute bottom-2 left-0 h-5 w-full bg-[#bfe7f7]" />
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-sm font-bold leading-8 text-[#20384f]">
              AIを入れることを、ゴールにはしません。
              <br />
              会社の中にある業務とデータを整え、現場で使い続けられる形にすること。
              それが私たちのAI活用の基本です。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#7bbbd4] bg-[#bfe7f7] px-7 text-xs font-black text-[#20384f] transition hover:bg-[#aee0f3]"
              >
                相談する →
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#20384f] px-7 text-xs font-black text-[#20384f] transition hover:bg-white"
              >
                サービスを見る
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] md:min-h-[560px]">
            <div className="absolute inset-x-0 top-0 h-[82%] overflow-hidden border border-[#d8edf7] bg-[#eef8fd] lg:left-10 lg:right-0">
              <Image
                src="/ai-philosophy-hero.png"
                alt="明るいオフィスでノートパソコンとデータ可視化が表示されている様子"
                fill
                preload
                sizes="(max-width: 768px) 100vw, 620px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#f8fcff]/10" />
            </div>
            <div className="absolute bottom-8 left-0 flex h-24 w-48 items-center gap-4 bg-[#bfe7f7] px-7 shadow-2xl shadow-[#9ccfe1]/30">
              <span className="text-5xl font-light leading-none">38</span>
              <span className="text-[10px] font-black uppercase leading-4 tracking-[0.22em]">
                Years
                <br />
                of Trust
              </span>
            </div>
            <div className="absolute bottom-6 right-0 hidden text-[10px] uppercase tracking-[0.28em] text-[#91aabc] [writing-mode:vertical-rl] lg:block">
              SYSTEM PLAN EXCELLENCE
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8edf7] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
              <span className="h-px w-8 bg-[#8dcce4]" />
              OUR STANCE
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              <span className="block">AI導入で、</span>
              <span className="block whitespace-nowrap">最初に見るべきもの。</span>
            </h2>
            <p className="mt-6 text-sm leading-8 text-[#466177]">
              最新技術そのものではなく、会社の中にある業務、データ、使う人の判断です。
              ここを見ないままAIだけを追加しても、便利な実験で終わってしまいます。
            </p>
          </div>

          <div className="grid grid-cols-1 border border-[#d8edf7] md:grid-cols-4">
            {principles.map((principle) => (
              <article key={principle.number} className="min-h-72 border-b border-[#d8edf7] p-7 md:border-b-0 md:border-r md:last:border-r-0">
                <div className="mb-8 text-5xl font-black text-[#91d1e8]">{principle.number}</div>
                <h3 className="text-lg font-black leading-8">{principle.title}</h3>
                <p className="mt-5 text-sm leading-8 text-[#466177]">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef8fd] px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
              <span className="h-px w-8 bg-[#8dcce4]" />
              PROCESS
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">小さく始めて、業務に残す。</h2>
            <p className="mt-6 text-sm leading-8 text-[#466177]">
              AI活用は一度で完成させるものではありません。業務を整理し、データを読み、
              小さな検証を重ねながら、現場が使える仕組みに育てます。
            </p>
          </div>

          <ol className="border-t border-[#cde7f2]">
            {steps.map((step, index) => (
              <li key={step} className="grid grid-cols-[72px_1fr] items-center border-b border-[#cde7f2] py-6">
                <span className="text-xs font-black tracking-[0.24em] text-[#8dcce4]">0{index + 1}</span>
                <span className="text-lg font-black">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
                <span className="h-px w-8 bg-[#8dcce4]" />
                DIFFERENCE
              </div>
              <h2 className="text-3xl font-black leading-tight md:text-5xl">ツール導入ではなく、使える状態を作る。</h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 w-fit items-center justify-center rounded-full border border-[#20384f] px-6 text-xs font-black text-[#20384f] transition hover:bg-[#eef8fd]"
            >
              お問い合わせ →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {comparisons.map((group) => (
              <div key={group.label} className="border border-[#d8edf7] bg-white/45 p-8">
                <h3 className="border-b border-[#d8edf7] pb-5 text-xl font-black">{group.label}</h3>
                <ul className="mt-6 space-y-5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-4 text-sm font-bold leading-7 text-[#466177]">
                      <span className="mt-3 h-px w-6 shrink-0 bg-[#8dcce4]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#20384f] px-6 py-20 text-white">
        <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full bg-[#bfe7f7]/30" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#bfe7f7]">
              <span className="h-px w-8 bg-[#bfe7f7]" />
              CONTACT
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">AIの前に、業務とデータの話をしましょう。</h2>
            <p className="mt-6 text-sm leading-8 text-[#d7e9f1]">
              まだ何をAI化するか決まっていなくても問題ありません。現状の業務、既存システム、
              データの持ち方を伺い、最初の進め方を整理します。
            </p>
          </div>
          <div className="border border-white/25 p-8">
            <div className="grid gap-5 text-sm">
              <div className="grid grid-cols-[80px_1fr] border-b border-white/15 pb-5">
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#bfe7f7]">TEL</span>
                <span className="font-black">0532-62-6730</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] border-b border-white/15 pb-5">
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#bfe7f7]">AREA</span>
                <span className="font-black">愛知県豊橋市・東三河を中心に対応</span>
              </div>
              <Link
                href="/contact"
                className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-[#bfe7f7] px-7 text-xs font-black text-[#20384f] transition hover:bg-white"
              >
                お問い合わせフォームへ →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
