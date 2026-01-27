import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Designer Sênior & Motion Designer",
    company: "Agência Criativa XYZ",
    location: "São Paulo, SP",
    period: "2022 - Presente",
    description:
      "Liderança de projetos de design e motion graphics para grandes marcas. Desenvolvimento de identidades visuais e campanhas publicitárias.",
    skills: ["Figma", "After Effects", "Illustrator", "Premiere Pro"],
    current: true,
  },
  {
    id: 2,
    role: "Editor de Vídeo & Artista 3D",
    company: "Studio Digital ABC",
    location: "Rio de Janeiro, RJ",
    period: "2020 - 2022",
    description:
      "Criação de conteúdo audiovisual e visualizações 3D para clientes do setor imobiliário e de produtos.",
    skills: ["Cinema 4D", "Blender", "DaVinci Resolve", "Photoshop"],
  },
  {
    id: 3,
    role: "Designer Gráfico",
    company: "Startup Tech",
    location: "Remoto",
    period: "2019 - 2020",
    description:
      "Design de interfaces, materiais de marketing e branding para startup em crescimento.",
    skills: ["Sketch", "InVision", "Illustrator", "Photoshop"],
  },
  {
    id: 4,
    role: "Freelancer",
    company: "Autônomo",
    location: "Diversos",
    period: "2017 - 2019",
    description:
      "Início da carreira com projetos diversos de design gráfico, edição de vídeo e primeiros trabalhos em 3D.",
    skills: ["Design Gráfico", "Edição de Vídeo", "Modelagem 3D"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            Experiência
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Histórico Profissional
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Minha jornada profissional e as experiências que moldaram minhas
            habilidades.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10">
                {exp.current && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                )}
              </div>

              {/* Content card */}
              <div
                className={`ml-8 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div className="p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-colors duration-300">
                  {exp.current && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3">
                      Atual
                    </span>
                  )}
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {exp.role}
                  </h3>
                  <div
                    className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {exp.description}
                  </p>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
