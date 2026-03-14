import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

const footerSections = [
  {
    title: "Best",
    links: [
      { href: "/best/top-picks", label: "Top Picks" },
      { href: "/collection", label: "Collection" },
      { href: "/story", label: "Guide Overview" }
    ]
  },
  {
    title: "Guides",
    links: [
      { href: "/guides", label: "Guides Hub" },
      { href: "/guides/product-buying-guide", label: "Buying Guide" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/disclosure", label: "Affiliate Disclosure" }
    ]
  }
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(17,17,17,0.08)] bg-[#eef3f8] text-[var(--secondary)]">
      <div className="container-luxe py-12 md:py-16">
        <div className="grid gap-8 border-b border-[rgba(17,17,17,0.08)] pb-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
          <div>
            <p className="font-display text-2xl font-semibold text-[var(--secondary)]">
              <span className="tracking-[0.24em]">{siteConfig.shortName.toUpperCase()}</span>
            </p>
            <p className="mt-4 max-w-xs text-xs uppercase leading-relaxed tracking-[0.12em] text-[var(--secondary)]/64">
              Skincare reviews, beauty buying guides, ingredient comparisons, and practical shortlist pages for smarter routine building.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--secondary)]/52">{section.title}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.14em] text-[var(--secondary)]/74 transition hover:text-[var(--secondary)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs uppercase tracking-[0.12em] text-[var(--secondary)]/56 md:flex-row md:items-center md:justify-between">
          <p>Copyright {year} {siteConfig.name}. All rights reserved.</p>
          <p>Affiliate links may earn a commission at no extra cost to the visitor.</p>
        </div>
      </div>
    </footer>
  );
}
