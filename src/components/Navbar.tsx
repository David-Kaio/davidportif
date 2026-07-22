import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Sobre mim", href: "#about" },
  { label: "Projetos", href: "#works" },
  { label: "Experiência", href: "#experience" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>20);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn)},[]);
  const go=(href:string)=>{document.querySelector(href)?.scrollIntoView({behavior:"smooth"});setOpen(false)};
  return <motion.nav initial={{y:-80}} animate={{y:0}} className="fixed inset-x-0 top-0 z-50 border-b border-transparent px-4 py-3">
    <div className={`section-container rounded-2xl transition ${scrolled?"glass-panel":"bg-white/80 backdrop-blur-md"}`}>
      <div className="flex h-14 items-center justify-between">
        <a href="#home" onClick={(e)=>{e.preventDefault();go("#home")}} className="text-xl font-bold tracking-tight">DK<span className="text-primary">.</span></a>
        <ul className="hidden items-center gap-1 md:flex">{navItems.map(i=><li key={i.href}><a href={i.href} onClick={(e)=>{e.preventDefault();go(i.href)}} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">{i.label}</a></li>)}</ul>
        <button onClick={()=>setOpen(!open)} className="rounded-lg p-2 md:hidden" aria-label="Abrir menu">{open?<X/>:<Menu/>}</button>
      </div>
    </div>
    <AnimatePresence>{open&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="section-container mt-2 md:hidden"><div className="glass-panel rounded-2xl p-2">{navItems.map(i=><a key={i.href} href={i.href} onClick={(e)=>{e.preventDefault();go(i.href)}} className="block rounded-xl px-4 py-3 font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">{i.label}</a>)}</div></motion.div>}</AnimatePresence>
  </motion.nav>
};
export default Navbar;
