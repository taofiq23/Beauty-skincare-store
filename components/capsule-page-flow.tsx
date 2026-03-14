import Link from "next/link";
import type { ProductRecord } from "@/lib/site-data";

type Props = {
  heroKicker: string;
  heroTitle: string;
  heroDescription: string;
  products: ProductRecord[];
};

export function CapsulePageFlow({ heroKicker, heroTitle, heroDescription }: Props) {
  return (
    <>
      <section className="relative border-b border-[rgba(17,17,17,0.08)]">
        <div className="relative h-[31svh] min-h-[230px] w-full sm:h-[46vh] sm:min-h-[360px] md:h-[50vh] md:min-h-[400px]">
          <div className="hero-surface absolute inset-0" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="absolute bottom-4 left-0 right-0 sm:bottom-5 md:bottom-7">
          <div className="container-luxe">
            <div className="max-w-[14.5rem] sm:max-w-[30rem] md:max-w-[46rem]">
              <p className="kicker text-[8px] sm:text-[10px]">{heroKicker}</p>
              <h1 className="mt-2 font-display text-[22px] leading-[1.02] text-[var(--secondary)] sm:mt-3 sm:text-[36px] md:text-[62px]">
                {heroTitle}
              </h1>
              <p className="mt-2 max-w-[14.5rem] text-[8px] uppercase leading-[1.62] tracking-[0.12em] text-[var(--secondary)]/72 sm:max-w-[25rem] sm:text-[10px] sm:tracking-[0.18em] md:max-w-[29rem] md:text-[11px] md:tracking-[0.2em]">
                Product reviews, top picks, comparison pages, and buying guides for cleansers, moisturizers, acne care, and barrier support.
              </p>
              <div className="mt-4 hidden sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
                <Link href="/best/top-picks" className="btn-hero-primary min-h-[42px] px-5 py-2.5 text-[10px] tracking-[0.18em]">
                  Explore Top Picks
                </Link>
                <Link href="/guides/product-buying-guide" className="btn-hero-secondary min-h-[42px] px-5 py-2.5 text-[10px] tracking-[0.18em]">
                  Open Buying Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(17,17,17,0.08)] bg-[rgba(255,255,255,0.96)] py-5 md:py-8">
        <div className="container-luxe text-center">
          <p className="mx-auto max-w-4xl text-[13px] leading-6 text-[var(--secondary)]/78 md:text-[15px] md:leading-7">{heroDescription}</p>
        </div>
      </section>
    </>
  );
}
