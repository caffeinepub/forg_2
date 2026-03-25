import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";

const FROG_SRC =
  "/assets/uploads/refined_forg_mascot-019d21f7-2b04-74d7-97f1-2647e44a1e49-1.png";

const CHAIN_SRC =
  "/assets/uploads/gold_chain-019d21aa-b6ef-777d-bfc7-3a154e915328-1.png";

const BACKGROUNDS = [
  {
    id: "pond",
    label: "Pond",
    emoji: "🌊",
    src: "/assets/uploads/pond_pfp-019d2110-9c8c-71d9-95b1-67fe8c858c7f-4.png",
  },
  {
    id: "lily",
    label: "Lily Pad",
    emoji: "🪷",
    src: "/assets/uploads/lily_pad_pfp-019d2110-8819-70e7-9d83-42bba4dedd6e-3.png",
  },
  {
    id: "night",
    label: "Night Swamp",
    emoji: "🌙",
    src: "/assets/uploads/night_swamp-019d2110-a051-77ab-a2b7-4ab0953af34e-5.png",
  },
];

// Canvas must be 1024x1024 — all overlay assets (chain, etc.) are pre-aligned to this size.
const CANVAS_SIZE = 1024;

// Extended actor type that includes the PFP count methods declared in backend.d.ts
interface ExtendedActor {
  getPfpCount(): Promise<bigint>;
  incrementPfpCount(): Promise<bigint>;
}

export default function PFPGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedBg, setSelectedBg] = useState("pond");
  const [chainOn, setChainOn] = useState(false);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [pfpCount, setPfpCount] = useState<number | null>(null);
  const [countPulse, setCountPulse] = useState(false);
  const { actor } = useActor();

  // Fetch initial PFP count
  useEffect(() => {
    if (!actor) return;
    (actor as unknown as ExtendedActor)
      .getPfpCount()
      .then((count) => {
        setPfpCount(Number(count));
      })
      .catch(() => {});
  }, [actor]);

  useEffect(() => {
    const allSrcs = [...BACKGROUNDS.map((b) => b.src), FROG_SRC, CHAIN_SRC];
    let loaded = 0;
    for (const src of allSrcs) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loaded++;
        if (loaded === allSrcs.length) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === allSrcs.length) setImagesLoaded(true);
      };
      img.src = src;
      imagesRef.current[src] = img;
    }
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Background — draw at natural pixel size, centered
    const bg = BACKGROUNDS.find((b) => b.id === selectedBg);
    if (bg) {
      const bgImg = imagesRef.current[bg.src];
      if (bgImg?.complete && bgImg.naturalWidth > 0) {
        const bw = bgImg.naturalWidth;
        const bh = bgImg.naturalHeight;
        const bx = (CANVAS_SIZE - bw) / 2;
        const by = (CANVAS_SIZE - bh) / 2;
        ctx.drawImage(bgImg, bx, by);
      } else {
        ctx.fillStyle = "#3EC6D6";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }
    }

    // Frog — draw at natural pixel size, centered
    const frogImg = imagesRef.current[FROG_SRC];
    if (frogImg?.complete && frogImg.naturalWidth > 0) {
      const fw = frogImg.naturalWidth;
      const fh = frogImg.naturalHeight;
      const fx = (CANVAS_SIZE - fw) / 2;
      const fy = (CANVAS_SIZE - fh) / 2;
      ctx.drawImage(frogImg, fx, fy);
    }

    // Gold chain — draw at EXACT natural pixel size, centered on 1024x1024 canvas.
    // No scaling. No stretching. This is a pre-aligned overlay asset.
    if (chainOn) {
      const chainImg = imagesRef.current[CHAIN_SRC];
      if (chainImg?.complete && chainImg.naturalWidth > 0) {
        const cw = chainImg.naturalWidth;
        const ch = chainImg.naturalHeight;
        const dx = (CANVAS_SIZE - cw) / 2;
        const dy = (CANVAS_SIZE - ch) / 2;
        ctx.drawImage(chainImg, dx, dy, cw, ch);
      }
    }
  }, [selectedBg, imagesLoaded, chainOn]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "forg-pfp.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    // Increment count in backend and update local state
    if (actor) {
      try {
        const newCount = await (
          actor as unknown as ExtendedActor
        ).incrementPfpCount();
        setPfpCount(Number(newCount));
        setCountPulse(true);
        setTimeout(() => setCountPulse(false), 600);
      } catch {
        // silent — download still worked
      }
    }
  };

  return (
    <section id="pfp-generator" className="relative py-16 px-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source
          src="/assets/uploads/forg_army.mp4-019d20ee-9bbe-76a1-9efe-3c14a39cabd0-1.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5,30,18,0.72)", zIndex: 1 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{
              background: "oklch(0.76 0.18 130)",
              color: "oklch(0.14 0 0)",
            }}
          >
            PFP GENERATOR
          </span>
          <h2
            className="font-heading text-4xl sm:text-5xl"
            style={{
              color: "oklch(0.90 0.18 125)",
              WebkitTextStroke: "1.5px oklch(0.14 0.04 155)",
            }}
          >
            BUILD YOUR FORG! 🐸
          </h2>

          {/* PFP Count Badge */}
          <div className="flex justify-center mt-3 mb-2">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-heading text-lg font-bold"
              style={{
                background: "oklch(0.28 0.12 145)",
                border: "2px solid oklch(0.76 0.18 130)",
                color: "oklch(0.90 0.22 130)",
                boxShadow: "0 0 18px oklch(0.76 0.18 130 / 0.45)",
                transform: countPulse ? "scale(1.18)" : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}
              data-ocid="pfp.success_state"
            >
              🐸{" "}
              {pfpCount === null ? (
                <span style={{ opacity: 0.6 }}>...</span>
              ) : (
                <span>{pfpCount.toLocaleString()}</span>
              )}{" "}
              PFPs Made
            </span>
          </div>

          <p
            className="mt-2 text-base"
            style={{ color: "oklch(0.88 0.04 155)" }}
          >
            Pick a background, download your PFP, and join the FORG army!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
          <div
            className="w-full md:w-64 rounded-3xl p-6 shadow-forg"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(12px)",
              border: "2px solid oklch(0.76 0.18 130 / 0.4)",
            }}
          >
            <h3
              className="font-heading text-xl mb-4"
              style={{ color: "oklch(0.90 0.18 125)" }}
            >
              Background
            </h3>
            <div className="flex flex-col gap-3">
              {BACKGROUNDS.map((bg) => (
                <button
                  type="button"
                  key={bg.id}
                  onClick={() => setSelectedBg(bg.id)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all font-bold text-sm"
                  style={{
                    background:
                      selectedBg === bg.id
                        ? "oklch(0.76 0.18 130)"
                        : "rgba(255,255,255,0.12)",
                    color: selectedBg === bg.id ? "oklch(0.14 0 0)" : "white",
                    border: `2px solid ${
                      selectedBg === bg.id
                        ? "oklch(0.90 0.18 125)"
                        : "transparent"
                    }`,
                    transform:
                      selectedBg === bg.id ? "scale(1.04)" : "scale(1)",
                  }}
                  data-ocid={`pfp.${bg.id}.button`}
                >
                  <img
                    src={bg.src}
                    alt={bg.label}
                    className="w-10 h-10 rounded-lg object-cover border-2"
                    style={{
                      borderColor:
                        selectedBg === bg.id
                          ? "oklch(0.14 0 0)"
                          : "transparent",
                    }}
                  />
                  <span>
                    {bg.emoji} {bg.label}
                  </span>
                </button>
              ))}
            </div>

            <h3
              className="font-heading text-xl mt-6 mb-4"
              style={{ color: "oklch(0.90 0.18 125)" }}
            >
              Accessories
            </h3>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setChainOn((prev) => !prev)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all font-bold text-sm"
                style={{
                  background: chainOn
                    ? "oklch(0.76 0.18 130)"
                    : "rgba(255,255,255,0.12)",
                  color: chainOn ? "oklch(0.14 0 0)" : "white",
                  border: `2px solid ${
                    chainOn ? "oklch(0.90 0.18 125)" : "transparent"
                  }`,
                  transform: chainOn ? "scale(1.04)" : "scale(1)",
                }}
                data-ocid="pfp.chain.toggle"
              >
                <img
                  src={CHAIN_SRC}
                  alt="Gold Chain"
                  className="w-10 h-10 rounded-lg object-contain border-2"
                  style={{
                    borderColor: chainOn ? "oklch(0.14 0 0)" : "transparent",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <span>⛓️ Gold Chain</span>
                {chainOn && (
                  <span className="ml-auto text-base" aria-label="active">
                    ✓
                  </span>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!imagesLoaded}
              className="mt-6 w-full py-3 rounded-full font-heading text-base font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                background: "oklch(0.90 0.18 125)",
                color: "oklch(0.14 0 0)",
              }}
              data-ocid="pfp.download_button"
            >
              ⬇ Download PNG
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div
              className="rounded-3xl overflow-hidden shadow-forg border-4"
              style={{
                borderColor: "oklch(0.76 0.18 130)",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                style={{ width: "100%", height: "auto", display: "block" }}
                data-ocid="pfp.canvas_target"
              />
            </div>
            {!imagesLoaded && (
              <p
                className="mt-3 text-sm font-bold animate-pulse"
                style={{ color: "oklch(0.90 0.18 125)" }}
              >
                🐸 Loading frog assets...
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
