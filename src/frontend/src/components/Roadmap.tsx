import { useEffect, useRef, useState } from "react";

const PHASES = [
  {
    num: 1,
    label: "PHASE 1",
    title: "THE TADPOLE ERA",
    emoji: "🥚",
    items: [
      { text: "Website Launch", done: true },
      { text: "CTO Takeover", done: true },
      { text: "250 Holders", done: true },
      { text: "PFP Generator", done: false },
    ],
  },
  {
    num: 2,
    label: "PHASE 2",
    title: "THE FROGLET RISE",
    emoji: "🐸",
    items: [
      { text: "Build Liquidity Pool", done: false },
      { text: "500 Holders", done: false },
      { text: "CoinGecko Listing", done: false },
      { text: "CoinMarketCap Listing", done: false },
      { text: "Onboard KOLs", done: false },
    ],
  },
  {
    num: 3,
    label: "PHASE 3",
    title: "THE FORG KINGDOM",
    emoji: "👑",
    items: [
      { text: "1,000 Holders", done: false },
      { text: "Donate to Save Frogs", done: false },
      { text: "Donate to Art Creator", done: false },
      { text: "Collab with Other Animal Coins", done: false },
    ],
  },
  {
    num: 4,
    label: "PHASE 4",
    title: "THE POND ECOSYSTEM",
    emoji: "🌍",
    items: [
      { text: "FORG Ecosystem Built", done: false },
      { text: "5,000 Holders", done: false },
      { text: "FORG Merch", done: false },
      { text: "FORG Minigame", done: false },
    ],
  },
];

function PhaseCard({
  phase,
  index,
}: { phase: (typeof PHASES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const completedCount = phase.items.filter((i) => i.done).length;
  const isActive = completedCount > 0 && completedCount < phase.items.length;
  const isDone = completedCount === phase.items.length;

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 120}ms`,
      }}
      data-ocid={`roadmap.item.${index + 1}`}
    >
      <div
        className="rounded-3xl p-6 h-full shadow-forg relative overflow-hidden"
        style={{
          background: isDone
            ? "linear-gradient(135deg, oklch(0.85 0.12 130), oklch(0.72 0.16 130))"
            : isActive
              ? "linear-gradient(135deg, oklch(0.90 0.18 125 / 0.2), white)"
              : "white",
          border: `3px solid ${isDone ? "oklch(0.60 0.16 130)" : isActive ? "oklch(0.76 0.18 130)" : "oklch(0.85 0.05 155)"}`,
          boxShadow: isDone
            ? "0 0 30px 4px oklch(0.76 0.18 130 / 0.45)"
            : undefined,
        }}
      >
        <div className="absolute -top-3 -right-3 text-5xl opacity-10 pointer-events-none">
          🪷
        </div>

        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">{phase.emoji}</span>
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
              style={{
                background: isDone
                  ? "oklch(0.27 0.07 155)"
                  : "oklch(0.93 0.05 155)",
                color: isDone ? "white" : "oklch(0.27 0.07 155)",
              }}
            >
              {phase.label}
            </span>
            <h3
              className="font-heading text-lg leading-tight"
              style={{
                color: isDone ? "oklch(0.14 0.05 155)" : "oklch(0.27 0.07 155)",
              }}
            >
              {phase.title}
            </h3>
          </div>
        </div>

        <ul className="space-y-2">
          {phase.items.map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-2 text-sm font-body"
              style={{
                color: item.done
                  ? "oklch(0.27 0.07 155)"
                  : "oklch(0.55 0.03 155)",
              }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                style={{
                  background: item.done
                    ? "oklch(0.27 0.07 155)"
                    : "oklch(0.90 0.03 155)",
                  color: item.done ? "white" : "oklch(0.60 0.04 155)",
                }}
              >
                {item.done ? "✓" : "○"}
              </span>
              <span className={item.done ? "font-bold" : ""}>{item.text}</span>
            </li>
          ))}
        </ul>

        <div
          className="mt-4 rounded-full overflow-hidden"
          style={{ background: "oklch(0.90 0.03 155)", height: "6px" }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${(completedCount / phase.items.length) * 100}%`,
              background: "oklch(0.76 0.18 130)",
            }}
          />
        </div>
        <p
          className="text-xs mt-1 font-bold"
          style={{ color: "oklch(0.48 0.04 155)" }}
        >
          {completedCount}/{phase.items.length} complete
        </p>
      </div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="py-20 px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.87 0.07 195) 0%, oklch(0.78 0.10 190) 100%)",
      }}
    >
      <div className="absolute top-10 left-6 text-7xl opacity-10 pointer-events-none select-none">
        🪷
      </div>
      <div className="absolute bottom-10 right-8 text-7xl opacity-10 pointer-events-none select-none">
        🐸
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ background: "oklch(0.27 0.07 155)", color: "white" }}
          >
            ROADMAP
          </span>
          <h2
            className="font-heading text-4xl sm:text-5xl"
            style={{ color: "oklch(0.27 0.07 155)" }}
          >
            THE POND MAP 🗺️
          </h2>
          <p
            className="mt-2 text-base font-body"
            style={{ color: "oklch(0.35 0.05 155)" }}
          >
            The journey from tadpole to ecosystem legend
          </p>
        </div>

        {/* Connector dots */}
        <div className="hidden md:flex items-center justify-center mb-6">
          {PHASES.map((phase, i) => (
            <div key={phase.num} className="flex items-center">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: "oklch(0.76 0.18 130)",
                  boxShadow: "0 0 10px oklch(0.76 0.18 130 / 0.6)",
                }}
              />
              {i < PHASES.length - 1 && (
                <div
                  className="h-1 w-24 mx-1"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, oklch(0.76 0.18 130) 0, oklch(0.76 0.18 130) 6px, transparent 6px, transparent 12px)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHASES.map((phase, i) => (
            <PhaseCard key={phase.num} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
