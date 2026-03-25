import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";

const FROG_SRC =
  "/assets/uploads/refined_forg_mascot_2-019d26cf-8766-70e5-b917-8040f05725fa-1.png";

const CHAIN_SRC =
  "/assets/uploads/refined_chain-019d2353-83cb-76d8-b443-0f0a0b1ce66d-1.png";

const SUNGLASSES_SRC =
  "/assets/uploads/sunglasses-019d22a1-cf2e-70fd-9a2b-7ccd5e521c96-1.png";

const TOP_HAT_SRC =
  "/assets/uploads/top_hat-019d22c8-ed7e-705f-a4a7-e53b671df461-1.png";

const RED_HAT_SRC =
  "/assets/uploads/red_hat-019d274e-eb0a-714a-8e88-b6accc9119b8-1.png";
const SUIT_SRC =
  "/assets/uploads/suit-019d22df-971c-77fb-81fa-6506cf44ad3d-1.png";

const ARMY_UNIFORM_SRC =
  "/assets/uploads/army_uniform-019d2662-b619-721b-93e2-b852bbbb22fe-1.png";

const CYBER_FORG_SRC =
  "/assets/uploads/cyber_forg-019d267b-ec1a-7683-982c-01cd6f04f927-1.png";

const NINJA_SUIT_SRC =
  "/assets/uploads/refined_ninja_suit-019d268d-f6d1-720e-9c51-d42df9ac42b9-2.png";

const BEACH_READY_SRC =
  "/assets/uploads/beach_ready-019d26a2-51d6-774a-9e6d-670c71942d40-1.png";

const BACKGROUNDS = [
  {
    id: "swamp",
    label: "🌿 Swamp",
    src: "/assets/uploads/swamp2-019d2334-b1ef-727a-88f4-a40210d827a1-1.png",
  },
  {
    id: "galaxy",
    label: "🌌 Galaxy",
    src: "/assets/uploads/galaxy-019d26c0-25cb-7326-8988-a634303ea668-1.png",
  },
];

// Canvas must be 1024x1024 — all overlay assets are pre-aligned to this size.
const CANVAS_SIZE = 1024;

interface ExtendedActor {
  getPfpCount(): Promise<bigint>;
  incrementPfpCount(): Promise<bigint>;
}

function ToggleButton({
  on,
  onClick,
  imgSrc,
  imgAlt,
  label,
  ocid,
}: {
  on: boolean;
  onClick: () => void;
  imgSrc: string;
  imgAlt: string;
  label: string;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-2xl px-3 py-1.5 transition-all font-bold text-xs"
      style={{
        background: on ? "oklch(0.76 0.18 130)" : "rgba(255,255,255,0.12)",
        color: on ? "oklch(0.14 0 0)" : "white",
        border: `2px solid ${on ? "oklch(0.90 0.18 125)" : "transparent"}`,
        transform: on ? "scale(1.04)" : "scale(1)",
      }}
      data-ocid={ocid}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-7 h-7 rounded-lg object-contain border-2"
        style={{
          borderColor: on ? "oklch(0.14 0 0)" : "transparent",
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <span>{label}</span>
      {on && (
        <span className="ml-auto text-xs" aria-label="active">
          ✓
        </span>
      )}
    </button>
  );
}

export default function PFPGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chainOn, setChainOn] = useState(false);
  const [sunglassesOn, setSunglassesOn] = useState(false);
  const [topHatOn, setTopHatOn] = useState(false);
  const [redHatOn, setRedHatOn] = useState(false);
  const [activeCloth, setActiveCloth] = useState<
    "suit" | "army" | "cyber" | "ninja" | "beach" | null
  >(null);
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0].src);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [pfpCount, setPfpCount] = useState<number | null>(null);
  const [countPulse, setCountPulse] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareHint, setShareHint] = useState(false);
  const { actor } = useActor();

  useEffect(() => {
    if (!actor) return;
    (actor as unknown as ExtendedActor)
      .getPfpCount()
      .then((count) => setPfpCount(Number(count)))
      .catch(() => {});
  }, [actor]);

  useEffect(() => {
    const allSrcs = [
      ...BACKGROUNDS.map((b) => b.src),
      FROG_SRC,
      CHAIN_SRC,
      SUNGLASSES_SRC,
      TOP_HAT_SRC,
      SUIT_SRC,
      ARMY_UNIFORM_SRC,
      CYBER_FORG_SRC,
      NINJA_SUIT_SRC,
      BEACH_READY_SRC,
      RED_HAT_SRC,
    ];
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

    // Background
    const bgImg = imagesRef.current[selectedBg];
    if (bgImg?.complete && bgImg.naturalWidth > 0) {
      const bw = bgImg.naturalWidth;
      const bh = bgImg.naturalHeight;
      ctx.drawImage(bgImg, (CANVAS_SIZE - bw) / 2, (CANVAS_SIZE - bh) / 2);
    } else {
      ctx.fillStyle = "#3EC6D6";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    // Frog
    const frogImg = imagesRef.current[FROG_SRC];
    if (frogImg?.complete && frogImg.naturalWidth > 0) {
      const fw = frogImg.naturalWidth;
      const fh = frogImg.naturalHeight;
      ctx.drawImage(frogImg, (CANVAS_SIZE - fw) / 2, (CANVAS_SIZE - fh) / 2);
    }

    // Suit (clothes layer — above frog, below accessories)
    if (activeCloth === "suit") {
      const suitImg = imagesRef.current[SUIT_SRC];
      if (suitImg?.complete && suitImg.naturalWidth > 0) {
        const sw = suitImg.naturalWidth;
        const sh = suitImg.naturalHeight;
        ctx.drawImage(
          suitImg,
          (CANVAS_SIZE - sw) / 2,
          (CANVAS_SIZE - sh) / 2,
          sw,
          sh,
        );
      }
    }

    // Army Uniform (clothes layer)
    if (activeCloth === "army") {
      const uniformImg = imagesRef.current[ARMY_UNIFORM_SRC];
      if (uniformImg?.complete && uniformImg.naturalWidth > 0) {
        const uw = uniformImg.naturalWidth;
        const uh = uniformImg.naturalHeight;
        ctx.drawImage(
          uniformImg,
          (CANVAS_SIZE - uw) / 2,
          (CANVAS_SIZE - uh) / 2,
          uw,
          uh,
        );
      }
    }

    // Cyber Forg (clothes layer)
    if (activeCloth === "cyber") {
      const cyberImg = imagesRef.current[CYBER_FORG_SRC];
      if (cyberImg?.complete && cyberImg.naturalWidth > 0) {
        const cw = cyberImg.naturalWidth;
        const ch = cyberImg.naturalHeight;
        ctx.drawImage(
          cyberImg,
          (CANVAS_SIZE - cw) / 2,
          (CANVAS_SIZE - ch) / 2,
          cw,
          ch,
        );
      }
    }

    // Ninja Suit (clothes layer)
    if (activeCloth === "ninja") {
      const ninjaImg = imagesRef.current[NINJA_SUIT_SRC];
      if (ninjaImg?.complete && ninjaImg.naturalWidth > 0) {
        const nw = ninjaImg.naturalWidth;
        const nh = ninjaImg.naturalHeight;
        ctx.drawImage(
          ninjaImg,
          (CANVAS_SIZE - nw) / 2,
          (CANVAS_SIZE - nh) / 2,
          nw,
          nh,
        );
      }
    }

    // Beach Ready (clothes layer)
    if (activeCloth === "beach") {
      const beachImg = imagesRef.current[BEACH_READY_SRC];
      if (beachImg?.complete && beachImg.naturalWidth > 0) {
        const bw = beachImg.naturalWidth;
        const bh = beachImg.naturalHeight;
        ctx.drawImage(
          beachImg,
          (CANVAS_SIZE - bw) / 2,
          (CANVAS_SIZE - bh) / 2,
          bw,
          bh,
        );
      }
    }

    // Gold chain
    if (chainOn) {
      const chainImg = imagesRef.current[CHAIN_SRC];
      if (chainImg?.complete && chainImg.naturalWidth > 0) {
        const cw = chainImg.naturalWidth;
        const ch = chainImg.naturalHeight;
        ctx.drawImage(
          chainImg,
          (CANVAS_SIZE - cw) / 2,
          (CANVAS_SIZE - ch) / 2,
          cw,
          ch,
        );
      }
    }

    // Sunglasses
    if (sunglassesOn) {
      const sgImg = imagesRef.current[SUNGLASSES_SRC];
      if (sgImg?.complete && sgImg.naturalWidth > 0) {
        const sw = sgImg.naturalWidth;
        const sh = sgImg.naturalHeight;
        ctx.drawImage(
          sgImg,
          (CANVAS_SIZE - sw) / 2,
          (CANVAS_SIZE - sh) / 2,
          sw,
          sh,
        );
      }
    }

    // Top Hat
    if (topHatOn) {
      const hatImg = imagesRef.current[TOP_HAT_SRC];
      if (hatImg?.complete && hatImg.naturalWidth > 0) {
        const hw = hatImg.naturalWidth;
        const hh = hatImg.naturalHeight;
        ctx.drawImage(
          hatImg,
          (CANVAS_SIZE - hw) / 2,
          (CANVAS_SIZE - hh) / 2,
          hw,
          hh,
        );
      }
    }
    if (redHatOn) {
      const redHatImg = imagesRef.current[RED_HAT_SRC];
      if (redHatImg?.complete && redHatImg.naturalWidth > 0) {
        const rw = redHatImg.naturalWidth;
        const rh = redHatImg.naturalHeight;
        ctx.drawImage(
          redHatImg,
          (CANVAS_SIZE - rw) / 2,
          (CANVAS_SIZE - rh) / 2,
          rw,
          rh,
        );
      }
    }
  }, [
    imagesLoaded,
    chainOn,
    sunglassesOn,
    topHatOn,
    redHatOn,
    activeCloth,
    selectedBg,
  ]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "forg-pfp.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    if (actor) {
      try {
        const newCount = await (
          actor as unknown as ExtendedActor
        ).incrementPfpCount();
        setPfpCount(Number(newCount));
        setCountPulse(true);
        setTimeout(() => setCountPulse(false), 600);
      } catch {
        // silent
      }
    }
  };

  const handleShareToX = async () => {
    const canvas = canvasRef.current;
    if (!canvas || isSharing) return;

    setIsSharing(true);

    const tweetText = encodeURIComponent("I just joined the $forg army 🐸");
    const tweetUrl = encodeURIComponent(
      "https://x.com/i/communities/2034649883919941893",
    );
    const tweetIntentUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );

      if (blob) {
        const file = new File([blob], "forg-pfp.png", { type: "image/png" });

        if (
          typeof navigator.canShare === "function" &&
          navigator.canShare({ files: [file] })
        ) {
          // Mobile: native share sheet with image attached
          await navigator.share({
            files: [file],
            text: "I just joined the $forg army 🐸",
            url: "https://x.com/i/communities/2034649883919941893",
          });
          setIsSharing(false);
          return;
        }
      }
    } catch (err: any) {
      // AbortError means user cancelled — don't fallback to desktop flow
      if (err?.name === "AbortError") {
        setIsSharing(false);
        return;
      }
      // Other errors fall through to desktop fallback
    }

    // Desktop fallback: auto-download + open tweet intent
    const link = document.createElement("a");
    link.download = "forg-pfp.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    window.open(tweetIntentUrl, "_blank");

    setShareHint(true);
    setTimeout(() => setShareHint(false), 4000);
    setIsSharing(false);
  };

  const sectionHeader = (title: string) => (
    <h3
      className="font-heading text-xs font-bold uppercase tracking-widest mb-1.5"
      style={{
        color: "oklch(0.76 0.18 130)",
        borderBottom: "1px solid oklch(0.76 0.18 130 / 0.3)",
        paddingBottom: "4px",
      }}
    >
      {title}
    </h3>
  );

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
            Dress up your forg and join the army!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
          <div
            className="w-full md:w-56 rounded-3xl p-4 shadow-forg"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(12px)",
              border: "2px solid oklch(0.76 0.18 130 / 0.4)",
            }}
          >
            {/* Background */}
            {sectionHeader("Background")}
            <div className="flex flex-col gap-1.5 mb-3">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setSelectedBg(bg.src)}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 text-left"
                  style={{
                    background:
                      selectedBg === bg.src
                        ? "oklch(0.76 0.18 130)"
                        : "rgba(255,255,255,0.12)",
                    color: selectedBg === bg.src ? "oklch(0.14 0 0)" : "white",
                    border:
                      selectedBg === bg.src
                        ? "2px solid oklch(0.60 0.18 130)"
                        : "2px solid transparent",
                  }}
                  data-ocid={`pfp.bg.${bg.id}.toggle`}
                >
                  <img
                    src={bg.src}
                    alt={bg.label}
                    className="w-6 h-6 rounded object-cover"
                  />
                  {bg.label}
                </button>
              ))}
            </div>

            {/* Clothes */}
            {sectionHeader("Clothes")}
            <div className="flex flex-col gap-1.5 mb-3">
              <ToggleButton
                on={activeCloth === "suit"}
                onClick={() =>
                  setActiveCloth((p) => (p === "suit" ? null : "suit"))
                }
                imgSrc={SUIT_SRC}
                imgAlt="Suit"
                label="🕴️ Suit"
                ocid="pfp.suit.toggle"
              />
              <ToggleButton
                on={activeCloth === "army"}
                onClick={() =>
                  setActiveCloth((p) => (p === "army" ? null : "army"))
                }
                imgSrc={ARMY_UNIFORM_SRC}
                imgAlt="Army Uniform"
                label="🪖 Army Uniform"
                ocid="pfp.armyuniform.toggle"
              />
              <ToggleButton
                on={activeCloth === "cyber"}
                onClick={() =>
                  setActiveCloth((p) => (p === "cyber" ? null : "cyber"))
                }
                imgSrc={CYBER_FORG_SRC}
                imgAlt="Cyber Forg"
                label="🤖 Cyber Forg"
                ocid="pfp.cyberforg.toggle"
              />
              <ToggleButton
                on={activeCloth === "ninja"}
                onClick={() =>
                  setActiveCloth((p) => (p === "ninja" ? null : "ninja"))
                }
                imgSrc={NINJA_SUIT_SRC}
                imgAlt="Ninja Suit"
                label="🥷 Ninja Suit"
                ocid="pfp.ninjasuit.toggle"
              />
              <ToggleButton
                on={activeCloth === "beach"}
                onClick={() =>
                  setActiveCloth((p) => (p === "beach" ? null : "beach"))
                }
                imgSrc={BEACH_READY_SRC}
                imgAlt="Beach Ready"
                label="🌴 Beach Ready"
                ocid="pfp.beachready.toggle"
              />
            </div>

            {/* Accessories */}
            {sectionHeader("Accessories")}
            <div className="flex flex-col gap-1.5">
              <ToggleButton
                on={chainOn}
                onClick={() => setChainOn((p) => !p)}
                imgSrc={CHAIN_SRC}
                imgAlt="Gold Chain"
                label="⛓️ Gold Chain"
                ocid="pfp.chain.toggle"
              />
              <ToggleButton
                on={sunglassesOn}
                onClick={() => setSunglassesOn((p) => !p)}
                imgSrc={SUNGLASSES_SRC}
                imgAlt="Sunglasses"
                label="😎 Sunglasses"
                ocid="pfp.sunglasses.toggle"
              />
              <ToggleButton
                on={topHatOn}
                onClick={() => setTopHatOn((p) => !p)}
                imgSrc={TOP_HAT_SRC}
                imgAlt="Top Hat"
                label="🎩 Top Hat"
                ocid="pfp.tophat.toggle"
              />
              <ToggleButton
                on={redHatOn}
                onClick={() => setRedHatOn((p) => !p)}
                imgSrc={RED_HAT_SRC}
                imgAlt="Red Hat"
                label="🧢 Red Hat"
                ocid="pfp.redhat.toggle"
              />
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!imagesLoaded}
              className="mt-4 w-full py-2 rounded-full font-heading text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                background: "oklch(0.90 0.18 125)",
                color: "oklch(0.14 0 0)",
              }}
              data-ocid="pfp.download_button"
            >
              ⬇ Download PNG
            </button>
            <button
              type="button"
              onClick={handleShareToX}
              disabled={!imagesLoaded || isSharing}
              className="mt-2 w-full py-2 rounded-full font-heading text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
              style={{
                background: "oklch(0.14 0 0)",
                color: "oklch(1 0 0)",
              }}
              data-ocid="pfp.share_x_button"
            >
              {isSharing ? "Sharing..." : "𝕏 Share to X"}
            </button>
            {shareHint && (
              <p
                className="mt-2 text-center text-xs font-bold animate-pulse"
                style={{ color: "oklch(0.90 0.18 125)" }}
                data-ocid="pfp.success_state"
              >
                Image downloaded — attach it to your tweet!
              </p>
            )}
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
