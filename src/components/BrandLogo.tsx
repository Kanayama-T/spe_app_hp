type BrandLogoProps = {
  inverted?: boolean;
  compact?: boolean;
};

export default function BrandLogo({ inverted = false, compact = false }: BrandLogoProps) {
  const primary = inverted ? "text-white" : "text-[#59616d]";
  const secondary = inverted ? "text-[#d7e9f1]" : "text-[#8b929c]";

  return (
    <div className="leading-none">
      <div className={`${primary} font-black tracking-[0.24em] ${compact ? "text-xl" : "text-3xl"}`}>
        SPE
      </div>
      <div className={`${secondary} mt-2 font-black tracking-[0.18em] ${compact ? "text-[10px]" : "text-sm"}`}>
        Towards the future
      </div>
    </div>
  );
}
