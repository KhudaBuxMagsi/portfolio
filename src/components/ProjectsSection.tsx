import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, ExternalLink, Activity, Network, Sparkles, 
  ChevronRight, Terminal, Cpu, Database, Search, 
  MessageSquare, Play, RefreshCw, CheckCircle, Lightbulb
} from "lucide-react";
import { PROJECTS, Project } from "../data.ts";

export default function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [showArch, setShowArch] = useState(true);
  
  // Simulation states
  const [simQuery, setSimQuery] = useState("");
  const [simLoading, setSimLoading] = useState(false);
  const [simOutput, setSimOutput] = useState<any>(null);

  const activeProject = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];

  // Simulated playground logic for projects
  const runSimulation = () => {
    if (simLoading) return;
    setSimLoading(true);
    setSimOutput(null);

    setTimeout(() => {
      setSimLoading(false);
      if (activeProject.id === "neurosearch-rag") {
        const queryVal = simQuery.trim() || "What is SMIU's ranking?";
        setSimOutput({
          status: "SUCCESS",
          retrievedNodes: [
            { id: "node_772", relevance: 0.948, text: "Sindh Madressatul Islam University (SMIU) is a chartered university in Karachi established in 1885..." },
            { id: "node_114", relevance: 0.812, text: "SMIU is recognized by the HEC and is historically legendary as the school of Quaid-e-Azam..." }
          ],
          rrfScore: 0.985,
          cohereRerankScore: 0.992,
          inferenceTime: "84ms",
          answer: `Based on your query "${queryVal}", the hybrid dense-sparse vector query matched 2 nodes in pgvector with Reciprocal Rank Fusion (RRF) and Cohere Rerank. Grounded generation synthesized: Khuda Bux is a proud graduate of SMIU (BS CS, 2020-2024), a highly respected historic university located in Karachi.`
        });
      } else if (activeProject.id === "smiu-campus-bot") {
        const queryVal = simQuery.trim() || "When are the admissions open?";
        setSimOutput({
          status: "SUCCESS",
          model: "Llama-3-8B-Instruct (4-bit QLoRA)",
          contextTokenCount: 1536,
          generationSpeed: "42.8 tokens/sec",
          answer: `[SMIU Advisor Bot]: Admissions for Sindh Madressatul Islam University (SMIU) traditionally open for the Fall semester in June/July and for the Spring semester in November. For specialized BS Computer Science prerequisites, candidates must have completed intermediate Pre-Engineering or equivalent with at least 50% marks.`
        });
      } else {
        // vision traffic agent
        setSimOutput({
          status: "SUCCESS",
          detectedClasses: { "SUV": 5, "Sedan": 8, "Motorcycle": 12, "Pedestrian": 2 },
          averageWaitTime: "12.4 seconds (Reduced by 34%)",
          fps: "86 FPS (Edge Optimized)",
          action: "Switching traffic light state to Green on Lane 3 (High Queue Density Detected)"
        });
      }
    }, 1200);
  };

  return (
    <section id="projects" className="py-20 sm:py-28 border-t border-claude-border bg-claude-bg/50 relative">
      {/* Soft color highlights */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-claude-accent/5 to-transparent blur-3xl animate-warm-drift-1"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-claude-border bg-claude-paper px-3.5 py-1 text-[10px] font-mono text-claude-accent font-semibold mb-3">
              <Terminal className="h-3 w-3 text-claude-accent animate-pulse" />
              <span>ACTIVE MODEL INFERENCE & WORKFLOW SIMULATOR</span>
            </div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-claude-dark sm:text-4xl">
              Featured Case Studies
            </h2>
          </div>
          <p className="text-claude-muted text-sm max-w-md font-sans font-medium leading-relaxed">
            Click on any case study below to deploy and test the interactive simulator, inspect its architectural schemas, and view custom fine-tuning run metrics.
          </p>
        </div>

        {/* Project Selector Tab Pills */}
        <div className="flex flex-wrap gap-2.5 mb-8 justify-start">
          {PROJECTS.map((project) => {
            const isActive = project.id === activeProjectId;
            return (
              <button
                key={project.id}
                onClick={() => {
                  setActiveProjectId(project.id);
                  setSimQuery("");
                  setSimOutput(null);
                  setSimLoading(false);
                }}
                className={`relative px-5 py-3 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer shadow-sm border ${
                  isActive
                    ? "bg-claude-dark text-white border-claude-dark"
                    : "bg-claude-paper text-claude-muted hover:text-claude-dark border-claude-border hover:border-claude-accent"
                }`}
              >
                <Cpu className={`h-3.5 w-3.5 ${isActive ? "text-claude-accent animate-pulse" : "text-claude-muted"}`} />
                <span>{project.title}</span>
                {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-claude-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-claude-accent"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          
          {/* Left Panel: Selected Project Specs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Specs Card */}
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-claude-border bg-claude-paper p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden rounded-xl shadow-sm"
            >
              {/* Background accent block */}
              <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-claude-accent/5 to-transparent rounded-bl-full pointer-events-none"></div>

              <div className="space-y-6">
                
                {/* Meta details header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-claude-border pb-4">
                  <span className="inline-flex items-center gap-1.5 rounded bg-claude-bg border border-claude-border px-3 py-1 text-[10px] font-mono font-semibold text-[#5c5a52] uppercase">
                    {activeProject.category}
                  </span>
                  
                  {/* Static metrics cards */}
                  <div className="flex flex-wrap gap-2">
                    {activeProject.metrics.map((metric, idx) => (
                      <div 
                        key={idx}
                        className="flex flex-col items-end bg-claude-bg border border-claude-border rounded-lg px-2.5 py-1 text-right shadow-sm"
                      >
                        <span className="text-[8px] font-mono font-semibold text-claude-muted uppercase tracking-wider">{metric.label}</span>
                        <span className="text-xs font-mono font-bold text-claude-dark">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content body */}
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-semibold text-claude-dark tracking-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm text-[#403f3a] font-sans leading-relaxed font-medium">
                    {activeProject.longDesc}
                  </p>
                </div>

                {/* Tag chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-claude-bg border border-claude-border px-2.5 py-1 text-[10px] font-mono text-[#5c5a52] font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-8 border-t border-claude-border">
                <div className="flex items-center gap-4">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex items-center gap-1.5 text-xs text-claude-muted hover:text-claude-accent font-mono font-semibold transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span>[ code_repository ]</span>
                    </a>
                  )}
                  {activeProject.demoUrl && (
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex items-center gap-1.5 text-xs text-claude-accent hover:text-[#b54c35] font-mono font-semibold transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>[ live_deployment ]</span>
                    </a>
                  )}
                </div>

                {/* Switch between diagrams & playground */}
                <div className="flex items-center gap-1 bg-claude-bg p-0.5 rounded-lg border border-claude-border shadow-sm">
                  <button
                    onClick={() => setShowArch(true)}
                    className={`px-2.5 py-1.5 text-[10px] font-mono font-bold rounded-md transition-all cursor-pointer ${
                      showArch 
                        ? "bg-claude-dark text-white" 
                        : "text-claude-muted hover:text-claude-dark"
                    }`}
                  >
                    Flow
                  </button>
                  <button
                    onClick={() => setShowArch(false)}
                    className={`px-2.5 py-1.5 text-[10px] font-mono font-bold rounded-md transition-all cursor-pointer ${
                      !showArch 
                        ? "bg-claude-dark text-white" 
                        : "text-claude-muted hover:text-claude-dark"
                    }`}
                  >
                    Playground
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Panel: Interactive Flow or Simulated Execution */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="border border-claude-border bg-claude-paper p-6 flex-1 flex flex-col justify-between relative overflow-hidden rounded-xl shadow-sm h-full">
              
              <div className="flex items-center justify-between border-b border-claude-border pb-3.5 mb-4">
                <span className="text-[10px] font-mono text-claude-muted font-bold flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-claude-accent" />
                  {showArch ? "SYSTEM ARCHITECTURAL LAYERS" : "INFERENCE INTERACTIVE TERMINAL"}
                </span>
                <span className="text-[9px] font-mono text-claude-accent font-bold bg-claude-bg px-2 py-0.5 rounded border border-claude-border">
                  {showArch ? "SCHEMATIC" : "SANDBOX"}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {showArch ? (
                  /* Schematic Flow diagram */
                  <motion.div
                    key="flow-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 flex-1 flex flex-col justify-center"
                  >
                    <div className="border border-claude-border rounded-lg bg-claude-bg/50 p-3.5 space-y-3 font-mono text-[10px] text-claude-muted shadow-inner max-h-[340px] overflow-y-auto">
                      
                      {activeProject.architecture.diagramData.map((node, nIdx) => (
                        <div key={nIdx} className="flex items-center gap-2 group">
                          <span className="bg-claude-paper border border-claude-border rounded px-2 py-1.5 text-claude-dark shrink-0 font-sans font-medium text-[10.5px] max-w-[130px] truncate shadow-sm group-hover:border-claude-accent transition-colors">
                            {node.source}
                          </span>
                          <ChevronRight className="h-3 w-3 text-claude-accent shrink-0" />
                          <div className="flex-1 flex flex-col min-w-0">
                            <span className="text-claude-muted text-[8px] font-bold italic truncate uppercase tracking-tight">{node.label}</span>
                            <span className="bg-claude-paper border border-claude-accent/30 rounded px-2 py-1 text-claude-accent font-sans font-medium text-[10.5px] truncate shadow-sm">
                              {node.target}
                            </span>
                          </div>
                        </div>
                      ))}

                    </div>
                  </motion.div>
                ) : (
                  /* Sandbox simulation terminal */
                  <motion.div
                    key="playground-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      <div className="bg-[#1c1c1b] text-slate-100 rounded-lg p-4 font-mono text-[11px] leading-relaxed shadow-inner">
                        <div className="flex items-center gap-1.5 text-slate-400 border-b border-[#2d2d2c] pb-2 mb-3 font-bold text-[9px]">
                          <Terminal className="h-3.5 w-3.5 text-claude-accent animate-pulse" />
                          <span>SANDBOX_SESSION@K_BUX</span>
                        </div>

                        {activeProject.id === "neurosearch-rag" && (
                          <div className="space-y-3">
                            <p className="text-slate-400">// Submit a query to trigger dense embedding retrieval</p>
                            <div className="flex items-center gap-2 bg-[#141413] rounded-lg p-2 border border-[#2d2d2c]">
                              <Search className="h-4 w-4 text-claude-accent" />
                              <input
                                type="text"
                                value={simQuery}
                                onChange={(e) => setSimQuery(e.target.value)}
                                placeholder="What is SMIU's history?"
                                className="bg-transparent focus:outline-none w-full text-white placeholder-slate-600 text-xs font-mono"
                              />
                            </div>
                            <button
                              onClick={runSimulation}
                              disabled={simLoading}
                              className="w-full bg-claude-accent hover:bg-[#b54c35] text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                              {simLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                              <span>EXECUTE VECTOR RETRIEVAL</span>
                            </button>
                          </div>
                        )}

                        {activeProject.id === "smiu-campus-bot" && (
                          <div className="space-y-3">
                            <p className="text-slate-400">// Chat with Llama-3 campus student advisor model</p>
                            <div className="flex items-center gap-2 bg-[#141413] rounded-lg p-2 border border-[#2d2d2c]">
                              <MessageSquare className="h-4 w-4 text-[#e6a18e]" />
                              <input
                                type="text"
                                value={simQuery}
                                onChange={(e) => setSimQuery(e.target.value)}
                                placeholder="Are there scholarship options?"
                                className="bg-transparent focus:outline-none w-full text-white placeholder-slate-600 text-xs font-mono"
                              />
                            </div>
                            <button
                              onClick={runSimulation}
                              disabled={simLoading}
                              className="w-full bg-[#3e3d3b] hover:bg-[#4d4c4a] text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                              {simLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                              <span>STREAM LLAMA ADVISOR TOKENS</span>
                            </button>
                          </div>
                        )}

                        {activeProject.id === "vision-traffic-agent" && (
                          <div className="space-y-3">
                            <p className="text-slate-400">// Adjust surveillance camera lane priority feeds</p>
                            <div className="grid grid-cols-2 gap-2 text-[10px] text-center font-bold">
                              <div className="bg-[#141413] p-2.5 rounded border border-[#2d2d2c]">
                                <p className="text-slate-500">LANE_1_COUNT</p>
                                <p className="text-claude-accent text-xs">14 (Sedans)</p>
                              </div>
                              <div className="bg-[#141413] p-2.5 rounded border border-[#2d2d2c]">
                                <p className="text-slate-500">LANE_2_COUNT</p>
                                <p className="text-[#e6a18e] text-xs">8 (SUV / Bus)</p>
                              </div>
                            </div>
                            <button
                              onClick={runSimulation}
                              disabled={simLoading}
                              className="w-full bg-claude-accent hover:bg-[#b54c35] text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                              {simLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                              <span>EVALUATE DEEP Q-LEARNING REWARD</span>
                            </button>
                          </div>
                        )}

                      </div>

                      {/* Display Simulation Results */}
                      <AnimatePresence>
                        {simOutput && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#eaf6f0] border border-[#d3ecd9] text-[#2b7a4b] text-xs rounded-lg p-4 space-y-2.5 font-sans"
                          >
                            <div className="flex items-center gap-1.5 text-[#2b7a4b] font-bold font-mono text-[9px]">
                              <CheckCircle className="h-4 w-4 text-[#2b7a4b] shrink-0" />
                              <span>PIPELINE_RUN_SUCCESS</span>
                            </div>
                            
                            {activeProject.id === "neurosearch-rag" && (
                              <div className="space-y-2 font-medium">
                                <p className="text-[11px] text-[#2c2b26] bg-white border border-[#d3ecd9] p-2.5 rounded-lg leading-relaxed font-serif">{simOutput.answer}</p>
                                <div className="grid grid-cols-2 gap-2 font-mono text-[9px] text-[#2b7a4b]/80">
                                  <span>Vectors: pgvector cosine</span>
                                  <span>Latency: {simOutput.inferenceTime}</span>
                                </div>
                              </div>
                            )}

                            {activeProject.id === "smiu-campus-bot" && (
                              <div className="space-y-2 font-medium">
                                <p className="text-[11px] text-[#2c2b26] bg-white border border-[#d3ecd9] p-2.5 rounded-lg leading-relaxed font-serif">{simOutput.answer}</p>
                                <div className="grid grid-cols-2 gap-2 font-mono text-[9px] text-[#2b7a4b]/80">
                                  <span>Speed: {simOutput.generationSpeed}</span>
                                  <span>Context: {simOutput.contextTokenCount} tokens</span>
                                </div>
                              </div>
                            )}

                            {activeProject.id === "vision-traffic-agent" && (
                              <div className="space-y-2 font-medium">
                                <div className="bg-white border border-[#d3ecd9] p-2.5 rounded-lg text-[11px] text-[#2c2b26] space-y-1 font-serif">
                                  <p className="font-semibold text-slate-950">Decision: {simOutput.action}</p>
                                  <p>Wait reduction: {simOutput.averageWaitTime}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 font-mono text-[9px] text-[#2b7a4b]/80">
                                  <span>Inference: {simOutput.fps}</span>
                                  <span>Model: YOLOv8 + ByteTrack</span>
                                </div>
                              </div>
                            )}

                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 pt-3.5 border-t border-claude-border text-[9px] font-mono text-claude-muted flex items-center justify-between font-bold">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  SANDBOX ENVIRONMENT
                </span>
                <span className="flex items-center gap-1">
                  <Lightbulb className="h-3 w-3 text-claude-accent animate-pulse" />
                  <span>Try toggling "Playground"!</span>
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
