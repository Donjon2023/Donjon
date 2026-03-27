import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Cast } from "./components/Cast";
import { BehindTheScenes } from "./components/BehindTheScenes";
import { LeafParticles } from "./components/LeafParticles";
import { BGMPlayer } from "./components/BGMPlayer";
import { getStoryInfo } from "./services/geminiService";

interface Character {
  name: string;
  title: string;
  description: string;
}

interface StoryData {
  story: string;
  characters: Character[];
}

export default function App() {
  const [data, setData] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await getStoryInfo();
        setData(info);
      } catch (error) {
        console.error("Failed to fetch story info:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white/40 font-serif tracking-[0.5em] animate-pulse">
          载入中...
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen selection:bg-white/20 selection:text-white">
      <LeafParticles />
      <BGMPlayer />
      <Navbar />
      <Hero />
      
      {/* Independent Background Section */}
      <section className="relative w-full h-[50vh] md:h-[70vh] bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/jian.png" 
            alt="剑背景" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
        </div>
      </section>

      <Story content={data?.story || ""} />
      <Cast characters={data?.characters || []} />
      <div className="relative w-full">
        {/* Background Image for BTS and Footer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/L5Bq7N7f/bottom.png" 
            alt="底部背景" 
            className="w-full h-full object-cover object-bottom"
            referrerPolicy="no-referrer"
          />
          {/* Top gradient to blend with the black background above */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent" />
        </div>

        <div className="relative z-10">
          <BehindTheScenes />
          
          <footer className="py-12 px-6 text-center border-t border-white/5">
            <p className="text-white/20 text-xs tracking-widest uppercase mb-4">
              © 2026 古剑奇谭网络版衍生剧 · 风叶寄远
            </p>
            <div className="flex justify-center gap-6 text-white/40 text-xs font-serif">
              <span>官方网站</span>
              <span>隐私政策</span>
              <span>联系我们</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
