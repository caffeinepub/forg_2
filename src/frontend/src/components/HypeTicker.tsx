const MESSAGES = [
  "🐸 0.5 SOL just hopped in!",
  "🌊 The pond is filling up!",
  "🚀 2.0 SOL ribbit'd in!",
  "🐸 Ribbit your way to the top!",
  "💚 New frog in the pond! 1.2 SOL",
  "🔥 The lily pads are heating up!",
  "🐸 0.8 SOL joined the leap!",
  "🌙 Night frogs are buying!",
  "💰 3.5 SOL splashed in!",
  "🐸 Another degen enters the pond!",
  "🟢 FORG is ribbit-ing to the moon!",
];

const TICKER_ITEMS = [
  ...MESSAGES.map((m, i) => ({ key: `a-${i}`, msg: m })),
  ...MESSAGES.map((m, i) => ({ key: `b-${i}`, msg: m })),
];

export default function HypeTicker() {
  return (
    <div
      className="w-full overflow-hidden py-4"
      style={{ background: "oklch(0.20 0.07 155)" }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {TICKER_ITEMS.map(({ key, msg }) => (
          <span
            key={key}
            className="inline-flex items-center gap-2 mx-8 font-body font-bold text-sm sm:text-base"
            style={{ color: "oklch(0.90 0.18 125)" }}
          >
            {msg}
            <span style={{ color: "oklch(0.76 0.18 130)" }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
