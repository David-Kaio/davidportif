import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Layers, MoveHorizontal, X } from "lucide-react";
import { designWorks, type DesignWork } from "@/data/designWorks";
import VideoShowcaseSection from "./VideoShowcaseSection";

const WorksSection = () => {
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null);
  const [previewSize, setPreviewSize] = useState<{ width: number; height: number } | null>(null);
  const [showCarouselHint, setShowCarouselHint] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const carouselPointerStartX = useRef<number | null>(null);
  const [galleryRef, galleryApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: 28,
    loop: false,
    watchDrag: Boolean(selectedWork && selectedWork.images.length > 1),
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!selectedWork || !galleryApi) return;
    galleryApi.reInit();
    galleryApi.scrollTo(0, true);
  }, [selectedWork, galleryApi]);

  useEffect(() => {
    if (!selectedWork) {
      setPreviewSize(null);
      return;
    }

    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const maxWidth = Math.min(window.innerWidth * 0.88, 640);
      const maxHeight = window.innerHeight * 0.7;
      const scale = Math.min(maxWidth / image.naturalWidth, maxHeight / image.naturalHeight, 1);
      setPreviewSize({
        width: Math.round(image.naturalWidth * scale),
        height: Math.round(image.naturalHeight * scale),
      });
    };
    image.src = selectedWork.images[0];

    return () => {
      cancelled = true;
    };
  }, [selectedWork]);

  useEffect(() => {
    if (!selectedWork) return;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("portfolio:scroll-lock", { detail: true }));

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.dispatchEvent(new CustomEvent("portfolio:scroll-lock", { detail: false }));
    };
  }, [selectedWork]);

  const openWork = (work: DesignWork) => {
    setPreviewSize(null);
    setShowCarouselHint(work.type === "carrossel");
    carouselPointerStartX.current = null;
    setSelectedWork(work);
  };

  const moveDesign = (direction: number) => {
    if (!selectedWork) return;
    const currentIndex = designWorks.findIndex((work) => work.id === selectedWork.id);
    const nextIndex = (currentIndex + direction + designWorks.length) % designWorks.length;
    openWork(designWorks[nextIndex]);
  };

  const moveImageShowcase = (direction: number) => {
    imageTrackRef.current?.scrollBy({
      left: direction * imageTrackRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="works" className="relative py-16 md:py-24" ref={ref}>
      <div className="section-container">
        <VideoShowcaseSection />

        <div className="pt-16 md:pt-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} className="max-w-2xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ImageIcon className="h-6 w-6" /></div>
            <h2 className="text-3xl font-bold md:text-4xl">Vitrine de <span className="text-gradient">Imagens</span></h2>
            <p className="mt-4 leading-7 text-muted-foreground">Trabalhos de design, direção de arte e conteúdo visual. Clique em qualquer peça para abrir a galeria.</p>
          </motion.div>

          <div className="mb-5 mt-8 flex justify-end gap-3">
            <button type="button" onClick={() => moveImageShowcase(-1)} aria-label="Ver imagens anteriores" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => moveImageShowcase(1)} aria-label="Ver próximas imagens" className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"><ChevronRight className="h-5 w-5" /></button>
          </div>

          <motion.div ref={imageTrackRef} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="image-showcase-track video-snap-carousel grid overflow-x-auto pb-4">
            {designWorks.map((work) => (
              <button key={work.id} onClick={() => openWork(work)} className="group relative aspect-[4/5] snap-start overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-[0_18px_45px_-32px_rgba(15,23,42,.45)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-30px_rgba(79,70,229,.34)]">
                <img src={work.thumbnail} alt={work.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 transition group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left text-white">
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/75">
                    {work.type === "carrossel" ? <Layers className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
                    {work.type === "carrossel" ? `${work.numberOfSlides} imagens` : "Imagem"}
                  </div>
                  <p className="line-clamp-2 text-sm font-semibold">{work.title}</p>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {selectedWork && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/90 p-3 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && setSelectedWork(null)}>
          {previewSize && (
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl" style={{ width: previewSize.width, height: previewSize.height }}>
              <button type="button" aria-label="Fechar imagem" onClick={() => setSelectedWork(null)} className="absolute right-2 top-2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/65 text-white backdrop-blur-sm transition hover:bg-black/85"><X className="h-5 w-5" /></button>
              <div
                ref={galleryRef}
                className={`gallery-preview-track h-full overflow-hidden ${selectedWork.images.length > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
                onPointerDown={(event) => {
                  if (selectedWork.type === "carrossel") carouselPointerStartX.current = event.clientX;
                }}
                onPointerMove={(event) => {
                  if (carouselPointerStartX.current === null) return;
                  if (Math.abs(event.clientX - carouselPointerStartX.current) > 10) {
                    setShowCarouselHint(false);
                    carouselPointerStartX.current = null;
                  }
                }}
                onPointerUp={() => { carouselPointerStartX.current = null; }}
                onPointerCancel={() => { carouselPointerStartX.current = null; }}
              >
                <div className="flex h-full touch-pan-y">
                  {selectedWork.images.map((image, index) => (
                    <div key={image} className="flex h-full min-w-0 flex-[0_0_100%] items-center justify-center">
                      <img src={image} alt={`${selectedWork.title} ${index + 1}`} className="h-full w-full select-none object-contain" draggable={false} />
                    </div>
                  ))}
                </div>
              </div>
              <AnimatePresence>
                {selectedWork.type === "carrossel" && showCarouselHint && (
                  <motion.div
                    initial={{ opacity: 0, x: 28, y: "-50%", scale: 0.72 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: "-50%",
                      scale: [1, 1.045, 1],
                      boxShadow: [
                        "0 18px 45px -18px rgba(99,102,241,.55)",
                        "0 22px 58px -12px rgba(99,102,241,.9)",
                        "0 18px 45px -18px rgba(99,102,241,.55)",
                      ],
                    }}
                    exit={{ opacity: 0, x: 22, y: "-50%", scale: 0.86 }}
                    transition={{
                      opacity: { duration: 0.28 },
                      x: { type: "spring", stiffness: 260, damping: 20 },
                      scale: { delay: 0.35, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                      boxShadow: { delay: 0.35, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="pointer-events-none absolute right-3 top-1/2 z-10 flex max-w-36 flex-col items-center gap-1.5 rounded-2xl border border-white/35 bg-gradient-to-br from-primary/95 to-violet-700/95 px-4 py-3 text-center text-white backdrop-blur-xl"
                  >
                    <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}>
                      <MoveHorizontal className="h-6 w-6" />
                    </motion.div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.14em]">Post interativo</span>
                    <span className="text-[11px] font-medium leading-4 text-white/85">Arraste para o lado</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <div className="flex w-full max-w-xl items-center justify-between gap-3">
            <button type="button" onClick={() => moveDesign(-1)} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10">
              <ChevronLeft className="h-4 w-4" />
              Design anterior
            </button>
            <button type="button" onClick={() => moveDesign(1)} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10">
              Próximo design
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorksSection;
