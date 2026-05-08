import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-[#20384f] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <BrandLogo inverted />
            <p className="text-[#d7e9f1] text-sm leading-relaxed mt-5">
              有限会社システムプランエクセレンス
            </p>
          </div>
          <div>
            <div className="font-black mb-3 text-[#bfe7f7]">サービス</div>
            <ul className="space-y-2 text-sm text-[#d7e9f1]">
              <li><Link href="/services" className="hover:text-white transition-colors">AI活用コンサルティング</Link></li>
              <li><Link href="/ai-philosophy" className="hover:text-white transition-colors">AIへの考え方</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">システム開発・DX推進</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">システム運用保守</Link></li>
              <li><Link href="/experience" className="hover:text-white transition-colors">AI無料体験</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-black mb-3 text-[#bfe7f7]">会社情報</div>
            <ul className="space-y-2 text-sm text-[#d7e9f1]">
              <li>豊橋市中岩田2-7-11</li>
              <li>TEL: 0532-62-6730</li>
              <li>info@sp-jp.com</li>
              <li><Link href="/company" className="hover:text-white transition-colors">会社案内</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 mt-8 pt-6 text-center text-sm text-[#d7e9f1]">
          © 2026 有限会社システムプラン エクセレンス. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
