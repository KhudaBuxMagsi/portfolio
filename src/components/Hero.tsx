import { motion } from "motion/react";
import { ArrowRight, Bot, Cpu, Terminal, GraduationCap, MapPin } from "lucide-react";
import { DEV_INFO } from "../data.ts";

interface HeroProps {
  onSearchFocus: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onSearchFocus, onOpenChat }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
      
      {/* Moving / drifting background elements under standard container */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-claude-accent/5 via-[#ebd4cc]/15 to-[#d1cfc4]/5 blur-3xl animate-warm-drift-1"></div>
      <div className="absolute bottom-10 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-[#cc5a42]/5 blur-2xl animate-warm-drift-2"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            
            {/* Status Indicator Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex max-w-max items-center gap-2 rounded border border-claude-border bg-claude-paper px-3.5 py-1.5 text-xs text-claude-dark font-medium shadow-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono tracking-wider text-[9px] text-claude-muted uppercase font-semibold">AVAILABLE FOR COLLABORATION</span>
            </motion.div>
 
            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl font-semibold tracking-tight text-claude-dark sm:text-5xl md:text-6xl leading-tight"
              >
                <span className="block text-claude-accent text-sm font-mono tracking-widest mb-3 font-semibold uppercase">
                  Khuda Bux
                </span>
                <span className="block">
                  Crafting Intelligent Systems
                </span>
                <span className="block italic text-claude-accent font-light">
                  and LLM Pipelines
                </span>
              </motion.h1>
 
              {/* Education Highlights & Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-5"
              >
                <p className="text-[#3c3b36] text-sm sm:text-[15px] leading-relaxed font-sans max-w-2xl font-medium">
                  {DEV_INFO.bio}
                </p>
 
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center text-xs text-claude-muted font-mono">
                  <div className="flex items-center gap-2 bg-claude-paper border border-claude-border px-3.5 py-2 rounded-lg shadow-sm">
                    <GraduationCap className="h-4 w-4 text-claude-accent" />
                    <span>BS Computer Science, SMIU</span>
                  </div>
                  <div className="flex items-center gap-2 bg-claude-paper border border-claude-border px-3.5 py-2 rounded-lg shadow-sm">
                    <MapPin className="h-3.5 w-3.5 text-claude-accent" />
                    <span>{DEV_INFO.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>
 
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex items-center gap-2 rounded-lg bg-claude-dark hover:bg-claude-accent px-5 py-3 text-sm font-medium text-white shadow-sm transition-all cursor-pointer font-serif"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </a>
 
              <button
                onClick={onSearchFocus}
                className="flex items-center gap-2 rounded-lg border border-claude-border bg-claude-paper hover:border-claude-accent px-5 py-3 text-sm font-medium text-claude-dark hover:text-claude-accent shadow-sm transition-all cursor-pointer"
              >
                <Bot className="h-4 w-4 text-claude-accent" />
                Test AI Search
              </button>
 
              <button
                onClick={onOpenChat}
                className="flex items-center gap-1.5 text-xs text-claude-muted hover:text-claude-accent font-mono transition-colors py-2 px-1 cursor-pointer"
              >
                <span>[ ask_advisor.py ]</span>
              </button>
            </motion.div>
 
          </div>
 
          {/* Hero Right: ML Interactive Visualizer Panel (Claude style dark slate) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-xl border border-[#303030] bg-[#1c1c1b] p-4.5 font-mono text-xs text-slate-300 shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-10 rounded-t-xl border-b border-[#2d2d2c] bg-[#1c1c1b] px-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-claude-accent"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#403f3d]"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#323130]"></span>
                </div>
                <span className="text-[9px] text-[#8c8a82] font-semibold flex items-center gap-1">
                  <Terminal className="h-3 w-3 text-claude-accent" />
                  khudabux@smiu-node: ~
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              
              <div className="mt-8 space-y-3.5 pt-2 text-[11px] leading-relaxed">
                <div>
                  <span className="text-[#8c8a82]"># Initializing Claude Portfolio Agent</span>
                  <p className="text-claude-accent font-bold">
                    $ python -m portfolio.ml_models.train
                  </p>
                </div>
 
                <div className="space-y-1 text-slate-400 font-medium">
                  <p>[INFO] Accelerator: NVIDIA A100 Tensor Core</p>
                  <p>[INFO] Base: Llama-3-8B-Instruct (QLoRA adapters)</p>
                  <p>[INFO] Loaded custom SMIU prospectus corpus (15k QAs)</p>
                  <p>[INFO] Vector dimensions: 1536 (pgvector index)</p>
                </div>
 
                <div className="border-y border-[#2d2d2c] py-2.5 my-2 space-y-1.5">
                  <div className="flex justify-between text-slate-200 font-semibold">
                    <span>Epoch 3/3 | Training Run</span>
                    <span className="text-claude-accent">100% COMPLETE</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#2d2d2c] overflow-hidden border border-[#3d3d3b]">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-claude-accent to-[#e6a18e]"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-semibold">
                    <span>Rate: 2e-4</span>
                    <span>Loss: 0.0421</span>
                    <span>Accuracy: 95.8%</span>
                  </div>
                </div>
 
                <div className="space-y-1 font-medium">
                  <p className="text-emerald-400">✓ QLoRA adapter weights successfully merged</p>
                  <p className="text-emerald-400">✓ Inverted file index flat (IVFFlat) partitions live</p>
                  <p className="text-claude-accent">✓ Portfolio API pipeline listening on port 3000</p>
                </div>
 
                <div className="flex items-center gap-1.5 pt-1 text-claude-accent font-bold">
                  <span className="h-1.5 w-1.5 bg-claude-accent animate-pulse"></span>
                  <span>ready for queries_</span>
                </div>
              </div>
            </div>
          </motion.div>
 
        </div>
      </div>
    </section>
  );
}
