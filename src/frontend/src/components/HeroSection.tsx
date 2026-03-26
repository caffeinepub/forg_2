import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CA = "G4QRtYNRPyxdKwcAqqW3xSeEynDDxEyRvrDT9FJEpump";
const BUY_LINK =
  "https://pump.fun/coin/G4QRtYNRPyxdKwcAqqW3xSeEynDDxEyRvrDT9FJEpump";
const PAIR = "55kcmUzV47QDZdLh2SV3dPkRSyGzianRFYvEXgJdBWh6";

interface DexData {
  priceUsd: string;
  priceChange: { h24: number };
  volume: { h24: number };
}

export default function HeroSection() {
  const [dex, setDex] = useState<DexData | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.dexscreener.com/latest/dex/pairs/solana/${PAIR}`,
      );
      const json = await res.json();
      const pair = json?.pair ?? json?.pairs?.[0];
      if (pair) setDex(pair);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
    intervalRef.current = setInterval(fetchPrice, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchPrice]);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    toast.success("Contract address copied! 🐸");
  };

  const scrollToPFP = () =>
    document
      .getElementById("pfp-generator")
      ?.scrollIntoView({ behavior: "smooth" });

  const priceChange = dex?.priceChange?.h24 ?? 0;
  const isPositive = priceChange >= 0;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 animate-zoom-bg"
          style={{
            backgroundImage:
              "url('/assets/uploads/pond_background-019d20ee-8290-7618-8e7d-e8a75bdcc187-2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.02) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          {/* Frog mascot */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/assets/uploads/refined_forg_mascot_2-019d26cf-8766-70e5-b917-8040f05725fa-1.png"
              alt="FORG mascot"
              className="w-64 sm:w-80 md:w-[420px] lg:w-[500px] max-w-full object-contain animate-float"
              style={{ filter: "drop-shadow(0 12px 32px rgba(14,59,44,0.35))" }}
            />
          </div>

          {/* Text content */}
          <div className="text-center md:text-left">
            <h1
              className="font-heading text-7xl sm:text-8xl md:text-9xl leading-none mb-3"
              style={{
                color: "oklch(0.90 0.18 125)",
                WebkitTextStroke: "3px oklch(0.14 0.04 155)",
                textShadow: "0 6px 24px rgba(14,59,44,0.45)",
              }}
            >
              FORG
            </h1>
            <p
              className="font-body text-lg sm:text-xl font-bold mb-6 max-w-md"
              style={{
                color: "oklch(0.14 0.05 155)",
                textShadow: "0 1px 8px rgba(255,255,255,0.8)",
              }}
            >
              You're either in the pond… or watching from the shore.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
              <a
                href={BUY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full font-heading text-lg font-bold shadow-forg transition-all hover:scale-105 hover:shadow-lime active:scale-95"
                style={{ background: "oklch(0.27 0.07 155)", color: "white" }}
                data-ocid="hero.primary_button"
              >
                BUY $FORG
              </a>
              <button
                type="button"
                onClick={scrollToPFP}
                className="px-7 py-3 rounded-full font-heading text-lg font-bold border-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  borderColor: "oklch(0.27 0.07 155)",
                  color: "oklch(0.27 0.07 155)",
                }}
                data-ocid="hero.secondary_button"
              >
                MAKE YOUR FORG
              </button>
            </div>

            {/* CA copy */}
            <div
              className="flex items-center gap-2 flex-wrap justify-center md:justify-start rounded-2xl px-4 py-2 mb-2 w-fit"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "oklch(0.48 0.04 155)" }}
              >
                CA:
              </span>
              <span
                className="text-xs font-mono break-all"
                style={{ color: "oklch(0.14 0.05 155)" }}
              >
                {CA.slice(0, 16)}...{CA.slice(-8)}
              </span>
              <button
                type="button"
                onClick={copyCA}
                className="ml-1 px-2 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "oklch(0.76 0.18 130)",
                  color: "oklch(0.14 0 0)",
                }}
                data-ocid="hero.button"
              >
                COPY
              </button>
            </div>
            <p
              className="text-sm font-bold text-center md:text-left mt-2"
              style={{ color: "oklch(0.27 0.07 155)" }}
            >
              Create your frog. Join the pond.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div
        className="relative z-10 w-full"
        style={{ background: "oklch(0.20 0.07 155)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "oklch(0.72 0.10 155)" }}
            >
              🟢 LIVE PRICE
            </span>
            <span className="font-heading text-lg" style={{ color: "white" }}>
              {loading
                ? "..."
                : dex?.priceUsd
                  ? `$${Number.parseFloat(dex.priceUsd).toFixed(8)}`
                  : "N/A"}
            </span>
          </div>
          <div
            className="w-px h-6 hidden sm:block"
            style={{ background: "oklch(0.40 0.05 155)" }}
          />
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "oklch(0.72 0.10 155)" }}
            >
              24H
            </span>
            <span
              className="font-heading text-lg"
              style={{
                color: isPositive
                  ? "oklch(0.76 0.18 130)"
                  : "oklch(0.60 0.20 30)",
              }}
            >
              {loading
                ? "..."
                : `${isPositive ? "+" : ""}${priceChange.toFixed(2)}%`}
            </span>
          </div>
          <div
            className="w-px h-6 hidden sm:block"
            style={{ background: "oklch(0.40 0.05 155)" }}
          />
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "oklch(0.72 0.10 155)" }}
            >
              VOL 24H
            </span>
            <span className="font-heading text-lg" style={{ color: "white" }}>
              {loading
                ? "..."
                : dex?.volume?.h24
                  ? `$${(dex.volume.h24 / 1000).toFixed(1)}K`
                  : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
