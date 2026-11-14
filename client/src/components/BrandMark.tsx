import { Link } from "wouter";

type BrandMarkProps = {
  compact?: boolean;
  light?: boolean;
};

export default function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  return (
    <Link href="/" className={`brand-mark ${light ? "brand-mark--light" : ""}`} aria-label="Bidveil home">
      <span className="brand-mark__symbol" aria-hidden="true">
        <span className="brand-mark__line brand-mark__line--left" />
        <span className="brand-mark__line brand-mark__line--right" />
        <span className="brand-mark__square" />
      </span>
      {!compact && <span className="brand-mark__word">Bidveil</span>}
    </Link>
  );
}
