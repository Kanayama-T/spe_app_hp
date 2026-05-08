"use client";
import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    question: "会社の規模を教えてください",
    options: ["1〜5名", "6〜20名", "21〜50名", "51名以上"],
  },
  {
    question: "今、一番困っていることは何ですか？",
    options: [
      "データ集計・報告書作成に時間がかかる",
      "在庫・受発注の管理が大変",
      "顧客対応・問い合わせが追いつかない",
      "社内の情報共有がうまくいかない",
    ],
  },
  {
    question: "AIに期待することは何ですか？",
    options: [
      "作業時間を減らしたい",
      "ミス・抜け漏れをなくしたい",
      "売上・データを見える化したい",
      "新しいサービスに挑戦したい",
    ],
  },
];

const results: Record<string, { title: string; desc: string; solutions: string[] }> = {
  "0-0": {
    title: "業務自動化AIパッケージ",
    desc: "少人数でも大企業並みの効率を。繰り返し作業をAIが自動化し、あなたの時間を本来の仕事に集中させます。",
    solutions: ["Excel集計の自動化", "定型メール・文書の自動生成", "ChatGPT業務活用トレーニング"],
  },
  default: {
    title: "AI活用コンサルティング",
    desc: "あなたの会社の課題に合わせて、最適なAI活用プランをご提案します。まずは無料相談からお気軽にどうぞ。",
    solutions: ["現状ヒアリング・課題整理", "AI活用ロードマップ作成", "補助金活用のご案内", "小さく始めるPoC支援"],
  },
};

export default function ExperiencePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const handleSelect = (idx: number) => {
    const next = [...answers, idx];
    if (step < steps.length - 1) {
      setAnswers(next);
      setStep(step + 1);
    } else {
      setAnswers(next);
      setDone(true);
    }
  };

  const result = results[`${answers[0]}-${answers[1]}`] ?? results["default"];

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setDone(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-[#f8fcff] text-[#20384f]">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
            <span className="h-px w-8 bg-[#8dcce4]" />
            AI EXPERIENCE
          </div>
          <h1 className="text-3xl font-black mb-3">
            あなたの会社のAI活用診断
          </h1>
          <p className="text-[#466177] text-sm">3つの質問に答えるだけ。無料・登録不要・約2分。</p>
        </div>

        {!done ? (
          <div className="bg-white/45 border border-[#d8edf7] p-8">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 transition-all"
                  style={{ backgroundColor: i <= step ? "#8dcce4" : "#d8edf7" }}
                />
              ))}
            </div>

            <div className="text-xs font-black text-[#8dcce4] mb-2">質問 {step + 1} / {steps.length}</div>
            <h2 className="text-xl font-black mb-6">
              {steps[step].question}
            </h2>

            <div className="flex flex-col gap-3">
              {steps[step].options.map((opt, idx) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(idx)}
                  className="text-left px-5 py-4 border border-[#d8edf7] bg-white transition-all text-sm font-bold text-[#466177] hover:border-[#8dcce4] hover:bg-[#eef8fd]"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/45 border border-[#d8edf7] p-8">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎉</div>
              <div className="font-black text-sm mb-1 text-[#8dcce4]">診断結果</div>
              <h2 className="text-2xl font-black">{result.title}</h2>
            </div>

            <p className="text-[#466177] text-sm leading-8 mb-6 text-center">
              {result.desc}
            </p>

            <div className="bg-[#eef8fd] border border-[#d8edf7] p-5 mb-6">
              <div className="font-black text-sm mb-3">おすすめのソリューション</div>
              <ul className="space-y-2">
                {result.solutions.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-[#466177]">
                    <span className="text-[#8dcce4]">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="block rounded-full bg-[#bfe7f7] px-6 py-3 text-center text-sm font-black text-[#20384f] transition-all hover:bg-[#aee0f3]"
              >
                📩 この内容で無料相談を申し込む
              </Link>
              <button
                onClick={reset}
                className="text-center text-sm text-[#6b8397] hover:text-[#20384f] transition-colors"
              >
                もう一度診断する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
