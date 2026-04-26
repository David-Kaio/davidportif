import { motion } from "framer-motion";
import { ArrowDown, Clapperboard, Download, Film, Megaphone, Sparkles, Wand2 } from "lucide-react";

const skills = ["Edição Sênior", "Publicidade", "Motion", "Direção Visual", "Social Media", "3D"];

const HeroSection = () => {
  const scrollToWorks = () => {
    const element = document.querySelector("#works");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-24 left-[10%] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[8%] top-36 h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Editor de vídeo sênior • Publicitário • Motion designer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-5xl font-bold leading-[0.95] md:text-7xl"
            >
              <span className="text-gradient">Editor de vídeo sênior</span>, publicitário e criador visual.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              Eu transformo ideias em vídeos, campanhas e experiências visuais com ritmo, retenção e estética premium.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/85 backdrop-blur-xl"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={scrollToWorks}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-4 font-semibold text-white card-glow transition-transform hover:scale-[1.02]"
              >
                Ver projetos
                <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              </button>
              <a
                href="/davidkaio_editor_de_video_ptbr.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 font-semibold text-white/90 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                Baixar currículo
                <Download className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[500px]"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/8 via-transparent to-cyan-400/8" />

              <div className="relative rounded-[1.6rem] border border-white/10 bg-black/20 p-6 md:p-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-100 ring-1 ring-fuchsia-300/20">
                    <Clapperboard className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">desde 2019</span>
                </div>

                <p className="text-xs uppercase tracking-[0.32em] text-white/45">Especialidade principal</p>
                <h3 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                  Edição, publicidade e direção visual.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/62">
                  Conteúdo com ritmo, estética e estratégia — da ideia à entrega final.
                </p>
              </div>

              <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-cyan-300/15 bg-cyan-400/10 p-4">
                  <Film className="mb-3 h-5 w-5 text-cyan-200" />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Vídeo</p>
                  <h4 className="mt-2 text-base font-bold leading-snug">Reels, shorts e institucionais</h4>
                </div>

                <div className="rounded-[1.25rem] border border-fuchsia-300/15 bg-fuchsia-500/10 p-4">
                  <Megaphone className="mb-3 h-5 w-5 text-fuchsia-200" />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Ads</p>
                  <h4 className="mt-2 text-base font-bold leading-snug">Criativos para campanha</h4>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4">
                  <Wand2 className="mb-3 h-5 w-5 text-cyan-200" />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Visual</p>
                  <h4 className="mt-2 text-base font-bold leading-snug">Estética limpa e memorável</h4>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
