import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const whatsappUrl = "https://wa.me/5531998171242?text=Ol%C3%A1%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="bg-transparent py-24 md:py-32" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-white via-violet-50/70 to-indigo-100/70 px-6 py-14 text-center shadow-[0_28px_80px_-45px_rgba(79,70,229,.45)] sm:px-10 md:py-20"
        >
          <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-violet-300/30 blur-3xl" />
          <div className="relative z-10">
            <span className="mb-4 block font-medium text-primary">Contato</span>
            <h2 className="text-4xl font-bold md:text-5xl">Vamos conversar sobre seu projeto?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Um clique já abre a conversa. Me conte sua ideia no WhatsApp e eu respondo por lá.</p>
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white shadow-[0_18px_40px_-20px_rgba(37,211,102,.8)] transition hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-5 w-5" />
              Falar comigo no WhatsApp
              <ArrowUpRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
