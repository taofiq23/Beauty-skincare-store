import type { Metadata } from "next";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { buildMetadata } from "@/lib/seo";
import { bestLists, categories, guides } from "@/lib/content-store";

const primaryGuideSlugs = [
  "how-to-build-a-simple-skincare-routine",
  "how-to-choose-a-cleanser",
  "how-to-choose-a-cleanser-for-sensitive-skin",
  "how-to-choose-a-cleanser-for-oily-skin",
  "how-to-choose-a-moisturizer",
  "how-to-choose-a-moisturizer-for-sensitive-skin",
  "how-to-choose-a-vitamin-c-serum",
  "how-to-choose-a-retinol-serum-or-cream",
  "how-to-choose-a-sunscreen",
  "how-to-choose-a-sunscreen-for-sensitive-skin"
];

const featuredBestSlugs = [
  "top-picks",
  "best-face-cleansers",
  "best-face-cleansers-for-oily-skin",
  "best-face-moisturizers-for-oily-skin",
  "best-vitamin-c-serums-for-brightening",
  "best-retinol-serums-and-creams",
  "best-face-sunscreens-for-sensitive-skin",
  "best-acne-spot-treatments"
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Buying Guides: Cleansers, Moisturizers, and Acne Care",
    description:
      "Browse long-form skincare buying guides for cleansers, moisturizers, vitamin C serums, retinol beginners, acne care, and simple routines. Start broad, then narrow into best lists and reviews.",
    pathname: "/guides"
  });
}

export default function GuidesIndexPage() {
  const guideMap = Object.fromEntries(guides.map((guide) => [guide.slug, guide]));
  const primaryGuides = primaryGuideSlugs.map((slug) => guideMap[slug]).filter(Boolean);
  const fallbackPrimary = primaryGuides.length > 0 ? primaryGuides : guides.slice(0, 3);
  const secondaryGuides = guides.filter((guide) => !primaryGuideSlugs.includes(guide.slug));
  const bestListMap = Object.fromEntries(bestLists.map((page) => [page.slug, page]));
  const featuredBestLists = featuredBestSlugs.map((slug) => bestListMap[slug]).filter(Boolean);
  const fallbackBestLists = featuredBestLists.length > 0 ? featuredBestLists : bestLists.slice(0, 4);

  return (
    <section className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-luxe">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
        <div className="mb-12 text-center md:mb-16">
          <p className="kicker text-xs tracking-[0.3em] text-black/70">BUYING GUIDES</p>
          <h1 className="mt-5 font-display text-[2.5rem] leading-[0.94] sm:text-5xl md:mt-6 md:text-7xl">
            Start With The Right Category Guide
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-7 text-black/74 md:mt-8 md:text-base md:leading-8">
            Use these long-form guides to narrow the category first, then move into the best lists, comparison pages, and review pages. The goal is a cleaner decision path, not a bigger list of random products.
          </p>
        </div>
      </div>

      <InternalLinkGrid
        title="Core Buying Guides"
        kicker="Start Here"
        items={fallbackPrimary.map((guide) => ({
          title: guide.title,
          description: guide.description,
          href: `/guides/${guide.slug}`,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="More Guides"
        kicker="Explore"
        items={secondaryGuides.map((guide) => ({
          title: guide.title,
          description: guide.description,
          href: `/guides/${guide.slug}`,
          label: "Guide"
        }))}
      />

      <InternalLinkGrid
        title="Best Lists"
        kicker="Top Picks"
        items={fallbackBestLists.map((page) => ({
          title: page.title,
          description: page.description,
          href: `/best/${page.slug}`,
          label: "Best"
        }))}
      />

      <InternalLinkGrid
        title="Categories"
        kicker="Browse"
        items={categories.map((category) => ({
          title: category.title,
          description: category.description,
          href: `/category/${category.slug}`,
          label: "Category"
        }))}
      />
    </section>
  );
}
