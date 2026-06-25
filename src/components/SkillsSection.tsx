import { useState } from "react";
import { motion } from "motion/react";
import { 
  FileCode, Flame, Cpu, Grid, Globe, Zap, Layers, Compass, 
  Database, Shield, Code2, FileJson, Container, GitBranch 
} from "lucide-react";
import { SKILL_CATEGORIES } from "../data.ts";

const ICON_MAP: Record<string, any> = {
  FileCode: FileCode,
  Flame: Flame,
  Cpu: Cpu,
  Grid: Grid,
  Globe: Globe,
  Zap: Zap,
  Layers: Layers,
  Compass: Compass,
  Database: Database,
  Shield: Shield,
  Code2: Code2,
  FileJson: FileJson,
  Container: Container,
  GitBranch: GitBranch,
};

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-claude-border bg-claude-bg/50 relative overflow-hidden">
      {/* Visual background drift arcs */}
      <div className="absolute top-1/2 left-0 -z-10 h-[300px] w-[200px] rounded-full bg-claude-accent/5 blur-3xl animate-warm-drift-1"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-claude-border bg-claude-paper px-3 py-1 text-[10px] font-mono text-claude-accent font-semibold mb-3">
              <span>TECHNICAL_COMPILATION_MATRIX</span>
            </div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-claude-dark sm:text-4xl">
              Skills & Expertise Matrix
            </h2>
          </div>
          <p className="text-claude-muted text-sm max-w-md font-sans font-medium leading-relaxed">
            A meticulous breakdown of Core ML architectures, generative AI toolsets, and modern software engineering languages backed by academic and production hours.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-claude-border bg-claude-paper p-6 flex flex-col justify-between hover:border-claude-accent transition-all duration-300 relative group shadow-sm"
            >
              {/* Card top flare decoration */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-claude-accent/20 to-transparent"></div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-claude-dark mb-6 flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-[9px] font-mono font-bold text-claude-muted group-hover:text-claude-accent transition-colors">
                    MODULE_0{catIdx + 1}
                  </span>
                </h3>

                <div className="space-y-5">
                  {category.skills.map((skill, skillIdx) => {
                    const IconComponent = ICON_MAP[skill.icon] || Cpu;
                    
                    return (
                      <div
                        key={skillIdx}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="space-y-2 group/skill"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2 text-[#403f3a] group-hover/skill:text-claude-dark transition-colors">
                            <IconComponent className="h-4 w-4 text-claude-accent group-hover/skill:text-[#b54c35] transition-all" />
                            <span className="font-semibold">{skill.name}</span>
                          </div>
                          <span className="text-claude-muted font-bold group-hover/skill:text-claude-accent transition-colors">
                            {skill.proficiency}%
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="h-1.5 w-full bg-claude-bg rounded-full overflow-hidden border border-claude-border/60 relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIdx * 0.05 + catIdx * 0.1 }}
                            className="h-full bg-claude-accent rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extra technical footer line inside card */}
              <div className="mt-8 pt-4 border-t border-claude-border flex items-center justify-between text-[9px] font-mono text-claude-muted font-semibold">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  STABLE_DEPLOYMENT
                </span>
                <span>SYSTEM_V1.2</span>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Dynamic Interactive Panel showcasing some info on hover */}
        <div className="mt-8 rounded-xl border border-claude-border bg-claude-paper px-5 py-4 font-mono text-xs text-claude-muted flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-claude-accent animate-pulse-ring"></span>
            <span>Hovering over skills unlocks specific parameters.</span>
          </div>
          <div className="text-[10px] text-claude-accent font-bold">
            {hoveredSkill ? (
              <span>Focused Skill: <strong className="text-claude-dark font-semibold">{hoveredSkill}</strong> • Active profiling pipeline.</span>
            ) : (
              <span>System idling. Ready to analyze.</span>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
