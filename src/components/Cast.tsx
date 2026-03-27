import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const charactersData = [
  {
    name: "辰溪长老",
    title: "神一道天宗圣宫核心长老",
    description: "神一道天宗圣宫核心长老，气质温雅心思缜密，深受李令双信赖，主管宗门大小事务。出身潇湘榭，凭才干快速身居高位，为人稳重守礼，和崔远之有着很深的私怨隔阂。",
    poster: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/chenxi.jpeg",
    gameImg: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/game-chenxi.png"
  },
  {
    name: "寄身相・隐",
    title: "上古妖王相柳神魂分身",
    description: "上古妖王相柳临死前分裂出的神魂分身，擅长隐匿行踪、潜藏意识。悄悄寄宿侵蚀凡人与修士心智，静待所有分身融合，以此完成相柳复活的谋划，是暗中潜藏的巨大危机。",
    poster: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/yin.jpg",
    gameImg: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/game-yin.png"
  },
  {
    name: "大妖・煌羽",
    title: "上古大妖",
    description: "实力强横的上古大妖，相柳麾下顶尖战力。曾进犯太华山被长久封印，破封后再度作乱，性情狡诈凶悍，勾结邪势力搅动纷争，是主线关键反派角色。",
    poster: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/huangyu.jpeg",
    gameImg: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/game-huangyu.png"
  },
  {
    name: "天机令主・崔远之",
    title: "天机九宸首席掌权人",
    description: "博陵崔氏出身，天机九宸首席掌权人。外表随性不羁，实则城府极深、杀伐果决，野心外露行事不拘常理。与辰溪矛盾尖锐，立场复杂，暗中周旋助力李令双。",
    poster: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/yuanzhi.jpeg",
    gameImg: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/game-yuanzhi.png"
  },
  {
    name: "镇国游仙公主・李令双",
    title: "神一道天代盟主",
    description: "当朝镇国游仙公主，夏夷则之女，兼任神一道天代盟主。年少肩负重任，兼具皇族威仪与修仙道行，身处家庭纠葛、朝堂与仙门纷争之中，心怀苍生坚守正道大局。",
    poster: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/lingshuang.jpg",
    gameImg: "https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/game-lingshuang.png"
  }
];

export function Cast() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <section id="cast" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[40vw] font-serif leading-none whitespace-nowrap">风叶寄远</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
            <img src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/left.png" alt="" className="h-6 md:h-10 object-contain" referrerPolicy="no-referrer" />
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-[0.3em] m-0">演员 · 众生相</h2>
            <img src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/right.png" alt="" className="h-6 md:h-10 object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>

        {/* Accordion Container */}
        <div className="flex flex-col md:flex-row h-[800px] md:h-[600px] gap-2 md:gap-4 w-full">
          {charactersData.map((char, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={char.name}
                layout
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative overflow-hidden cursor-pointer group transition-all duration-500 ease-in-out",
                  "rounded-sm md:rounded-tl-3xl md:rounded-br-3xl border border-white/10",
                  isActive ? "flex-[4] md:flex-[5]" : "flex-1"
                )}
              >
                {/* Background Poster */}
                <img
                  src={char.poster}
                  alt={char.name}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700",
                    isActive ? "scale-100" : "scale-110 grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105"
                  )}
                  referrerPolicy="no-referrer"
                />

                {/* Hover Edge Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />

                {/* Gradient Overlay */}
                <div className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  isActive 
                    ? "bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/60 to-transparent" 
                    : "bg-black/40 group-hover:bg-black/20"
                )} />

                {/* Expanded State Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 md:top-0 md:bottom-0 md:right-auto md:w-1/2 p-6 md:p-10 flex flex-col justify-end md:justify-center"
                    >
                      <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2">{char.title}</p>
                      <h3 className="text-3xl md:text-5xl font-serif text-white tracking-wider mb-6 drop-shadow-lg">{char.name}</h3>
                      
                      <div className="w-12 h-px bg-white/40 mb-6" />
                      
                      <p className="text-white/80 text-sm md:text-base leading-relaxed font-serif italic mb-8 drop-shadow-md">
                        {char.description}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFullscreenImage(char.gameImg);
                        }}
                        className="flex items-center gap-2 w-fit px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-sm transition-colors group/btn"
                      >
                        <ImageIcon className="w-4 h-4 text-white/80 group-hover/btn:text-white" />
                        <span className="text-white/80 group-hover/btn:text-white text-sm tracking-widest font-serif">查看游戏设定</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12"
            onClick={() => setFullscreenImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
              onClick={() => setFullscreenImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={fullscreenImage}
              alt="游戏设定"
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
