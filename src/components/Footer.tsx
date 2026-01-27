import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} Portfolio. Todos os direitos reservados.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 text-sm text-muted-foreground"
          >
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> e
            muita criatividade
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
