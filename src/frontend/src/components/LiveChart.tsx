export default function LiveChart() {
  return (
    <section
      id="chart"
      className="py-16 px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.93 0.05 195) 0%, oklch(0.97 0.02 155) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Badge + Heading */}
        <div className="text-center mb-8">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ background: "oklch(0.27 0.07 155)", color: "white" }}
          >
            LIVE CHART
          </span>
          <h2
            className="font-heading text-4xl sm:text-5xl"
            style={{ color: "oklch(0.27 0.07 155)" }}
          >
            WATCH IT MOON 🚀
          </h2>
        </div>

        {/* Chart card */}
        <div
          className="rounded-3xl overflow-hidden shadow-forg border-4"
          style={{ borderColor: "oklch(0.76 0.18 130)" }}
        >
          <iframe
            src="https://dexscreener.com/solana/55kcmUzV47QDZdLh2SV3dPkRSyGzianRFYvEXgJdBWh6?embed=1&theme=light"
            className="w-full"
            style={{ height: "600px", border: "none", display: "block" }}
            title="FORG Live Chart"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
