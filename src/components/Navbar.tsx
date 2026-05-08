"use client";
import { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

const links = [
  { href: "/services", label: "サービス" },
  { href: "/cases", label: "導入実績" },
  { href: "/ai-philosophy", label: "AIへの考え方" },
  { href: "/experience", label: "AI体験" },
  { href: "/company", label: "会社案内" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#d8edf7] bg-[#f8fcff]/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center" aria-label="SPE トップページ">
          <BrandLogo compact />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-bold text-[#466177] transition-colors hover:text-[#20384f]">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded-full border border-[#7bbbd4] bg-[#bfe7f7] px-5 py-2 text-sm font-black text-[#20384f] transition-colors hover:bg-[#aee0f3]">
            お問い合わせ
          </Link>
        </nav>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="メニュー">
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-[#20384f] transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-[#20384f] transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-[#20384f] transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-3 border-t border-[#d8edf7] bg-[#f8fcff] px-6 py-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="py-1 text-sm font-bold text-[#466177]" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded-full border border-[#7bbbd4] bg-[#bfe7f7] px-4 py-2 text-center text-sm font-black text-[#20384f]" onClick={() => setOpen(false)}>
            お問い合わせ
          </Link>
        </div>
      )}
    </header>
  );
}
