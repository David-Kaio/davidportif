import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import { youtubeVideos } from "@/data/youtubeVideos";

function extractYouTubeId(input: string): string | null {
  const s = input.trim();
  if (/^[a-zA-Z0-9_-]{8,}$/.test(s) && !s.includes("http")) return s;

  try {
    const url = new URL(s);
    if (url.hostname.includes("youtu.be")) return url.pathname.replace("/", "") || null;
    const v = url.searchParams.get("v");
    if (v) return v;
    const shorts = url.pathname.match(/\/shorts\/([^/?]+)/i);
    if (shorts?.[1]) return shorts[1];
    const embed = url.pathname.match(/\/embed\/([^/?]+)/i);
    if (embed?.[1]) return embed[1];
    return null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    controls: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
    iv_load_policy: "3",
    cc_load_policy: "0",
    vq: "hd1080",
  });

  if (typeof window !== "undefined") params.set("origin", window.location.origin);
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

function getThumbUrl(id: string, quality: "max" | "sd" | "hq" = "max") {
  const file = quality === "max" ? "maxresdefault.jpg" : quality === "sd" ? "sddefault.jpg" : "hqdefault.jpg";
  return `https://i.ytimg.com/vi/${id}/${file}`;
}

type ShowcaseVideo = {
  id: string;
  title: string;
};

const getLoopIndex = (index: number, total: number) => ((index % total) + total) % total;
const visibleOffsets = [-2, -1, 0, 1, 2];

const Thumb = ({ id, title, className }: { id: string; title: string; className?: string }) => {
  const [quality, setQuality] = React.useState<"max" | "sd" | "hq">("max");

  React.useEffect(() => {
    setQuality("max");
  }, [id]);

  return (
    <img
      src={getThumbUrl(id, quality)}
      alt={title}
      loading="eager"
      decoding="async"
      draggable={false}
      onError={() => setQuality((current) => (current === "max" ? "sd" : "hq"))}
      className={className}
    />
  );
};

const ShortsBadge = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={`inline-flex items-center gap-2 rounded-full bg-black/70 text-white shadow-lg shadow-black/25 ring-1 ring-white/15 backdrop-blur-md ${
      compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
    }`}
  >
    <span className="relative flex h-4 w-4 items-center justify-center rounded-[0.35rem] bg-red-600">
      <Play className="ml-0.5 h-2.5 w-2.5 fill-white text-white" />
    </span>
    <span className="font-semibold tracking-wide">Shorts</span>
  </div>
);

export default function VideoShowcaseSection() {
  const ref = React.useRef<HTMLElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [virtualIndex, setVirtualIndex] = React.useState(10_000);
  const [dragDelta, setDragDelta] = React.useState(0);
  const [viewportWidth, setViewportWidth] = React.useState(1200);
  const [playingVideoId, setPlayingVideoId] = React.useState<string | null>(null);
  const dragStartX = React.useRef<number | null>(null);
  const didDrag = React.useRef(false);
  const pointerStartedOnControl = React.useRef(false);

  const videos = React.useMemo<ShowcaseVideo[]>(() => {
    const usedIds = new Set<string>();

    return youtubeVideos
      .map((video) => {
        const id = extractYouTubeId(video.urlOrId);
        if (!id || usedIds.has(id)) return null;
        usedIds.add(id);
        return { id, title: video.title };
      })
      .filter(Boolean) as ShowcaseVideo[];
  }, []);

  const currentIndex = videos.length ? getLoopIndex(virtualIndex, videos.length) : 0;
  const currentVideo = videos[currentIndex];

  const sideCardWidth = Math.min(218, Math.max(136, viewportWidth * 0.145));
  const centerCardWidth = Math.min(335, Math.max(245, viewportWidth * 0.235));
  const cardGap = Math.min(10, Math.max(4, viewportWidth * 0.006));
  const cardStep = (centerCardWidth + sideCardWidth) / 2 + cardGap;

  React.useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  React.useEffect(() => {
    if (!videos.length) return;
    const idsToPreload = [-2, -1, 0, 1, 2].map((offset) => videos[getLoopIndex(virtualIndex + offset, videos.length)].id);
    const links: HTMLLinkElement[] = [];

    idsToPreload.forEach((id) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = getThumbUrl(id, "max");
      document.head.appendChild(link);
      links.push(link);
    });

    return () => links.forEach((link) => link.remove());
  }, [videos, virtualIndex]);

  const sendPlayerCommand = React.useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "https://www.youtube.com",
    );
  }, []);

  const optimizeActivePlayer = React.useCallback(() => {
    sendPlayerCommand("setPlaybackQuality", ["hd1080"]);
    sendPlayerCommand("setVolume", [30]);
    sendPlayerCommand("unMute");
    sendPlayerCommand("playVideo");
  }, [sendPlayerCommand]);

  React.useEffect(() => {
    setPlayingVideoId(null);
  }, [currentVideo?.id]);

  React.useEffect(() => {
    if (playingVideoId !== currentVideo?.id) return;
    const timers = [120, 420, 900, 1600].map((delay) => window.setTimeout(optimizeActivePlayer, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentVideo?.id, optimizeActivePlayer, playingVideoId]);

  const goToVirtualIndex = React.useCallback(
    (index: number) => {
      if (!videos.length) return;
      sendPlayerCommand("pauseVideo");
      setVirtualIndex(index);
      setDragDelta(0);
      setPlayingVideoId(null);
    },
    [sendPlayerCommand, videos.length],
  );

  const goNext = React.useCallback(() => goToVirtualIndex(virtualIndex + 1), [goToVirtualIndex, virtualIndex]);
  const goPrev = React.useCallback(() => goToVirtualIndex(virtualIndex - 1), [goToVirtualIndex, virtualIndex]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    pointerStartedOnControl.current = Boolean(target.closest("button, iframe, a"));
    if (pointerStartedOnControl.current) return;
    dragStartX.current = event.clientX;
    didDrag.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    setDragDelta(Math.max(-cardStep * 0.5, Math.min(cardStep * 0.5, delta)));
    if (Math.abs(delta) > 10) didDrag.current = true;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartedOnControl.current) {
      pointerStartedOnControl.current = false;
      return;
    }
    if (dragStartX.current === null) return;
    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;
    setDragDelta(0);
    if (Math.abs(distance) < 52) return;
    if (distance < 0) goNext();
    else goPrev();
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
    didDrag.current = false;
    setDragDelta(0);
  };

  const startCurrentVideo = React.useCallback(() => {
    setPlayingVideoId(null);
    window.requestAnimationFrame(() => {
      setPlayingVideoId(currentVideo.id);
      [250, 700, 1300, 2200].forEach((delay) => window.setTimeout(optimizeActivePlayer, delay));
    });
  }, [currentVideo.id, optimizeActivePlayer]);

  const handleCardClick = (offset: number) => {
    if (didDrag.current) return;
    if (offset < 0) {
      goPrev();
      return;
    }
    if (offset > 0) {
      goNext();
      return;
    }
    startCurrentVideo();
  };

  if (!videos.length) return null;

  return (
    <section id="videos" ref={ref} className="relative overflow-x-hidden px-0 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-4 text-center"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.45em] text-primary">videos</span>
        <h3 className="mt-5 text-4xl font-bold md:text-6xl">
          Produção <span className="text-gradient">Audiovisual</span>
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="relative z-10 mx-auto mt-10 w-full max-w-[1600px] px-0"
      >
        <div
          className="relative mx-auto flex h-[500px] w-full touch-pan-y select-none items-center justify-center overflow-visible sm:h-[585px] md:h-[630px]"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {visibleOffsets.map((offset) => {
            const videoIndex = getLoopIndex(virtualIndex + offset, videos.length);
            const video = videos[videoIndex];
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            const width = isCenter ? centerCardWidth : sideCardWidth;
            const isPlaying = isCenter && playingVideoId === currentVideo.id;

            return (
              <motion.div
                key={`${virtualIndex + offset}-${video.id}`}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(offset)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardClick(offset);
                  }
                }}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.65rem] border border-cyan-200/18 bg-black shadow-[0_0_16px_rgba(34,211,238,0.10)] outline-none transition-colors hover:border-cyan-200/35"
                style={{
                  zIndex: 20 - absOffset,
                  width,
                  pointerEvents: absOffset > 1 ? "none" : "auto",
                }}
                initial={false}
                animate={{
                  x: `calc(-50% + ${offset * cardStep + dragDelta}px)`,
                  y: "-50%",
                  scale: isCenter ? 1 : absOffset === 1 ? 0.9 : 0.76,
                  opacity: isCenter ? 1 : absOffset === 1 ? 0.76 : 0.26,
                }}
                transition={{ type: "spring", stiffness: 210, damping: 30, mass: 0.75 }}
                aria-label={isCenter ? `Assistir ${video.title}` : `Ir para ${video.title}`}
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.65rem] bg-black">
                  {isPlaying ? (
                    <iframe
                      ref={iframeRef}
                      key={`playing-${currentVideo.id}`}
                      src={getYouTubeEmbedUrl(currentVideo.id)}
                      title={currentVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                      onLoad={optimizeActivePlayer}
                    />
                  ) : (
                    <>
                      <Thumb
                        id={video.id}
                        title={video.title}
                        className="h-full w-full select-none object-cover transition duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/82" />
                      <div className="absolute left-4 top-4">
                        <ShortsBadge compact />
                      </div>
                      {isCenter && (
                        <button
                          type="button"
                          aria-label={`Reproduzir ${video.title}`}
                          onPointerDown={(event) => event.stopPropagation()}
                          onPointerUp={(event) => event.stopPropagation()}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            startCurrentVideo();
                          }}
                          className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white outline-none"
                        >
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30 transition duration-300 hover:scale-110 hover:bg-white/28 focus-visible:ring-2 focus-visible:ring-cyan-300">
                            <Play className="ml-1 h-7 w-7 fill-white" />
                          </span>
                        </button>
                      )}
                      {!isCenter && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur-md ring-1 ring-white/20">
                            <Play className="ml-1 h-5 w-5 fill-white" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                        <p className="line-clamp-2 text-xs font-semibold leading-tight text-white drop-shadow-lg md:text-sm">
                          {video.title}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="pointer-events-auto relative z-30 mt-7 flex items-center justify-center gap-4 md:mt-10"
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Vídeo anterior"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-xl transition duration-300 hover:-translate-x-0.5 hover:scale-105 hover:border-cyan-300/30 hover:bg-white/[0.10] hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Próximo vídeo"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-xl transition duration-300 hover:translate-x-0.5 hover:scale-105 hover:border-cyan-300/30 hover:bg-white/[0.10] hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
