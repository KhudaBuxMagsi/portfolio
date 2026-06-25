import { Cpu, Github, Linkedin, Mail } from "lucide-react";
import { DEV_INFO } from "../data.ts";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-claude-border bg-claude-bg/50 py-12 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-claude-border pb-10">
          
          {/* Left Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center rounded bg-claude-paper border border-claude-border text-claude-accent shadow-sm">
              <Cpu className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-semibold tracking-tight text-claude-dark uppercase">
                KHUDA BUX
              </span>
              <span className="font-mono text-[9px] tracking-wider text-claude-muted uppercase font-bold">
                {DEV_INFO.title}
              </span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href={DEV_INFO.github}
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-xs text-claude-muted hover:text-claude-accent transition-colors flex items-center gap-1 font-mono font-bold"
            >
              <Github className="h-4 w-4" />
              <span>[ GitHub ]</span>
            </a>
            <a
              href={DEV_INFO.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-xs text-claude-muted hover:text-claude-accent transition-colors flex items-center gap-1 font-mono font-bold"
            >
              <Linkedin className="h-4 w-4" />
              <span>[ LinkedIn ]</span>
            </a>
            <a
              href={`mailto:${DEV_INFO.email}`}
              className="text-xs text-claude-muted hover:text-claude-accent transition-colors flex items-center gap-1 font-mono font-bold"
            >
              <Mail className="h-4 w-4" />
              <span>[ Email ]</span>
            </a>
          </div>

        </div>

        {/* Legal & SEO Details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[9px] font-mono text-claude-muted font-bold">
          <div className="flex items-center gap-1">
            <span>© {currentYear} Khuda Bux. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-claude-muted">SMIU ALUMNUS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
