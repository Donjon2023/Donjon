import { useState, useEffect, useRef } from 'react';
import { Disc } from 'lucide-react';
import { motion } from 'framer-motion';

export function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      if (userPausedRef.current) return;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay was blocked by browser
        setIsPlaying(false);
      });
    };

    // Attempt autoplay immediately
    tryPlay();

    // Fallback: play on first user interaction if autoplay was blocked
    const handleInteraction = () => {
      if (userPausedRef.current) return;
      if (audio.paused) {
        tryPlay();
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    // Listen for custom event to pause BGM when video plays
    const handlePauseBGM = () => {
      audio.pause();
      setIsPlaying(false);
      userPausedRef.current = true; // Require manual resume after video plays
    };

    window.addEventListener('pause-bgm', handlePauseBGM);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('pause-bgm', handlePauseBGM);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        userPausedRef.current = true;
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        userPausedRef.current = false;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-6 right-6 z-50"
    >
      <button
        onClick={togglePlay}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/60 transition-all"
        title={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
      >
        <Disc className={`w-5 h-5 md:w-6 md:h-6 ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
      </button>
      <audio
        ref={audioRef}
        src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/bgm.m4a"
        loop
      />
    </motion.div>
  );
}
