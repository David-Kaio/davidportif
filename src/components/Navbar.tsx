import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Trabalhos", href: "#works" },
  { label: "Experiência", href: "#experience" },
  { label: "Formação", href: "#education" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-0 right-0 z-50 px-4"
    >
      <div
        className={`section-container rounded-full border transition-all duration-300 ${
          isScrolled
            ? "glass-panel border-white/15"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-2 md:px-4">
          <motion.a
            href="#home"
            className="text-lg md:text-xl font-display font-bold tracking-[0.08em] uppercase"
            whileHover={{ scale: 1.03 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
          >
            DAVID <span className="text-gradient">KAIO</span>
          </motion.a>

          <ul className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                  whileHover={{ y: -1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                >
                  {item.label}
                </motion.a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 section-container"
          >
            <div className="glass-panel rounded-3xl overflow-hidden">
              <ul className="flex flex-col py-3">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={item.href}
                      className="block px-6 py-3 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
