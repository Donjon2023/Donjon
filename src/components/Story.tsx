import { motion } from "framer-motion";

interface StoryProps {
  content: string;
}

export function Story({ content }: StoryProps) {
  return (
    <section id="story" className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
            <img src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/left.png" alt="" className="h-6 md:h-10 object-contain" referrerPolicy="no-referrer" />
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-[0.3em] m-0">列传 · 风叶寄远</h2>
            <img src="https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/right.png" alt="" className="h-6 md:h-10 object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-2xl relative">
            {/* Ancient style corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/20" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/20" />

            <p className="text-white/70 text-lg leading-relaxed font-serif first-letter:text-4xl first-letter:mr-2 first-letter:float-left whitespace-pre-line">
              {content}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
