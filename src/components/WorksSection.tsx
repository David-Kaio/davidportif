import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Layers, X } from "lucide-react";
import { designWorks, type DesignWork } from "@/data/designWorks";
import VideoShowcaseSection from "./VideoShowcaseSection";

const WorksSection = () => {
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null);
  const ref = useRef<HTMLElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const [galleryRef, galleryApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: 28,
    loop: false,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!selectedWork || !galleryApi) return;
    galleryApi.reInit();
    galleryApi.scrollTo(0, true);
  }, [selectedWork, galleryApi]);

  const openWork = (work: DesignWork) => {
    setSelectedWork(work);
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && setSelectedWork(null)}>
          <div className="relative h-[min(78vh,700px)] w-[min(88vw,560px)] overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl">
            <button type="button" aria-label="Fechar imagem" onClick={() => setSelectedWork(null)} className="absolute right-2 top-2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/65 text-white backdrop-blur-sm transition hover:bg-black/85"><X className="h-5 w-5" /></button>
            <div
              ref={galleryRef}
              className={`gallery-preview-track h-full overflow-hidden ${selectedWork.images.length > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
            >
              <div className="flex h-full touch-pan-y">
                {selectedWork.images.map((image, index) => (
                  <div key={image} className="flex h-full min-w-0 flex-[0_0_100%] items-center justify-center bg-black">
                    <img src={image} alt={`${selectedWork.title} ${index + 1}`} className="max-h-full max-w-full select-none object-contain" draggable={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorksSection;
