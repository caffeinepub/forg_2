const BUY_LINK =
  "https://pump.fun/coin/G4QRtYNRPyxdKwcAqqW3xSeEynDDxEyRvrDT9FJEpump";

export default function StickyBuyButton() {
  return (
    <a
      href={BUY_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-heading text-base font-bold shadow-forg animate-sticky-bounce transition-all hover:scale-110 active:scale-95"
      style={{
        background: "oklch(0.90 0.18 125)",
        color: "oklch(0.14 0 0)",
        boxShadow: "0 4px 24px oklch(0.76 0.18 130 / 0.5)",
      }}
      data-ocid="sticky.primary_button"
    >
      🐸 BUY $FORG
    </a>
  );
}
