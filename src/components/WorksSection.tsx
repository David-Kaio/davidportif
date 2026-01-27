import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Video, Box, ExternalLink } from "lucide-react";

type Category = "all" | "design" | "video" | "3d";

interface Work {
  id: number;
  title: string;
  category: Category;
  description: string;
  tags: string[];
}

const works: Work[] = [
  {
    id: 1,
    title: "Identidade Visual - Tech Startup",
    category: "design",
    description: "Criação completa de marca para startup de tecnologia",
    tags: ["Branding", "Logo", "Guidelines"],
  },
  {
    id: 2,
    title: "Campanha Publicitária",
    category: "video",
    description: "Edição de vídeo promocional para lançamento de produto",
    tags: ["Motion", "Edição", "Color Grading"],
  },
  {
    id: 3,
    title: "Visualização Arquitetônica",
    category: "3d",
    description: "Renderização 3D fotorrealista de projeto arquitetônico",
    tags: ["3D Modeling", "Render", "Arquitetura"],
  },
  {
    id: 4,
    title: "UI/UX App Financeiro",
    category: "design",
    description: "Design de interface para aplicativo mobile",
    tags: ["UI Design", "UX", "Mobile"],
  },
  {
    id: 5,
    title: "Documentário Corporativo",
    category: "video",
    description: "Edição e pós-produção de documentário empresarial",
    tags: ["Documentário", "Storytelling", "Edição"],
  },
  {
    id: 6,
    title: "Product Visualization",
    category: "3d",
    description: "Modelagem e renderização de produto para e-commerce",
    tags: ["Product", "3D", "E-commerce"],
  },
];

const categories = [
  { id: "all" as const, label: "Todos", icon: null },
  { id: "design" as const, label: "Design", icon: Palette },
  { id: "video" as const, label: "Vídeo", icon: Video },
  { id: "3d" as const, label: "3D", icon: Box },
];

const WorksSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredWorks =
    activeCategory === "all"
      ? works
      : works.filter((work) => work.category === activeCategory);

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case "design":
        return <Palette className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "3d":
        return <Box className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case "design":
        return "bg-pink-500/10 text-pink-400";
      case "video":
        return "bg-blue-500/10 text-blue-400";
      case "3d":
        return "bg-green-500/10 text-green-400";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <section id="works" className="py-24 md:py-32 bg-secondary/20" ref={ref}>
      <div className="section-container">
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
            Uma seleção dos meus projetos mais recentes em design, edição de
            vídeo e arte 3D.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Works Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden card-gradient border border-border hover:border-primary/50 transition-all duration-300">
                {/* Thumbnail */}
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-secondary to-secondary overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className={`p-6 rounded-2xl ${getCategoryColor(work.category)}`}>
                      {getCategoryIcon(work.category)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(
                        work.category
                      )}`}
                    >
                      {getCategoryIcon(work.category)}
                      {work.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-full bg-primary text-primary-foreground shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorksSection;
