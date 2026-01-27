import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Target, Heart } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "5+", label: "Anos de experiência" },
    { value: "50+", label: "Projetos entregues" },
    { value: "30+", label: "Clientes satisfeitos" },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Criatividade",
      description: "Busco sempre soluções únicas e inovadoras para cada projeto.",
    },
    {
      icon: Target,
      title: "Precisão",
      description: "Atenção aos detalhes em cada elemento visual que crio.",
    },
    {
      icon: Heart,
      title: "Paixão",
      description: "Amor pelo que faço refletido em cada trabalho entregue.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Sobre Mim</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Conheça minha história
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sou um profissional criativo apaixonado por transformar conceitos em
            realidade visual através do design, vídeo e arte 3D.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl card-gradient border border-border overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center">
                    <span className="text-6xl font-display font-bold text-gradient">
                      &lt;/&gt;
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Sua foto aqui
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-primary/10 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-4">
              Criando experiências visuais há mais de 5 anos
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Minha jornada começou com a paixão por criar. Ao longo dos anos,
              desenvolvi habilidades em design gráfico, edição de vídeo e
              modelagem 3D, sempre buscando entregar trabalhos que superem as
              expectativas.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Acredito que cada projeto é uma oportunidade de contar uma
              história única. Meu objetivo é sempre traduzir a essência de cada
              marca ou ideia em visuais que conectam e inspiram.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-secondary/50 border border-border"
                >
                  <div className="text-3xl font-display font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-display font-semibold mb-2">
                {value.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
