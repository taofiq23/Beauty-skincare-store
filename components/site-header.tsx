"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-data";

const links = [
  { href: "/", label: "Home" },
  { href: "/best/top-picks", label: "Best" },
  { href: "/guides", label: "Guides" },
  { href: "/disclosure", label: "Disclosure" }
];

const menuSections = [
  {
    title: "Navigation",
    links
  }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  const lastYRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;

        const currentY = window.scrollY;
        if (currentY < 40) {
          setCompact(false);
        } else if (currentY > lastYRef.current) {
          setCompact(true);
        } else if (currentY < lastYRef.current) {
          setCompact(false);
        }
        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    setCompact(window.scrollY > 40);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[rgba(69,45,55,0.1)] bg-[rgba(255,252,248,0.92)] backdrop-blur-xl">
        <div
          className={`hidden overflow-hidden border-b border-black/10 transition-all duration-300 md:block ${
            compact ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="container-luxe grid h-auto gap-3 py-3 text-[11px] uppercase tracking-[0.2em] text-secondary/72 md:grid-cols-[auto_minmax(260px,420px)_auto] md:items-center md:gap-6 md:py-0">
            <p>Beauty Reviews / Curated Weekly</p>
            <form action="/search" method="get" className="order-3 md:order-none">
              <div className="flex w-full items-center border border-black/12 bg-white/92">
                <input
                  type="search"
                  name="q"
                  placeholder="Search products and guides"
                  className="h-9 w-full bg-transparent px-3 text-[11px] normal-case tracking-normal text-[var(--secondary)] outline-none placeholder:text-[var(--secondary)]/42"
                />
                <button type="submit" className="border-l border-black/10 px-3 text-[10px] tracking-[0.14em] text-[var(--secondary)]/78 hover:text-[var(--secondary)]">
                  Search
                </button>
              </div>
            </form>
            <div className="flex items-center gap-6 md:justify-end">
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className="container-luxe relative grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 text-xs uppercase tracking-[0.2em] md:h-[86px]">
          <button className="hidden md:inline-block" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            Menu
          </button>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-display text-[22px] font-semibold text-[var(--secondary)] md:text-[30px]">
            <span className="tracking-[0.2em]">{siteConfig.shortName.toUpperCase()}</span>
          </Link>
          <div />
          <div className="flex items-center justify-end gap-4 md:gap-6">
            <Link href="/best/top-picks" className="hidden md:inline-flex text-[var(--secondary)]/80 transition-colors hover:text-[var(--secondary)]">
              Top Picks
            </Link>
            <button
              className="inline md:hidden"
              onClick={() => setMenuOpen((state) => !state)}
              aria-label="Toggle side menu"
              aria-expanded={menuOpen}
            >
              Menu
            </button>
          </div>
        </div>

        <div
          className={`hidden overflow-hidden border-t border-black/10 transition-all duration-300 md:block ${
            compact ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
          }`}
        >
          <nav className="container-luxe flex h-[50px] items-center justify-center gap-16">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.24em] text-secondary/72 transition hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[70] transition-all duration-500">
          <button className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={() => setMenuOpen(false)} aria-label="Close menu overlay" />
          <aside className="absolute left-0 top-0 h-full w-[92vw] max-w-[440px] overflow-y-auto border-r border-[rgba(69,45,55,0.1)] bg-[#fffaf6] p-5 shadow-[0_30px_80px_rgba(49,32,39,0.18)] md:p-7">
          <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4">
            <p className="font-display text-xl font-semibold text-black">
              <span className="tracking-[0.22em]">{siteConfig.shortName.toUpperCase()}</span>
            </p>
            <button
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center border border-black/20 text-black/70 hover:border-black hover:text-black"
              aria-label="Close side menu"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>

          <div className="grid gap-7">
            {menuSections.map((section) => (
              <section key={section.title}>
                <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--secondary)]/45">{section.title}</h3>
                <div className="mt-3 flex flex-col">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={`${section.title}-${link.label}`}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-[rgba(69,45,55,0.08)] py-3 text-sm uppercase tracking-[0.12em] text-[var(--secondary)]/88 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--secondary)]"
                      style={{ transitionDelay: `${70 + linkIndex * 35}ms` }}
                    >
                      <span>{link.label}</span>
                      <span className="translate-x-0 text-black/55 transition-transform duration-200 group-hover:translate-x-1">-&gt;</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 border-t border-black/10 pt-5">
            <form action="/search" method="get" className="mb-5">
              <div className="flex items-center border border-black/12 bg-white">
                <input
                  type="search"
                  name="q"
                  placeholder="Search products and guides"
                  className="h-11 w-full bg-transparent px-3 text-[14px] normal-case tracking-normal text-black outline-none placeholder:text-black/42"
                />
                <button type="submit" className="border-l border-black/10 px-3 text-[10px] uppercase tracking-[0.14em] text-black/78">
                  Search
                </button>
              </div>
            </form>
            <p className="text-xs uppercase tracking-[0.16em] text-black/50">Quick Access</p>
            <div className="mt-3 grid gap-2">
              <Link
                href="/guides"
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-[0.12em] text-black/88 hover:text-black"
              >
                Guides Hub
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-[0.12em] text-black/88 hover:text-black"
              >
                Contact
              </Link>
            </div>
          </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
