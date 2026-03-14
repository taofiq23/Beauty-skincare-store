import Link from "next/link";
import type { CategoryRecord, ComparisonRecord, GuideRecord } from "@/lib/site-data";

type Props = {
  comparisons: ComparisonRecord[];
  guides: GuideRecord[];
  categories: CategoryRecord[];
};

export function CapsuleMediaBreaks({ comparisons, guides, categories }: Props) {
  const leadComparisonHref = comparisons[0] ? `/compare/${comparisons[0].slug}` : "/best/top-picks";

  return (
    <>
      <section className="border-y border-[rgba(17,17,17,0.08)]">
        <div className="relative h-[30svh] min-h-[220px] w-full sm:h-[48vh] sm:min-h-[350px] md:h-[66vh] md:min-h-[500px]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef4fa_0%,#e7eff6_48%,#dce7f1_100%)]" />
          <div className="media-overlay-soft absolute inset-0" />
          <div className="absolute bottom-4 left-0 right-0 sm:bottom-8 md:bottom-12">
            <div className="container-luxe">
              <div className="max-w-[14rem] sm:max-w-[25rem] md:max-w-[44rem]">
                <p className="kicker">Start Here</p>
                <h2 className="mt-3 font-display text-[1.95rem] leading-[0.96] text-[var(--secondary)] sm:text-[2.8rem] md:text-[78px]">
                  Start with guides.
                  <br className="hidden md:block" />
                  Narrow with top picks.
                </h2>
                <Link href={leadComparisonHref} className="btn-hero-secondary mt-4 hidden sm:inline-flex sm:min-h-[42px] sm:px-5 sm:py-2.5 sm:text-[10px] sm:tracking-[0.18em]">
                  View Popular Comparison
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(17,17,17,0.08)] bg-[#f8fafc] py-10 md:py-28">
        <div className="container-luxe grid gap-5 md:grid-cols-3 md:gap-8">
          <div>
            <p className="kicker">Buying Guides</p>
            <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
              {guides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block">
                  <article className="rounded-[18px] border border-[rgba(17,17,17,0.08)] bg-white p-4 shadow-[0_10px_24px_rgba(17,17,17,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fcfcfc] hover:shadow-[0_18px_38px_rgba(17,17,17,0.08)] md:rounded-[22px] md:p-5">
                    <h3 className="font-display text-[1.5rem] leading-[0.98] text-[var(--secondary)] md:text-2xl">{guide.title}</h3>
                    <p className="mt-2.5 text-[14px] leading-6 text-[var(--secondary)]/76 md:mt-3 md:text-[15px] md:leading-7">{guide.description}</p>
                    <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.15em] text-[var(--secondary)]/68 group-hover:text-[var(--secondary)] md:mt-4 md:text-xs md:tracking-[0.16em]">
                      Read Guide
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker">Popular Comparisons</p>
            <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
              {comparisons.map((comparison) => (
                <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="group block">
                  <article className="rounded-[18px] border border-[rgba(17,17,17,0.08)] bg-white p-4 shadow-[0_10px_24px_rgba(17,17,17,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fcfcfc] hover:shadow-[0_18px_38px_rgba(17,17,17,0.08)] md:rounded-[22px] md:p-5">
                    <h3 className="font-display text-[1.5rem] leading-[0.98] text-[var(--secondary)] md:text-2xl">{comparison.title}</h3>
                    <p className="mt-2.5 text-[14px] leading-6 text-[var(--secondary)]/76 md:mt-3 md:text-[15px] md:leading-7">{comparison.description}</p>
                    <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.15em] text-[var(--secondary)]/68 group-hover:text-[var(--secondary)] md:mt-4 md:text-xs md:tracking-[0.16em]">
                      Read Comparison
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker">Categories</p>
            <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
              {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`} className="group block">
                  <article className="rounded-[18px] border border-[rgba(17,17,17,0.08)] bg-white p-4 shadow-[0_10px_24px_rgba(17,17,17,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fcfcfc] hover:shadow-[0_18px_38px_rgba(17,17,17,0.08)] md:rounded-[22px] md:p-5">
                    <h3 className="font-display text-[1.5rem] leading-[0.98] text-[var(--secondary)] md:text-2xl">{category.title}</h3>
                    <p className="mt-2.5 text-[14px] leading-6 text-[var(--secondary)]/76 md:mt-3 md:text-[15px] md:leading-7">{category.description}</p>
                    <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.15em] text-[var(--secondary)]/68 group-hover:text-[var(--secondary)] md:mt-4 md:text-xs md:tracking-[0.16em]">
                      Browse Category
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
