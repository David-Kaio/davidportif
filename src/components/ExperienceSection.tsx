import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, Film, MapPin, Sparkles, TrendingUp } from "lucide-react";

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
    description:
      "Produção de +10 vídeos mensais adaptados para 4 plataformas diferentes (Instagram, TikTok, YouTube e LinkedIn). Atuação completa no registro e pós-produção, com atenção à estética, ritmo e propósito comunicacional de cada peça.",
    skills: ["Premiere Pro", "After Effects", "Captação de Vídeo", "Color Grading"],
    current: true,
  },
  {
    id: 2,
    role: "Estágio — Audiovisual",
    company: "Escola ZION",
    location: "Contagem, MG",
    period: "Abril 2023 - Presente",
    description:
      "Mais de 2 anos liderando a produção audiovisual da unidade, com +200 conteúdos entregues entre vídeos institucionais, cobertura de eventos e materiais para redes sociais. Responsável por todo o fluxo: captação, edição e finalização.",
    skills: ["Captação de Vídeo", "Edição de Vídeo", "Produção de Conteúdo"],
    current: true,
  },
  {
    id: 3,
    role: "Auxiliar de Marketing",
    company: "BNRBET",
    location: "Contagem, MG",
    period: "Março 2024 - Dezembro 2024",
    description:
      "Gestão de 3 redes sociais com produção de +50 artes visuais e 30 vídeos durante o período. Comunicação criativa e estratégica que contribuiu para o crescimento da presença digital da marca.",
    skills: ["Design Gráfico", "Edição de Vídeo", "Social Media", "Marketing Digital"],
  },
  {
    id: 4,
    role: "Freelance — Produção Audiovisual",
    company: "Tardezinha Beer",
    location: "Contagem, MG",
    period: "Junho 2024 - Agosto 2024",
    description:
      "Projeto de 3 meses com entrega de 15 peças audiovisuais focadas em storytelling e identidade de marca. Captação em eventos ao vivo e edição com narrativas atrativas para engajamento nas redes.",
    skills: ["Storytelling", "Captação de Vídeo", "Edição de Vídeo", "Branding"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="bg-transparent py-24 md:py-32" ref={ref}>
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
            Do estágio ao freelance para grandes marcas — uma trajetória de mais de 2 anos construindo histórias visuais, dominando ferramentas e entregando resultados que conectam marcas ao seu público.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)]">
          <div className="relative">
            <div className="absolute bottom-0 left-2 top-0 w-px bg-gradient-to-b from-primary via-primary/45 to-transparent" />
            {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="relative mb-8 pl-10 last:mb-0"
            >
              <div className="absolute left-0 top-0 z-10 h-4 w-4 rounded-full border-4 border-white bg-primary">
                {exp.current && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                )}
              </div>

              <div>
                <div className="p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-colors duration-300">
                  {exp.current && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3">
                      Atual
                    </span>
                  )}
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {exp.role}
                  </h3>
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                  <div className="flex flex-wrap gap-2">
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

            </motion.div>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="overflow-hidden rounded-[1.75rem] border border-violet-300/40 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-7 text-white shadow-[0_24px_60px_-32px_rgba(79,70,229,.65)] lg:sticky lg:top-28"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-white/12 p-3"><Sparkles className="h-5 w-5" /></div>
              <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-white/60">Em números</p><h3 className="mt-1 text-xl font-semibold">Uma trajetória em movimento</h3></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ value: "+200", label: "conteúdos" }, { value: "4", label: "plataformas" }, { value: "+2", label: "anos" }].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-sm">
                  <p className="text-2xl font-bold">{item.value}</p><p className="mt-1 text-xs text-white/65">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              {[{ icon: Film, text: "Produção audiovisual completa" }, { icon: TrendingUp, text: "Conteúdo orientado a resultado" }, { icon: Sparkles, text: "Identidade visual e storytelling" }].map((item) => (
                <div key={item.text} className="flex items-center gap-3 rounded-xl border border-white/10 bg-indigo-950/20 px-4 py-3 text-sm text-white/85">
                  <item.icon className="h-4 w-4 shrink-0 text-violet-200" />{item.text}
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
