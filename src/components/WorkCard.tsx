import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Image, Layers, ArrowUpRight } from "lucide-react";

import type { DesignWork } from "@/data/designWorks";

interface WorkCardProps {
  work: DesignWork;
  index: number;
  onClick: () => void;
}

const WorkCard = ({ work, index, onClick }: WorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const typeLabel = work.type === "post" ? "Post" : "Carrossel";
  const TypeIcon = work.type === "post" ? Image : Layers;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.985 }}
      transition={{ duration: 0.48, delay: Math.min(index * 0.045, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="group mb-4 break-inside-avoid cursor-pointer sm:mb-5"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-[1.35rem] bg-white/[0.035] shadow-[0_24px_80px_-54px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.08] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_90px_-50px_rgba(145,92,255,0.55)] hover:ring-white/20">
        <img
          src={work.thumbnail}
          alt={work.title}
          className="block h-auto w-full select-none object-cover transition duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-[0.72]"
          loading="lazy"
          draggable={false}
        />

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-xl">
                <TypeIcon className="h-3 w-3" />
                {typeLabel}
                {work.type === "carrossel" ? ` · ${work.numberOfSlides}` : ""}
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">{work.company}</p>
            <h3 className="mt-2 text-lg font-semibold leading-tight text-white sm:text-xl">{work.title}</h3>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default WorkCard;
