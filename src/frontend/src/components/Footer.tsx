import { SiTelegram, SiX } from "react-icons/si";

const CA = "G4QRtYNRPyxdKwcAqqW3xSeEynDDxEyRvrDT9FJEpump";
const year = new Date().getFullYear();

const FOOTER_LINKS = [
  { label: "Home", id: "hero" },
  { label: "Chart", id: "chart" },
  { label: "Roadmap", id: "roadmap" },
  { label: "Community", id: "community" },
];

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "oklch(0.18 0.06 155)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-8">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/assets/uploads/refined_forg_mascot-019d21f7-2b04-74d7-97f1-2647e44a1e49-1.png"
                alt="FORG"
                className="w-10 h-10 object-contain"
              />
              <span
                className="font-heading text-3xl"
                style={{ color: "oklch(0.90 0.18 125)" }}
              >
                FORG
              </span>
            </div>
            <p
              className="text-xs text-center sm:text-left leading-relaxed"
              style={{ color: "oklch(0.65 0.06 155)" }}
            >
              The pond&apos;s most degenerate frog.
              <br />
              Ribbit or regret. 🐸
            </p>
            <div
              className="text-xs font-mono break-all"
              style={{ color: "oklch(0.50 0.05 155)" }}
            >
              CA: {CA.slice(0, 20)}...
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center gap-2">
            <h4
              className="font-heading text-base mb-2"
              style={{ color: "oklch(0.76 0.18 130)" }}
            >
              QUICK LINKS
            </h4>
            {FOOTER_LINKS.map((l) => (
              <button
                type="button"
                key={l.label}
                onClick={() => scrollTo(l.id)}
                className="text-sm transition-colors hover:text-white"
                style={{ color: "oklch(0.60 0.05 155)" }}
                data-ocid="footer.link"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center sm:items-end gap-3">
            <h4
              className="font-heading text-base mb-2"
              style={{ color: "oklch(0.76 0.18 130)" }}
            >
              SOCIALS
            </h4>
            <div className="flex gap-3">
              <a
                href="https://t.me/+tA7rsZMSzSg0OTg0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "oklch(0.60 0.16 230)" }}
                data-ocid="footer.link"
              >
                <SiTelegram size={20} color="white" />
              </a>
              <a
                href="https://x.com/i/communities/2034649883919941893"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "oklch(0.85 0 0)" }}
                data-ocid="footer.link"
              >
                <SiX size={18} color="oklch(0.14 0 0)" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 border-t text-center space-y-2"
          style={{ borderColor: "oklch(0.30 0.05 155)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.45 0.04 155)" }}>
            FORG is a meme coin with no intrinsic value or expectation of
            financial return. This is not financial advice.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.40 0.03 155)" }}>
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
