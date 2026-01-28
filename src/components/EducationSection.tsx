import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: "completed" | "in_progress";
}

const education: Education[] = [
  {
    id: 1,
    degree: "Bacharelado em Publicidade e Propaganda",
    institution: "PUC Minas",
    location: "Coração Eucarístico, MG",
    period: "Julho 2025",
    status: "in_progress",
  },
  {
    id: 2,
    degree: "Design Master",
    institution: "Escola Zion",
    location: "Contagem, MG",
    period: "Janeiro 2022 - Junho 2025",
    status: "completed",
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 md:py-32 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            Formação
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Formação Acadêmica
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Base teórica sólida combinada com formação técnica especializada — o alicerce que sustenta cada projeto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="group relative"
            >
              <div className="p-8 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  {edu.status === "in_progress" && (
                    <span className="ml-auto px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      Em andamento
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-semibold mb-2">
                  {edu.degree}
                </h3>

                <p className="text-lg text-primary/80 font-medium mb-4">
                  {edu.institution}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
