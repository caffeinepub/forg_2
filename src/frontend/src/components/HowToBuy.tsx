const CA = "G4QRtYNRPyxdKwcAqqW3xSeEynDDxEyRvrDT9FJEpump";
const BUY_LINK =
  "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=G4QRtYNRPyxdKwcAqqW3xSeEynDDxEyRvrDT9FJEpump";

const STEPS = [
  {
    id: "step-wallet",
    num: "01",
    icon: "👛",
    title: "Get Phantom Wallet",
    desc: "Download Phantom wallet from phantom.app. Keep your seed phrase safe — never share it with anyone!",
    ocid: "how_to_buy.item.1",
  },
  {
    id: "step-sol",
    num: "02",
    icon: "💰",
    title: "Buy SOL on Phantom",
    desc: "Purchase SOL directly inside Phantom using a card or bank transfer. SOL is your fuel to buy $FORG!",
    ocid: "how_to_buy.item.2",
  },
  {
    id: "step-swap",
    num: "03",
    icon: "🔄",
    title: "Search & Swap",
    desc: `Copy the official FORG contract address, paste it into Phantom's search bar, select FORG, and swap your SOL for $FORG. Let's hop! 🐸`,
    ocid: "how_to_buy.item.3",
  },
];

export default function HowToBuy() {
  return (
    <section
      id="how-to-buy"
      className="py-20 px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.02 155) 0%, oklch(0.93 0.05 195) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ background: "oklch(0.27 0.07 155)", color: "white" }}
          >
            HOW TO BUY
          </span>
          <h2
            className="font-heading text-4xl sm:text-5xl"
            style={{ color: "oklch(0.27 0.07 155)" }}
          >
            JOIN THE POND IN 3 HOPS 🐸
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="rounded-3xl p-8 text-center shadow-forg transition-all hover:-translate-y-1 hover:shadow-lime"
              style={{
                background: "white",
                border: "3px solid oklch(0.76 0.18 130)",
              }}
              data-ocid={step.ocid}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
                style={{ background: "oklch(0.90 0.18 125)" }}
              >
                {step.icon}
              </div>
              <div
                className="font-heading text-5xl mb-2"
                style={{ color: "oklch(0.88 0.10 130)" }}
              >
                {step.num}
              </div>
              <h3
                className="font-heading text-xl mb-3"
                style={{ color: "oklch(0.27 0.07 155)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm font-body leading-relaxed"
                style={{ color: "oklch(0.35 0.02 155)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CA display */}
        <div
          className="mt-10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-3 justify-center"
          style={{ background: "oklch(0.20 0.07 155)" }}
        >
          <span
            className="font-bold text-sm uppercase tracking-wider"
            style={{ color: "oklch(0.72 0.10 155)" }}
          >
            CONTRACT ADDRESS:
          </span>
          <span
            className="font-mono text-sm break-all"
            style={{ color: "white" }}
          >
            {CA}
          </span>
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full font-heading font-bold text-sm transition-all hover:scale-105"
            style={{
              background: "oklch(0.90 0.18 125)",
              color: "oklch(0.14 0 0)",
            }}
            data-ocid="how_to_buy.primary_button"
          >
            BUY $FORG NOW
          </a>
        </div>
      </div>
    </section>
  );
}
