import { motion } from "framer-motion";
import { ArrowDown, Download, Instagram, Linkedin, Mail } from "lucide-react";

const skills = ["Edição de vídeo", "Motion design", "Publicidade", "Direção visual", "Social media", "3D"];

const HeroSection = () => {
  const scrollTo = (selector: string) => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative overflow-hidden border-b border-border bg-transparent pt-32 md:pt-36">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-100/70 blur-3xl" />
      <div className="section-container relative z-10 pb-20 md:pb-28">
        <div className="grid min-h-[680px] items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
          <div className="max-w-2xl">
            <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="mb-5 text-sm font-semibold uppercase tracking-[.22em] text-primary">
              Olá, eu sou
            </motion.p>
            <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.05}} className="text-5xl font-bold leading-[.96] tracking-[-.045em] sm:text-6xl md:text-7xl">
              David Kaio
            </motion.h1>
            <motion.h2 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.1}} className="mt-4 text-2xl font-semibold text-primary sm:text-3xl">
              Editor de vídeo e criador visual
            </motion.h2>
            <motion.p initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.15}} className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Transformo ideias em vídeos, campanhas e experiências visuais diretas, envolventes e feitas para prender atenção.
            </motion.p>

            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.2}} className="mt-8 flex flex-wrap gap-2.5">
              {skills.map((skill) => <span key={skill} className="rounded-full border border-border bg-secondary/70 px-4 py-2 text-sm font-medium text-secondary-foreground">{skill}</span>)}
            </motion.div>

            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.25}} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => scrollTo("#works")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:opacity-95">
                Ver projetos <ArrowDown className="h-5 w-5" />
              </button>
              <button onClick={() => scrollTo("#contact")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-7 py-4 font-semibold transition hover:border-primary/40 hover:bg-accent">
                Entrar em contato <Mail className="h-5 w-5" />
              </button>
              <a href="/davidkaio_editor_de_video_ptbr.pdf" download className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-4 font-semibold text-muted-foreground transition hover:text-primary">
                Currículo <Download className="h-5 w-5" />
              </a>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.35}} className="mt-8 flex items-center gap-3">
              <a href="https://www.linkedin.com/in/david-kaio-36278725b/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border p-3 text-muted-foreground transition hover:border-primary/30 hover:text-primary"><Linkedin className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/kimura.vfx/" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-border p-3 text-muted-foreground transition hover:border-primary/30 hover:text-primary"><Instagram className="h-5 w-5" /></a>
            </motion.div>
          </div>

          <motion.div initial={{opacity:0,scale:.97,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.7,delay:.12}} className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -bottom-6 -left-6 h-36 w-36 rounded-[2rem] border border-indigo-100 bg-indigo-50" />
            <div className="absolute -right-5 -top-5 grid grid-cols-4 gap-2 opacity-70">
              {Array.from({length:16}).map((_,i)=><span key={i} className="h-1.5 w-1.5 rounded-full bg-primary" />)}
            </div>
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-[0_28px_80px_-35px_rgba(15,23,42,.38)]">
              <img src="/minha-historia.jpg" alt="Foto de David Kaio" className="h-full w-full object-cover object-center" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
