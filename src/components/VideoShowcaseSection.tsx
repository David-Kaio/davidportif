import * as React from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Video, Play, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { youtubeVideos } from "@/data/youtubeVideos";

function extractYouTubeId(input: string): string | null {
  const s = input.trim();
  if (/^[a-zA-Z0-9_-]{8,}$/.test(s) && !s.includes("http")) return s;

  try {
    const url = new URL(s);

    // youtu.be/ID
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return id || null;
    }

    // youtube.com/watch?v=ID
    const v = url.searchParams.get("v");
    if (v) return v;

    // youtube.com/shorts/ID
    const shorts = url.pathname.match(/\/shorts\/([^/?]+)/i);
    if (shorts?.[1]) return shorts[1];

    // youtube.com/embed/ID
    const embed = url.pathname.match(/\/embed\/([^/?]+)/i);
    if (embed?.[1]) return embed[1];

    return null;
  } catch {
    return null;
  }
}

function isShortsUrl(input: string): boolean {
  return /\/shorts\//i.test(input);
}

function getYouTubeEmbedUrl(id: string): string {
  // Autoplay com som: funciona porque o usuário clica para abrir o modal.
  // playsinline ajuda no mobile; rel=0 remove recomendações fora do canal.
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    controls: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function mixShortsAndVideos<T extends { isShort: boolean }>(items: T[]): T[] {
  const shorts = items.filter((i) => i.isShort);
  const normal = items.filter((i) => !i.isShort);

  const out: T[] = [];
  let s = 0;
  let n = 0;
  let pickShort = shorts.length > 0;

  while (s < shorts.length || n < normal.length) {
    if (pickShort && s < shorts.length) out.push(shorts[s++]);
    else if (!pickShort && n < normal.length) out.push(normal[n++]);
    else if (s < shorts.length) out.push(shorts[s++]);
    else if (n < normal.length) out.push(normal[n++]);
    pickShort = !pickShort;
  }

  return out;
}

const VideoShowcaseSection = () => {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  // Modal (vídeo em destaque)
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // Modal (vídeo destacado)

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => api.off("select", update);
  }, [api]);

  const videos = React.useMemo(() => {
    const parsed = youtubeVideos
      .map((v) => ({
        ...v,
        id: extractYouTubeId(v.urlOrId),
        isShort: isShortsUrl(v.urlOrId),
      }))
      .filter((v) => !!v.id) as Array<{ title: string; urlOrId: string; id: string; isShort: boolean }>;

    return mixShortsAndVideos(parsed);
  }, []);

  const isModalOpen = activeIndex !== null;
  const activeVideo = React.useMemo(() => {
    if (activeIndex === null) return null;
    return videos[activeIndex] || null;
  }, [activeIndex, videos]);

  const closeModal = React.useCallback(() => setActiveIndex(null), []);
  const openModal = React.useCallback((index: number) => setActiveIndex(index), []);

  const goPrev = React.useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => {
      if (prev === null) return null;
      const next = prev - 1;
      return next < 0 ? videos.length - 1 : next;
    });
  }, [activeIndex, videos.length]);

  const goNext = React.useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => {
      if (prev === null) return null;
      const next = prev + 1;
      return next >= videos.length ? 0 : next;
    });
  }, [activeIndex, videos.length]);

  // Trava scroll e permite navegação por teclado quando o modal estiver aberto
  React.useEffect(() => {
    if (!isModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [closeModal, goPrev, goNext, isModalOpen]);

  if (!videos.length) return null;

  return (
    <section id="videos" ref={ref} className="mt-16 md:mt-18 pt-2">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="text-center mb-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/70 backdrop-blur">
          <Video className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Vídeos</span>
          <span className="mx-2 h-4 w-px bg-border/80" />
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Shorts + vídeos
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-display font-bold mt-3">Vitrine de Vídeos</h3>

        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Use as setas para navegar de <span className="font-medium text-foreground">5 em 5</span>.
        </p>
      </motion.div>

      <div className="relative mt-2 md:mt-3">
        {/* Viewport rígido: mostra apenas 5 e não vaza */}
        <div className="overflow-hidden px-5 py-2">
          <Carousel
            setApi={(a) => setApi(a)}
            opts={{ align: "start", loop: false, slidesToScroll: 5 }}
            className="w-full"
          >
            <CarouselContent className="py-2">
              {videos.map((video, index) => (
                <CarouselItem key={video.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                  <motion.button
                    type="button"
                    onClick={() => openModal(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "group relative w-full rounded-3xl border bg-white/5 dark:bg-white/5 backdrop-blur-xl",
                      "border-white/10 dark:border-white/10 overflow-hidden",
                      "text-left",
                    )}
                  >
                    {/* Highlight sutil */}
                    <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[120%] -translate-x-1/2 rotate-6 bg-gradient-to-b from-white/18 to-transparent blur-2xl opacity-60" />

                    {/* 9:16 */}
                    <div className="relative w-full" style={{ paddingTop: "177.78%" }}>
                      <img
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className={cn(
                          "absolute inset-0 w-full h-full object-cover",
                          "blur-[2px] scale-[1.06] saturate-110",
                        )}
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/55" />

                      {video.isShort && (
                        <div className="absolute top-4 left-4">
                          <div className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/95 bg-white/10 border border-white/15 backdrop-blur">
                            SHORTS
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
                          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/35" />
                          <Play className="w-7 h-7 text-white ml-1 drop-shadow" />
                        </div>
                      </div>

                      <div className="absolute left-0 right-0 bottom-0 p-4">
                        <p className="text-sm font-medium text-white leading-snug line-clamp-2 drop-shadow">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Controls */}
        <div className="mt-2 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Vídeo anterior"
            className={cn(
              "rounded-full border-white/15 bg-white/5 backdrop-blur",
              "hover:bg-white/10 hover:border-white/25",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollNext()}
            disabled={!canNext}
            aria-label="Próximo vídeo"
            className={cn(
              "rounded-full border-white/15 bg-white/5 backdrop-blur",
              "hover:bg-white/10 hover:border-white/25",
            )}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Modal do vídeo (janelinha destacada) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 18, scale: 0.92, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl",
                "w-[min(92vw,480px)] aspect-[9/16] max-h-[88vh]",
              )}
            >
              {/* Barra superior (título + controles) */}
              <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-3 p-3">
                <div className="min-w-0">
                  <p className="text-xs text-white/70">Assistindo</p>
                  <p className="truncate text-sm font-medium text-white">{activeVideo.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Vídeo anterior"
                    className="h-9 w-9 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/75 flex items-center justify-center"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Próximo vídeo"
                    className="h-9 w-9 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/75 flex items-center justify-center"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Fechar"
                    className="h-9 w-9 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/75 flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Gradiente para legibilidade */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-24 bg-gradient-to-b from-black/85 via-black/35 to-transparent" />

              {/* Player */}
              <iframe
                key={activeVideo.id}
                src={getYouTubeEmbedUrl(activeVideo.id)}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcaseSection;