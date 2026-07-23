import * as React from "react";
import { motion } from "framer-motion";
import { Clapperboard, Pause, Play } from "lucide-react";
import { youtubeVideos } from "@/data/youtubeVideos";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function extractYouTubeId(input: string): string | null {
  const value = input.trim();
  if (/^[a-zA-Z0-9_-]{8,}$/.test(value) && !value.includes("http")) return value;
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1) || null;
    return url.searchParams.get("v") || url.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)?.[1] || null;
  } catch {
    return null;
  }
}

const VideoShowcaseSection = () => {
  const [activeVideoId, setActiveVideoId] = React.useState<string | null>(null);
  const videos = React.useMemo(
    () => youtubeVideos
      .map((video) => ({ ...video, id: extractYouTubeId(video.urlOrId) }))
      .filter((video): video is typeof video & { id: string } => Boolean(video.id))
      .filter((video, index, list) => list.findIndex((item) => item.id === video.id) === index),
    [],
  );

  return (
    <div className="border-b border-border pb-16 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 max-w-2xl"
      >
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Clapperboard className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold md:text-4xl">
          Vitrine de <span className="text-gradient">Vídeos</span>
        </h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          Uma galeria com os projetos publicados no YouTube. Escolha qualquer vídeo para assistir diretamente no próprio cartão.
        </p>
      </motion.div>

      <Carousel opts={{ align: "start", slidesToScroll: "auto" }} className="mx-auto w-full">
        <CarouselContent className="pb-5">
        {videos.map((video, index) => {
          const isActive = activeVideoId === video.id;
          return (
            <CarouselItem key={video.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
              <motion.article
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(index * 0.025, 0.2) }}
                className="group overflow-hidden rounded-[1.35rem] border border-border bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,.42)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_52px_-30px_rgba(79,70,229,.35)]"
              >
              <div className="relative aspect-[9/16] overflow-hidden bg-slate-950">
                {isActive ? (
                  <>
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1&vq=hd1080`}
                      title={video.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                    <button
                      type="button"
                      aria-label={`Fechar ${video.title}`}
                      onClick={() => setActiveVideoId(null)}
                      className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/65 text-white backdrop-blur-sm transition hover:bg-black/80"
                    >
                      <Pause className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveVideoId(video.id)}
                    aria-label={`Reproduzir ${video.title}`}
                    className="relative h-full w-full text-left"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        const image = event.currentTarget;
                        const fallback = image.dataset.fallback ?? "sd";
                        if (fallback === "done") return;
                        image.dataset.fallback = fallback === "sd" ? "hq" : "done";
                        image.src = `https://i.ytimg.com/vi/${video.id}/${fallback === "sd" ? "sddefault" : "hqdefault"}.jpg`;
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
                    <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-950 shadow-xl transition group-hover:scale-110">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </button>
                )}
              </div>
              <div className="p-4">
                <p className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-foreground">{video.title}</p>
                <p className="mt-2 text-xs text-muted-foreground">Assistir no portfólio</p>
              </div>
              </motion.article>
            </CarouselItem>
          );
        })}
        </CarouselContent>
        <CarouselPrevious className="left-1 top-1/2 h-11 w-11 border-border bg-white/95 shadow-lg backdrop-blur md:-left-3" />
        <CarouselNext className="right-1 top-1/2 h-11 w-11 border-border bg-white/95 shadow-lg backdrop-blur md:-right-3" />
      </Carousel>
      <p className="mt-2 text-center text-xs text-muted-foreground">Arraste para o lado ou use as setas para ver os próximos vídeos.</p>
    </div>
  );
};

export default VideoShowcaseSection;
