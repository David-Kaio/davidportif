import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  { src: "/logos/bnrbet.png", alt: "BNRbet", className: "h-11 md:h-14", imageClassName: "" },
  { src: "/logos/zion.svg", alt: "Escola Zion", className: "h-12 md:h-16", imageClassName: "" },
  { src: "/logos/logo-png.png", alt: "Unimax", className: "h-28 md:h-36", imageClassName: "scale-[0.80]" },
  { src: "/logos/toca-do-monstro.png", alt: "Toca do Monstro", className: "h-24 md:h-32", imageClassName: "scale-[1.05]" },
  { src: "/logos/insider.png", alt: "Insider", className: "h-16 md:h-18", imageClassName: "brightness-0 invert" },
  { src: "/logos/rede-coworking.avif", alt: "Rede Coworking", className: "h-16 md:h-20", imageClassName: "" },
];

const CompanyLogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="bg-white px-4 py-12 md:px-8 md:py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-violet-300/50 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 py-12 shadow-[0_24px_70px_-35px_rgba(91,33,182,.55)] md:py-16">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 mx-auto mb-8 max-w-[min(88vw,1100px)] px-6 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/65">
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
        className="relative z-10 -my-8 overflow-x-hidden overflow-y-visible py-8"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
        }}
      >
        <div className="flex w-max animate-logo-marquee items-center">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1}
              className="flex shrink-0 items-center gap-8 pr-8 md:gap-10 md:pr-10"
            >
              {logos.map((logo) => (
                <div
                  key={`${copyIndex}-${logo.alt}`}
                  className="flex h-40 w-64 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-indigo-950/55 px-9 py-7 shadow-[0_16px_35px_-24px_rgba(15,10,45,.85)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:scale-[1.025] hover:border-white/35 hover:bg-indigo-950/70 md:h-48 md:w-80"
                >
                  <img
                    src={logo.src}
                    alt={copyIndex === 0 ? logo.alt : ""}
                    loading="lazy"
                    className={`${logo.className} ${logo.imageClassName} max-w-[90%] object-contain opacity-95 transition duration-300 hover:opacity-100`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default CompanyLogosSection;
