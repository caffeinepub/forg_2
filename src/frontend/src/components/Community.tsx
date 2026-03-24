import { SiTelegram, SiX } from "react-icons/si";

const SOCIALS = [
  {
    name: "Telegram",
    handle: "@FORGcommunity",
    url: "https://t.me/+tA7rsZMSzSg0OTg0",
    icon: SiTelegram,
    color: "oklch(0.60 0.16 230)",
    bg: "oklch(0.92 0.06 220)",
  },
  {
    name: "X (Twitter)",
    handle: "@FORG_Solana",
    url: "https://x.com/i/communities/2034649883919941893",
    icon: SiX,
    color: "oklch(0.14 0 0)",
    bg: "oklch(0.96 0 0)",
  },
];

export default function Community() {
  return (
    <section
      id="community"
      className="py-20 px-4"
      style={{ background: "oklch(0.93 0.05 195)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <span
          className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
          style={{ background: "oklch(0.27 0.07 155)", color: "white" }}
        >
          COMMUNITY
        </span>
        <h2
          className="font-heading text-4xl sm:text-5xl mb-3"
          style={{ color: "oklch(0.27 0.07 155)" }}
        >
          JOIN THE FORG POND! 🌊
        </h2>
        <p
          className="text-base font-body mb-10"
          style={{ color: "oklch(0.35 0.04 155)" }}
        >
          The pond is filling up fast. Jump in before you miss the leap!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-3xl p-6 shadow-forg transition-all hover:-translate-y-2 hover:shadow-lime"
              style={{
                background: "white",
                border: "3px solid oklch(0.76 0.18 130)",
              }}
              data-ocid="community.link"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: s.bg }}
              >
                <s.icon size={28} style={{ color: s.color }} />
              </div>
              <div className="text-left">
                <div
                  className="font-heading text-xl"
                  style={{ color: "oklch(0.14 0 0)" }}
                >
                  {s.name}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "oklch(0.48 0.04 155)" }}
                >
                  {s.handle}
                </div>
              </div>
              <span
                className="ml-auto px-4 py-2 rounded-full font-heading text-sm font-bold transition-all group-hover:scale-105"
                style={{
                  background: "oklch(0.76 0.18 130)",
                  color: "oklch(0.14 0 0)",
                }}
              >
                JOIN
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
