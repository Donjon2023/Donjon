import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "缘起", href: "#hero" },
  { name: "列传", href: "#story" },
  { name: "演员", href: "#cast" },
  { name: "花絮", href: "#bts" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-6 left-6 z-50"
      >
        <img 
          src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/logo.png" 
          alt="Logo" 
          className="h-8 md:h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
      >
      <div className={`
        flex items-center justify-center gap-12 md:gap-16 px-10 py-4 rounded-full
        backdrop-blur-md border border-white/10 transition-all duration-300
        ${isScrolled ? "bg-black/60 shadow-2xl" : "bg-white/5"}
      `}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-[0.3em] md:tracking-[0.5em]"
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
    </>
  );
}
