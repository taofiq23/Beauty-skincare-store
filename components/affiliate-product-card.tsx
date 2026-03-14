import Image from "next/image";
import Link from "next/link";
import { isAmazonImageUrl, resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import type { ProductRecord } from "@/lib/site-data";

type Props = {
  product: ProductRecord;
  href?: string;
  ctaLabel?: string;
};

export function AffiliateProductCard({ product, href = `/reviews/${product.slug}`, ctaLabel = "Read Review" }: Props) {
  const imageUrl = resolveProductImageUrl(product);
  const reviewCount = new Intl.NumberFormat("en-US").format(product.reviewCount);

  return (
    <article className="group relative h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[rgba(69,45,55,0.1)] bg-[rgba(255,253,249,0.98)] shadow-[0_18px_46px_rgba(62,40,48,0.08)] transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_26px_56px_rgba(62,40,48,0.12)]">
        <Link href={href} className="block">
          <div className={`relative aspect-[4/4.7] overflow-hidden bg-gradient-to-br ${product.tone} sm:aspect-[4/5]`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.44),rgba(255,255,255,0.08))]" />
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 90vw"
              quality={95}
              unoptimized={isAmazonImageUrl(imageUrl)}
              className="absolute inset-0 object-contain p-5 sm:p-6"
            />
            <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
              <span className="inline-flex items-center rounded-full border border-white/40 bg-[rgba(255,250,251,0.84)] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--secondary)]/66 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.16em]">
                {product.highlightLabel}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7e8f74]/18 bg-[#f5f8f1] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#5c7351] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.16em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6d875f] sm:h-2 sm:w-2" aria-hidden="true" />
                In stock
              </span>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(46,29,36,0.04))] transition-opacity duration-300 md:group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-4 hidden justify-center opacity-0 transition-all duration-300 md:flex md:translate-y-2 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <span className="btn-commerce-primary min-h-[46px] border px-5 py-3 text-[11px] tracking-[0.16em] backdrop-blur-sm">
                {ctaLabel}
              </span>
            </div>
          </div>
        </Link>

        <div className="flex h-full flex-col p-4 sm:p-5">
          <Link href={href} className="block">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--secondary)]/48">{product.brand}</p>
            <h3 className="mt-2 font-display text-[1.2rem] leading-[1] tracking-tight text-[var(--secondary)] sm:text-[1.3rem]">
              {product.name}
            </h3>
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[var(--secondary)]/72">
            <span className="inline-flex items-center gap-[1px] text-[#d59b38]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span key={`${product.slug}-star-${starIndex}`} className="text-[12px] leading-none">
                  &#9733;
                </span>
              ))}
            </span>
            <span className="font-semibold text-[var(--secondary)]">{product.rating.toFixed(1)}/5</span>
            <span className="text-[var(--secondary)]/28" aria-hidden="true">
              |
            </span>
            <span className="text-[12px] text-[var(--secondary)]/58">{reviewCount} reviews</span>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3 border-t border-[rgba(69,45,55,0.08)] pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--secondary)]/42">Price</p>
              <p className="mt-1 text-lg font-medium tracking-[0.03em] text-[var(--secondary)]">{product.priceRange}</p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--secondary)]/42">{product.category}</p>
          </div>

          <div className="mt-4 md:hidden">
            <Link href={href} className="btn-commerce-primary block min-h-[46px] w-full rounded-[14px] px-4 py-3.5 text-[10px] tracking-[0.14em] sm:text-[11px] sm:tracking-[0.16em]">
              {ctaLabel}
            </Link>
          </div>

          <div className="mt-3 hidden md:block">
            <Link href={href} className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--secondary)]/58 transition-colors hover:text-[var(--secondary)]">
              Read details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
