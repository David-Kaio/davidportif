import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Image, Layers } from "lucide-react";
import { designWorks, type DesignWork } from "@/data/designWorks";
import WorkCard from "./WorkCard";
import WorkDetailDialog from "./WorkDetailDialog";
import WorksPagination from "./WorksPagination";

type FilterType = "all" | "post" | "carrossel";

const ITEMS_PER_PAGE = 6;

const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Todos", icon: null },
  { id: "post", label: "Posts", icon: <Image className="w-4 h-4" /> },
  { id: "carrossel", label: "Carrosséis", icon: <Layers className="w-4 h-4" /> },
];

const WorksSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null);

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = useMemo(
    () => activeFilter === "all"
      ? designWorks
      : designWorks.filter((w) => w.type === activeFilter),
    [activeFilter],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="works" className="py-24 md:py-32 bg-secondary/20" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Meus Trabalhos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma seleção dos meus projetos mais recentes em design gráfico e social media.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeFilter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div
          key={`${activeFilter}-${currentPage}`}
          className="columns-1 md:columns-2 lg:columns-3 gap-6"
        >
          {paged.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              index={index}
              onClick={() => setSelectedWork(work)}
            />
          ))}
        </div>

        {/* Pagination */}
        <WorksPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Detail dialog */}
      <WorkDetailDialog
        work={selectedWork}
        open={!!selectedWork}
        onOpenChange={(open) => { if (!open) setSelectedWork(null); }}
      />
    </section>
  );
};

export default WorksSection;
