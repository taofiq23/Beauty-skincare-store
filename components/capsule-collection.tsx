"use client";

import { useMemo, useState } from "react";
import { AffiliateProductCard } from "@/components/affiliate-product-card";
import type { ProductRecord } from "@/lib/site-data";

type Props = {
  products: ProductRecord[];
};

const CORE_FILTERS = [
  { id: "all", label: "All" },
  { id: "premium", label: "Premium" }
] as const;

function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function CapsuleCollection({ products }: Props) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const categoryTabs = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      )
    )
      .sort((left, right) => left.localeCompare(right))
      .map((category) => ({
        id: `category:${category}`,
        label: formatCategoryLabel(category),
        category
      }));
  }, [products]);

  const tabs = useMemo(
    () => [...CORE_FILTERS, ...categoryTabs.map(({ id, label }) => ({ id, label }))],
    [categoryTabs]
  );

  const visibleProducts = useMemo(() => {
    if (activeTab === "all") {
      return products;
    }

    if (activeTab === "premium") {
      return products.filter((item) => item.tags.includes("premium") || item.tags.includes("performance"));
    }

    if (activeTab.startsWith("category:")) {
      const category = activeTab.replace("category:", "");
      return products.filter((item) => item.category === category);
    }

    return products;
  }, [activeTab, products]);

  return (
    <section className="py-16 md:py-24">
      <div className="px-4 sm:px-5 md:px-10">
        <div className="mb-10 border-b border-black/10 pb-8 text-center md:mb-12 md:pb-10">
          <div className="mx-auto max-w-4xl">
            <p className="kicker text-xs tracking-[0.25em] text-black/70">TOP PICKS AND FEATURED REVIEWS</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[0.95] sm:text-4xl md:text-5xl">Top Picks Worth Opening First</h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-black/72 md:mt-6">
              Browse the strongest product reviews first, compare shortlists faster, and move toward the right retailer page with less guesswork
            </p>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 border-b border-black/10 pb-5 sm:gap-x-7 md:mb-12 md:gap-x-10 md:pb-6">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`pb-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 sm:text-xs sm:tracking-[0.2em] ${
                activeTab === item.id ? "border-b border-black text-black" : "text-black/62 hover:text-black"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {visibleProducts.map((product) => (
            <AffiliateProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
