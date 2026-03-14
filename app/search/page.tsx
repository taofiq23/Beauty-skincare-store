import type { Metadata } from "next";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { bestLists, comparisons, guides, products } from "@/lib/content-store";
import { getGuideImageUrl } from "@/lib/guide-images";
import { resolveProductImageUrl } from "@/lib/generated-content-normalizers";
import { reviews } from "@/lib/review-store";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search Beauty Reviews, Guides, and Top Picks",
  description: "Search reviews, guides, comparison pages, and top picks to find the right skincare product faster.",
  pathname: "/search"
});

type Props = {
  searchParams?: {
    q?: string;
  };
};

function scoreMatch(text: string, query: string, tokens: string[]) {
  const haystack = text.toLowerCase();
  if (!haystack) return 0;

  let score = 0;
  if (haystack === query) score += 120;
  if (haystack.startsWith(query)) score += 90;
  if (haystack.includes(query)) score += 50;

  for (const token of tokens) {
    if (haystack.startsWith(token)) score += 18;
    else if (haystack.includes(token)) score += 10;
  }

  return score;
}

function tokenize(query: string) {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

export default function SearchPage({ searchParams }: Props) {
  const query = (searchParams?.q || "").trim();
  const tokens = tokenize(query);
  const hasQuery = tokens.length > 0;
  const normalizedQuery = query.toLowerCase();

  const reviewResults = hasQuery
    ? reviews
        .map((review) => ({
          review,
          product: products.find((product) => product.slug === review.slug),
          score:
            scoreMatch(review.name, normalizedQuery, tokens) +
            scoreMatch(`${review.brand} ${review.category} ${review.summary}`, normalizedQuery, tokens)
        }))
        .filter((item) => item.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, 12)
    : [];

  const guideResults = hasQuery
    ? guides
        .map((guide) => ({
          guide,
          score: scoreMatch(`${guide.title} ${guide.description} ${guide.intro}`, normalizedQuery, tokens)
        }))
        .filter((item) => item.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, 8)
    : [];

  const bestResults = hasQuery
    ? bestLists
        .map((page) => ({
          page,
          score: scoreMatch(`${page.title} ${page.description} ${page.intro}`, normalizedQuery, tokens)
        }))
        .filter((item) => item.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, 8)
    : [];

  const comparisonResults = hasQuery
    ? comparisons
        .map((page) => ({
          page,
          score: scoreMatch(`${page.title} ${page.description} ${page.intro}`, normalizedQuery, tokens)
        }))
        .filter((item) => item.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, 8)
    : [];

  const totalResults = reviewResults.length + guideResults.length + bestResults.length + comparisonResults.length;

  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

        <div className="mb-10 border-b border-black/10 pb-8 md:mb-12 md:pb-10">
          <p className="kicker text-xs tracking-[0.3em] text-black/70">SEARCH</p>
          <h1 className="mt-5 font-display text-[2.3rem] leading-[0.94] sm:text-5xl md:mt-6 md:text-7xl">Find The Right Page Faster</h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-black/74 md:text-base md:leading-8">
            Search reviews, buying guides, top picks, and comparison pages across the skincare site so you can get to the right shortlist faster.
          </p>

          <form action="/search" method="get" className="mt-7 max-w-3xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search cleanser, vitamin c, sunscreen, retinol..."
                className="min-h-[52px] flex-1 border border-black/15 bg-[#fffdf9] px-4 text-[15px] text-black outline-none transition focus:border-black/35"
              />
              <button type="submit" className="btn-commerce-primary min-h-[52px] px-6 text-[11px] tracking-[0.18em]">
                Search
              </button>
            </div>
          </form>

          {hasQuery ? (
            <p className="mt-4 text-sm leading-6 text-black/62">
              {totalResults > 0 ? `${totalResults} results for "${query}".` : `No results found for "${query}" yet.`}
            </p>
          ) : (
            <p className="mt-4 text-sm leading-6 text-black/62">Try product names, categories, or concerns like cleanser, vitamin c, acne, moisturizer, sunscreen, or retinol.</p>
          )}
        </div>
      </div>

      {reviewResults.length > 0 ? (
        <InternalLinkGrid
          title="Review Results"
          kicker="Reviews"
          items={reviewResults.map(({ review, product }) => ({
            title: `${review.name} Review`,
            description: review.summary,
            href: `/reviews/${review.slug}`,
            label: "Review",
            imageUrl: product ? resolveProductImageUrl(product) : undefined,
            tone: product?.tone,
            priceText: review.priceText,
            stockText: "Usually in stock",
            rating: review.editorScore
          }))}
        />
      ) : null}

      {guideResults.length > 0 ? (
        <InternalLinkGrid
          title="Guide Results"
          kicker="Guides"
          items={guideResults.map(({ guide }) => ({
            title: guide.title,
            description: guide.description,
            href: `/guides/${guide.slug}`,
            label: "Guide",
            imageUrl: getGuideImageUrl(guide.slug)
          }))}
        />
      ) : null}

      {bestResults.length > 0 ? (
        <InternalLinkGrid
          title="Best List Results"
          kicker="Top Picks"
          items={bestResults.map(({ page }) => ({
            title: page.title,
            description: page.description,
            href: `/best/${page.slug}`,
            label: "Best"
          }))}
        />
      ) : null}

      {comparisonResults.length > 0 ? (
        <InternalLinkGrid
          title="Comparison Results"
          kicker="Compare"
          items={comparisonResults.map(({ page }) => ({
            title: page.title,
            description: page.description,
            href: `/compare/${page.slug}`,
            label: "Comparison"
          }))}
        />
      ) : null}
    </section>
  );
}
