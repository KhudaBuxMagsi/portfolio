import { useState, useRef } from "react";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import SearchSection from "./components/SearchSection.tsx";
import SkillsSection from "./components/SkillsSection.tsx";
import ProjectsSection from "./components/ProjectsSection.tsx";
import EducationSection from "./components/EducationSection.tsx";
import ChatAssistant from "./components/ChatAssistant.tsx";
import Footer from "./components/Footer.tsx";
import { MessageSquareCode } from "lucide-react";
import { motion } from "motion/react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const focusSearch = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
      const inputEl = searchRef.current.querySelector("input");
      if (inputEl) {
        setTimeout(() => {
          inputEl.focus();
        }, 800);
      }
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-claude-accent/20 selection:text-claude-dark animate-drifting-bg">
      
      {/* Decorative vector background lines on top of the drifting gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e5e0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-70"></div>
      
      <Header 
        onOpenChat={() => setChatOpen(true)} 
        onSearchClick={focusSearch} 
      />
      
      <main className="relative">
        <Hero 
          onSearchFocus={focusSearch} 
          onOpenChat={() => setChatOpen(true)} 
        />
        
        <SearchSection searchRef={searchRef} />
        
        <ProjectsSection />
        
        <SkillsSection />
        
        <EducationSection />
      </main>

      <Footer />

      {/* Persistent Chat Assistant Sidebar */}
      <ChatAssistant 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
      />

      {/* Bottom Floating Quick Ask Trigger CTA */}
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(true)}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-claude-accent text-white shadow-lg shadow-claude-accent/20 hover:shadow-claude-accent/40 cursor-pointer border border-claude-accent/20"
          title="Open AI Chatbot"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-claude-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-claude-accent"></span>
          </span>
          <MessageSquareCode className="h-5 w-5" />
        </motion.button>
      </div>

      <Analytics />
    </div>
  );
}
