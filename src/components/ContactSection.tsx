import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, Linkedin, Instagram } from "lucide-react";

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.846 1.392 2.42 2.595 2.42 1.202 0 2.128-.617 2.427-1.391h2.734zM15.97 13h5.09c-.059-1.472-.762-2.237-2.395-2.237-1.504 0-2.406.782-2.695 2.237zM9.089 21.134H2V5.646h7.892c2.397 0 4.276 1.143 4.276 3.99 0 1.617-.85 2.854-2.205 3.416v.063c1.726.396 2.781 1.856 2.781 3.895-.001 3.193-2.348 4.124-5.655 4.124zm-.188-7.553H5.17v4.014h3.679c1.382 0 2.379-.617 2.379-2.011 0-1.549-1.133-2.003-2.327-2.003zm-.09-5.403H5.17v3.456h3.382c1.184 0 2.156-.476 2.156-1.85 0-1.498-1.088-1.606-1.897-1.606z"/>
  </svg>
);
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Meu nome é ${formData.name}.\n\nEmail: ${formData.email}\n\nMensagem: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5531998171242?text=${encodedText}`, "_blank");
  };
  const socialLinks = [{
    icon: BehanceIcon,
    href: "https://www.behance.net/davidkaio",
    label: "Behance"
  }, {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/david-kaio-36278725b/",
    label: "LinkedIn"
  }, {
    icon: Instagram,
    href: "https://www.instagram.com/kimura.vfx/",
    label: "Instagram"
  }];
  return <section id="contact" className="py-24 md:py-32 bg-secondary/20" ref={ref}>
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <span className="text-primary font-medium mb-4 block">Contato</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tem um projeto em mente? Entre em contato e vamos transformar suas
              ideias em realidade.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="grid md:grid-cols-2 gap-8 w-full">
            {/* Contact Info */}
            <div className="p-8 w-full rounded-2xl card-gradient border border-border">
              <h3 className="text-xl font-display font-semibold mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a className="font-medium hover:text-primary transition-colors" href="mailto:davidkaiosilva@gmail.com">
                      davidkaiosilva@gmail.com
                    </a>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Me siga nas redes
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map(social => <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{
                    scale: 1.1,
                    y: -2
                  }} whileTap={{
                    scale: 0.95
                  }} className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary/10 border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" aria-label={social.label}>
                        <social.icon className="w-5 h-5" />
                      </motion.a>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-2xl w-full card-gradient border border-border">
              <h3 className="text-xl font-display font-semibold mb-6">
                Envie uma mensagem
              </h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground" placeholder="Seu nome" required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground" placeholder="seu@email.com" required />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea id="message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none" placeholder="Conte-me sobre seu projeto..." required />
                </div>

                <motion.button type="submit" whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                  Enviar via WhatsApp
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default ContactSection;