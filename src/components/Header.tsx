import { motion } from "motion/react";
import { Cpu, Github, Linkedin, Mail, MessageSquareCode } from "lucide-react";
import { DEV_INFO } from "../data.ts";

interface HeaderProps {
  onOpenChat: () => void;
  onSearchClick: () => void;
}

export default function Header({ onOpenChat, onSearchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-claude-border bg-claude-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-claude-paper border border-claude-border text-claude-accent shadow-sm">
            <Cpu className="h-4.5 w-4.5" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-claude-accent animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm font-bold tracking-tight text-claude-dark sm:text-base">
              Khuda Bux
            </span>
            <span className="font-mono text-[9px] font-semibold tracking-widest text-claude-muted sm:text-[10px]">
              AI / ML ENGINEER
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-sm font-medium text-claude-muted hover:text-claude-accent transition-colors cursor-pointer"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-sm font-medium text-claude-muted hover:text-claude-accent transition-colors cursor-pointer"
          >
            Skills
          </a>
          <a
            href="#smiu"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("smiu")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-sm font-medium text-claude-muted hover:text-claude-accent transition-colors cursor-pointer"
          >
            Education
          </a>
          <button 
            onClick={onSearchClick}
            className="text-sm font-medium text-claude-muted hover:text-claude-accent transition-colors cursor-pointer"
          >
            AI Search Engine
          </button>
        </nav>

        {/* Status and Actions */}
        <div className="flex items-center gap-3">
          {/* Active Badge */}
          <div className="flex items-center gap-2 rounded-full border border-claude-border bg-claude-paper px-3 py-1.5 text-xs font-semibold text-claude-muted">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="hidden sm:inline font-mono tracking-wider text-[9px]">AGENT_ONLINE</span>
            <span className="sm:hidden font-mono text-[9px]">ONLINE</span>
          </div>

          {/* Socials & Contact Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={DEV_INFO.github}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-claude-border bg-claude-paper text-claude-muted hover:border-claude-accent hover:text-claude-accent hover:shadow-sm transition-all"
              title="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={DEV_INFO.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-claude-border bg-claude-paper text-claude-muted hover:border-claude-accent hover:text-claude-accent hover:shadow-sm transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${DEV_INFO.email}`}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-claude-border bg-claude-paper text-claude-muted hover:border-claude-accent hover:text-claude-accent hover:shadow-sm transition-all"
              title="Email Contact"
            >
              <Mail className="h-4 w-4" />
            </a>

            {/* Chat Trigger CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenChat}
              className="flex h-8.5 items-center gap-1.5 rounded-lg bg-claude-accent hover:bg-[#b54c35] px-3.5 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
            >
              <MessageSquareCode className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-serif font-medium">Ask AI Assistant</span>
            </motion.button>
          </div>
        </div>

      </div>
    </header>
  );
}
