import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Layers, X } from "lucide-react";
import { designWorks, type DesignWork } from "@/data/designWorks";
import VideoShowcaseSection from "./VideoShowcaseSection";

const WorksSection = () => {
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const openWork = (work: DesignWork) => {
    setSelectedWork(work);
    setActiveSlide(0);
  };

  const moveSlide = (direction: number) => {
    if (!selectedWork) return;
    setActiveSlide((current) => (current + direction + selectedWork.images.length) % selectedWork.images.length);
  };

  return (
    <section id="works" className="relative py-16 md:py-24" ref={ref}>
      <div className="section-container">
        <VideoShowcaseSection />

        <div className="grid gap-10 pt-16 md:pt-20 lg:grid-cols-[250px_minmax(0,1fr)]">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ImageIcon className="h-6 w-6" /></div>
            <h2 className="text-3xl font-bold md:text-4xl">Vitrine de <span className="text-gradient">Imagens</span></h2>
            <p className="mt-4 leading-7 text-muted-foreground">Trabalhos de design, direção de arte e conteúdo visual. Clique em qualquer peça para abrir a galeria.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {designWorks.map((work, index) => (
              <button key={work.id} onClick={() => openWork(work)} className="group relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-[0_18px_45px_-32px_rgba(15,23,42,.45)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-30px_rgba(79,70,229,.34)]">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md" onMouseDown={(e) => e.target === e.currentTarget && setSelectedWork(null)}>
          <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.6rem] bg-[#0b0d13] shadow-2xl">
            <button onClick={() => setSelectedWork(null)} className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"><X className="h-5 w-5" /></button>
            <div
              className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center p-4 sm:p-6"
              onPointerDown={(event) => { swipeStartX.current = event.clientX; }}
              onPointerUp={(event) => {
                if (swipeStartX.current === null || selectedWork.images.length < 2) return;
                const distance = event.clientX - swipeStartX.current;
                swipeStartX.current = null;
                if (Math.abs(distance) > 55) moveSlide(distance < 0 ? 1 : -1);
              }}
              onPointerCancel={() => { swipeStartX.current = null; }}
            >
              <img src={selectedWork.images[activeSlide]} alt={`${selectedWork.title} ${activeSlide + 1}`} className="max-h-[68vh] max-w-full select-none rounded-xl object-contain" draggable={false} />
              {selectedWork.images.length > 1 && <>
                <button onClick={() => moveSlide(-1)} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/65"><ChevronLeft className="h-6 w-6" /></button>
                <button onClick={() => moveSlide(1)} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/65"><ChevronRight className="h-6 w-6" /></button>
              </>}
            </div>
            <div className="border-t border-white/10 bg-black/25 p-4">
              <div className="video-snap-carousel flex gap-2 overflow-x-auto pb-2">
                {selectedWork.images.map((image, index) => (
                  <button key={image} onClick={() => setActiveSlide(index)} className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-24 sm:w-20 ${index === activeSlide ? "border-primary" : "border-transparent opacity-55 hover:opacity-100"}`}>
                    <img src={image} alt={`Miniatura ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between gap-4 text-white">
                <div><p className="font-semibold">{selectedWork.title}</p><p className="text-sm text-white/55">{selectedWork.company}</p></div>
                <span className="text-sm text-white/55">{activeSlide + 1} / {selectedWork.images.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorksSection;
