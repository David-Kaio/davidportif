import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Image, Layers } from "lucide-react";

import { designWorks, type DesignWork } from "@/data/designWorks";
import VideoShowcaseSection from "./VideoShowcaseSection";
import WorkCard from "./WorkCard";
import WorkDetailDialog from "./WorkDetailDialog";
import WorksPagination from "./WorksPagination";

type FilterType = "all" | "post" | "carrossel";

const ITEMS_PER_PAGE = 12;

const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Todos", icon: null },
  { id: "post", label: "Posts", icon: <Image className="h-4 w-4" /> },
  { id: "carrossel", label: "Carrosséis", icon: <Layers className="h-4 w-4" /> },
];

const WorksSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null);

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = useMemo(
    () => (activeFilter === "all" ? designWorks : designWorks.filter((w) => w.type === activeFilter)),
    [activeFilter],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="works" className="relative py-16 md:py-24" ref={ref}>
      <div className="section-container">
        <VideoShowcaseSection />

        <div className="mt-10 p-0 md:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Design</span>
            <h2 className="mt-4 text-4xl font-bold md:text-6xl">
              Projetos de <span className="text-gradient">Design</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFilterChange(f.id)}
                className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium transition-all ${
                  activeFilter === f.id
                    ? "border-transparent bg-fuchsia-500/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-white"
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 xl:columns-4"
            key={`${activeFilter}-${currentPage}`}
          >
            {paged.map((work, index) => (
              <WorkCard key={work.id} work={work} index={index} onClick={() => setSelectedWork(work)} />
            ))}
          </motion.div>

          <div className="mt-10">
            <WorksPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>

      <WorkDetailDialog
        work={selectedWork}
        open={!!selectedWork}
        onOpenChange={(open) => {
          if (!open) setSelectedWork(null);
        }}
      />
    </section>
  );
};

export default WorksSection;
