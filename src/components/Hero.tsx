import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60"
        >
          <source src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/headcc.mp4" type="video/mp4" />
        </video>
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <img
            src="https://i.postimg.cc/FHtk1xHc/feng-ye-ji-yuan.webp"
            alt="风叶寄远"
            className="max-w-[80vw] md:max-w-[600px] drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/80 text-lg md:text-xl font-serif tracking-[0.2em] mb-12"
        >
          《古剑奇谭网络版》衍生剧
        </motion.p>

        <motion.a
          href="https://www.bilibili.com/video/BV18ewNzpEV6/?spm_id_from=333.1387.homepage.video_card.click"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="group flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <Play className="w-6 h-6 text-white fill-white group-hover:scale-110 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
