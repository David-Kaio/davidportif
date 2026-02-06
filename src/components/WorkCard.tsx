import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Image, Layers } from "lucide-react";
import type { DesignWork } from "@/data/designWorks";

interface WorkCardProps {
  work: DesignWork;
  index: number;
  onClick: () => void;
}

const WorkCard = ({ work, index, onClick }: WorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const typeBadge = work.type === "post"
    ? { label: "POST", color: "bg-orange-500/70 text-pink-50`", icon: <Image className="w-3 h-3" /> }
    : { label: "CARROSSEL", color: "bg-orange-500/70 text-blue-50", icon: <Layers className="w-3 h-3" /> };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group cursor-pointer break-inside-avoid mb-6"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden card-gradient border border-border hover:border-primary/50 transition-all duration-300">
        {/* Thumbnail — natural aspect ratio */}
        <div className="overflow-hidden relative">
          <img
            src={work.thumbnail}
            alt={work.title}
            className="w-full h-auto block group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {/* Type badge — top left */}
          <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm ${typeBadge.color}`}>
            {typeBadge.icon}
            {typeBadge.label}
          </span>
          {/* Slide count — top right (carousels only) */}
          {work.type === "carrossel" && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm bg-white/60 text-black">
              <Layers className="w-3 h-3" />
              {work.numberOfSlides}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {work.company}
          </p>
          <h3 className="text-base font-display font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {work.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {work.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
