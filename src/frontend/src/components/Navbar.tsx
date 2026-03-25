import { useEffect, useState } from "react";

const BUY_LINK =
  "https://pump.fun/coin/G4QRtYNRPyxdKwcAqqW3xSeEynDDxEyRvrDT9FJEpump";

const NAV_ITEMS = [
  { label: "HOME", id: "hero" },
  { label: "PFP GENERATOR", id: "pfp-generator" },
  { label: "CHART", id: "chart" },
  { label: "ROADMAP", id: "roadmap" },
  { label: "COMMUNITY", id: "community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <img
              src="/assets/uploads/refined_forg_mascot_2-019d26cf-8766-70e5-b917-8040f05725fa-1.png"
              alt="FORG mascot"
              className="w-10 h-10 object-contain"
            />
            <span
              className="font-heading text-3xl"
              style={{
                color: "oklch(0.27 0.07 155)",
                WebkitTextStroke: "1.5px oklch(0.14 0.04 155)",
              }}
            >
              FORG
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-bold uppercase tracking-wider text-[oklch(0.27_0.07_155)] hover:text-[oklch(0.76_0.18_130)] transition-colors"
                data-ocid="nav.link"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Buy Now + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full font-heading text-sm font-bold shadow-forg transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.90 0.18 125)",
                color: "oklch(0.14 0 0)",
              }}
              data-ocid="nav.primary_button"
            >
              BUY NOW
            </a>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-current mb-1" />
              <span className="block w-6 h-0.5 bg-current mb-1" />
              <span className="block w-6 h-0.5 bg-current" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden pb-4 pt-2"
            style={{ background: "oklch(0.97 0.02 155)" }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-4 py-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: "oklch(0.27 0.07 155)" }}
                data-ocid="nav.link"
              >
                {item.label}
              </button>
            ))}
            <a
              href={BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 mt-2 block text-center px-5 py-2 rounded-full font-heading text-sm font-bold"
              style={{
                background: "oklch(0.90 0.18 125)",
                color: "oklch(0.14 0 0)",
              }}
              data-ocid="nav.primary_button"
            >
              BUY NOW
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
