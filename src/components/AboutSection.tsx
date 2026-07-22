import { motion, useInView } from "framer-motion";
import { Download, UserRound } from "lucide-react";
import { useRef } from "react";

type AppItem = {
  name: string;
  logo: string;
  logoClass?: string;
};

const apps: AppItem[] = [
  { name: "Adobe After Effects", logo: "/apps/adobe-after-effects.png" },
  { name: "Adobe Premiere", logo: "/apps/adobe-premiere.png" },
  { name: "Adobe Photoshop", logo: "/apps/adobe-photoshop.png" },
  { name: "Adobe Illustrator", logo: "/apps/adobe-illustrator.png" },
  { name: "DaVinci Resolve Pro", logo: "/apps/davinci-resolve.png" },
  { name: "CapCut", logo: "/apps/capcut.png" },
  { name: "Canva", logo: "/apps/canva.png", logoClass: "h-11 w-[88px]" },
  { name: "Blender", logo: "/apps/blender.png", logoClass: "h-14 w-[72px]" },
];

const AboutSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="border-b border-border bg-transparent py-20 md:py-24">
      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <UserRound className="h-6 w-6" />
              </span>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Sobre mim</h2>
            </div>

            <div className="space-y-5 text-[15px] leading-7 text-muted-foreground md:text-base">
              <p>
                Sou editor de vídeo e criador visual apaixonado por transformar ideias em conteúdos simples, bonitos e marcantes. Minha experiência reúne edição, motion design, direção visual e criação para redes sociais.
              </p>
              <p>
                Desde cedo, sempre fui curioso e conectado ao meio criativo. Com o tempo, passei a enxergar cada projeto como uma oportunidade de contar histórias, despertar emoções e aproximar marcas de pessoas.
              </p>
              <p>
                No lado profissional, combino criatividade, organização e atenção aos detalhes para desenvolver vídeos, campanhas e peças visuais com identidade. Busco evoluir constantemente e entregar trabalhos que tenham propósito, ritmo e impacto.
              </p>
            </div>

            <a
              href="/davidkaio_editor_de_video_ptbr.pdf"
              download
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              <Download className="h-4 w-4 text-primary" />
              Baixar currículo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {apps.map((app, index) => (
              <motion.article
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.12 + index * 0.055 }}
                className="group flex min-h-[155px] flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-3 py-6 text-center shadow-[0_12px_30px_-22px_rgba(15,23,42,.45)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_38px_-22px_rgba(79,70,229,.35)]"
              >
                <div className="mb-4 flex h-16 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={app.logo}
                    alt={`Logo ${app.name}`}
                    loading="lazy"
                    className={`object-contain ${app.logoClass ?? "h-14 w-14"}`}
                  />
                </div>
                <h3 className="text-sm font-semibold leading-5 text-slate-900">{app.name}</h3>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
