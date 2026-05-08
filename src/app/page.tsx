import type { Metadata } from "next";
import AiPhilosophyPage from "./ai-philosophy/page";

export const metadata: Metadata = {
  title: "SPE | Towards the future",
  description:
    "AIを目的化せず、業務とデータを整えることから始める。愛知県豊橋市の有限会社システムプラン エクセレンスが、現場で使い続けられるAI活用を支援します。",
};

export default function Home() {
  return <AiPhilosophyPage />;
}
