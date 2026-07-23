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
    role: "Freelance — Produção Audiovisual",
    company: "THOR Limits",
    location: "Contagem, MG",
    period: "Maio 2025 - Presente",
    description: "Produção de +10 vídeos mensais adaptados para 4 plataformas diferentes (Instagram, TikTok, YouTube e LinkedIn). Atuação completa no registro e pós-produção, com atenção à estética, ritmo e propósito comunicacional de cada peça.",
    skills: ["Premiere Pro", "After Effects", "Captação de Vídeo", "Color Grading"],
    current: true,
  },
  {
    id: 2,
    role: "Estágio — Audiovisual",
    company: "Escola ZION",
    location: "Contagem, MG",
    period: "Abril 2023 - Presente",
    description: "Mais de 2 anos liderando a produção audiovisual da unidade, com +200 conteúdos entregues entre vídeos institucionais, cobertura de eventos e materiais para redes sociais. Responsável por todo o fluxo: captação, edição e finalização.",
    skills: ["Captação de Vídeo", "Edição de Vídeo", "Produção de Conteúdo"],
    current: true,
  },
  {
    id: 3,
    role: "Auxiliar de Marketing",
    company: "BNRBET",
    location: "Contagem, MG",
    period: "Março 2024 - Dezembro 2024",
    description: "Gestão de 3 redes sociais com produção de +50 artes visuais e 30 vídeos durante o período. Comunicação criativa e estratégica que contribuiu para o crescimento da presença digital da marca.",
    skills: ["Design Gráfico", "Edição de Vídeo", "Social Media", "Marketing Digital"],
  },
  {
    id: 4,
    role: "Freelance — Produção Audiovisual",
    company: "Tardezinha Beer",
    location: "Contagem, MG",
    period: "Junho 2024 - Agosto 2024",
    description: "Projeto de 3 meses com entrega de 15 peças audiovisuais focadas em storytelling e identidade de marca. Captação em eventos ao vivo e edição com narrativas atrativas para engajamento nas redes.",
    skills: ["Storytelling", "Captação de Vídeo", "Edição de Vídeo", "Branding"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="bg-transparent py-24 md:py-32" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <span className="mb-4 block font-medium text-primary">Experiência</span>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">Histórico Profissional</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Do estágio ao freelance para grandes marcas — uma trajetória de mais de 2 anos construindo histórias visuais, dominando ferramentas e entregando resultados que conectam marcas ao seu público.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-2 top-0 w-px bg-gradient-to-b from-primary via-primary/45 to-transparent" />
          {experiences.map((exp, index) => (
            <motion.article key={exp.id} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }} className="relative mb-8 pl-10 last:mb-0">
              <div className="absolute left-0 top-0 z-10 h-4 w-4 rounded-full border-4 border-white bg-primary">
                {exp.current && <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-50" />}
              </div>
              <div className="card-gradient w-full rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-primary/50 md:p-8">
                {exp.current && <span className="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">Atual</span>}
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">{exp.role}</h3>
                <div className="mb-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{exp.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{exp.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{exp.period}</span>
                </div>
                <p className="mb-5 max-w-5xl leading-7 text-muted-foreground">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => <span key={skill} className="rounded-md bg-secondary px-2.5 py-1.5 text-xs text-muted-foreground">{skill}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
