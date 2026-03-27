import { motion } from "framer-motion";
import { Play } from "lucide-react";
import React, { useState, useRef } from "react";

export function BehindTheScenes() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        window.dispatchEvent(new Event('pause-bgm'));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent play/pause toggle
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
      setProgress(pos * 100);
    }
  };

  return (
    <section id="bts" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
            <img src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/left.png" alt="" className="h-6 md:h-10 object-contain" referrerPolicy="no-referrer" />
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-[0.3em] m-0">花絮 · 定妆纪实</h2>
            <img src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/right.png" alt="" className="h-6 md:h-10 object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full md:w-[80%] mx-auto aspect-video bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl group cursor-pointer"
          onClick={togglePlay}
        >
          {/* Ancient style frame decorations */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <video
            ref={videoRef}
            playsInline
            loop
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => {
              setIsPlaying(true);
              window.dispatchEvent(new Event('pause-bgm'));
            }}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/huaxuc.mp4" type="video/mp4" />
          </video>

          {/* Progress Bar */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 cursor-pointer group/progress z-30"
            onClick={handleSeek}
          >
            <div 
              className="absolute top-0 left-0 bottom-0 bg-white/80 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
            {/* Hover thicker area for easier clicking */}
            <div className="absolute bottom-0 left-0 right-0 h-4 -translate-y-1/2" />
          </div>

          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 backdrop-blur-sm transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
              <p className="text-white/60 text-sm tracking-[0.5em] uppercase font-serif">点击播放花絮</p>
            </div>
          )}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm italic font-serif">
            “风叶寄远，情深意重。定妆花絮持续更新中，敬请期待。”
          </p>
        </div>
      </div>
    </section>
  );
}
