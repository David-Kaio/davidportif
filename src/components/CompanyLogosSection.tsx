import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  { src: "/logos/bnrbet.png", alt: "BNRbet", className: "h-11 md:h-14", imageClassName: "" },
  { src: "/logos/zion.svg", alt: "Escola Zion", className: "h-12 md:h-16", imageClassName: "" },
  { src: "/logos/logo-png.png", alt: "Unimax", className: "h-28 md:h-36", imageClassName: "scale-[0.80]" },
  { src: "/logos/logo-mark.png", alt: "Logo parceira", className: "h-20 md:h-21", imageClassName: "scale-[1.50]" },
  { src: "/logos/toca-do-monstro.png", alt: "Toca do Monstro", className: "h-24 md:h-32", imageClassName: "scale-[1.05]" },
  { src: "/logos/death-squad.png", alt: "Death Squad", className: "h-30 md:h-38", imageClassName: "scale-[1.12]" },
  { src: "/logos/insider.png", alt: "Insider", className: "h-16 md:h-18", imageClassName: "brightness-0 invert" },
];

const repeatedLogos = [...logos, ...logos, ...logos];

const CompanyLogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_75%_50%,rgba(34,211,238,0.10),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 mx-auto mb-8 max-w-[min(92vw,1200px)] text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/38">
          marcas e empresas por onde passei
        </p>
        <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
          Experiência aplicada em projetos reais.
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="group relative z-10 -my-10 overflow-x-hidden overflow-y-visible py-10"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-gradient-to-r from-black to-transparent md:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-28 bg-gradient-to-l from-black to-transparent md:w-44" />

        <div className="flex w-max animate-logo-marquee items-center gap-8 group-hover:[animation-play-state:paused] md:gap-10">
          {repeatedLogos.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex h-44 w-72 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.035] px-10 py-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.025] hover:border-cyan-300/25 hover:bg-white/[0.07] hover:shadow-[0_0_34px_rgba(34,211,238,0.14)] md:h-52 md:w-[22rem]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className={`${logo.className} ${logo.imageClassName} max-w-[90%] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CompanyLogosSection;
