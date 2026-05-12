import Image from "next/image";

type BrandLogoProps = {
  inverted?: boolean;
  compact?: boolean;
};

export default function BrandLogo({ inverted = false, compact = false }: BrandLogoProps) {
  return (
    <div className={inverted ? "brightness-0 invert" : ""}>
      <Image
        src="/spe-logo.png"
        alt="SPE Towards the future"
        width={compact ? 140 : 192}
        height={compact ? 40 : 55}
        className={compact ? "h-auto w-[140px]" : "h-auto w-[192px]"}
      />
    </div>
  );
}
