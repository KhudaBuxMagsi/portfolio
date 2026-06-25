import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Send, Bot, Loader2, Sparkles, 
  RefreshCw 
} from "lucide-react";
import { SUGGESTED_QUESTIONS, PRESET_ANSWERS, DEV_INFO } from "../data.ts";

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export default function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: `Hi! I am the AI portfolio assistant for Khuda Bux. 📜

Ask me anything about his computer science background at SMIU, his enterprise RAG projects, ML modeling skillsets, or how to contact him.

How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach the conversational portfolio agent.");
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      
      // Fallback response from preset QA database
      const presetAnswer = PRESET_ANSWERS[textToSend];
      let answerText = "";
      
      if (presetAnswer) {
        answerText = presetAnswer;
      } else {
        // Find partial matches
        const queryLower = textToSend.toLowerCase();
        if (queryLower.includes("project") || queryLower.includes("rag") || queryLower.includes("neuro")) {
          answerText = PRESET_ANSWERS["Show LLM and RAG projects"];
        } else if (queryLower.includes("smiu") || queryLower.includes("university") || queryLower.includes("education")) {
          answerText = PRESET_ANSWERS["View computer science background"];
        } else if (queryLower.includes("skills") || queryLower.includes("stack") || queryLower.includes("python")) {
          answerText = PRESET_ANSWERS["What is his tech stack?"];
        } else if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("hire")) {
          answerText = PRESET_ANSWERS["How can I contact Khuda Bux?"];
        } else {
          answerText = `I hear you! In offline fallback mode, I can help you with these specific questions:
- "Show LLM and RAG projects"
- "View computer science background"
- "What is his tech stack?"
- "How can I contact Khuda Bux?"

Feel free to click any suggestion below or configure the Gemini API Key for dynamic model conversations!`;
        }
      }

      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: `Chat session refreshed. How can I assist you with Khuda Bux's portfolio today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#1c1b18]/40 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-claude-border bg-[#faf9f6] flex flex-col justify-between shadow-xl"
          >
            
            {/* Header */}
            <div className="p-4 border-b border-claude-border flex items-center justify-between bg-claude-paper">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded bg-claude-bg border border-claude-border text-claude-accent shadow-sm">
                  <Bot className="h-4 w-4" />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-white animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-claude-dark tracking-tight">
                    Portfolio Agent
                  </h3>
                  <p className="text-[9px] text-[#5c5a52] font-mono flex items-center gap-1 font-bold">
                    <Sparkles className="h-2.5 w-2.5 text-claude-accent" />
                    POWERED_BY_GEMINI
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChatHistory}
                  className="p-1.5 rounded text-claude-muted hover:text-claude-dark hover:bg-claude-bg transition-colors cursor-pointer"
                  title="Clear history"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded text-claude-muted hover:text-claude-dark hover:bg-claude-bg transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => {
                const isAssistant = m.role === "assistant";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${!isAssistant ? "justify-end" : ""}`}
                  >
                    {isAssistant && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-claude-paper border border-claude-border text-claude-accent shadow-xs">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}

                    <div className="flex flex-col max-w-[85%] space-y-1">
                      <div
                        className={`rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line border ${
                          isAssistant
                            ? "bg-claude-paper border-claude-border text-[#2c2b26] shadow-xs font-medium font-serif"
                            : "bg-claude-dark text-[#faf9f6] border-claude-dark shadow-xs font-sans font-medium"
                        }`}
                      >
                        {m.text}
                      </div>
                      <span
                        className={`text-[9px] font-mono font-bold text-claude-muted ${
                          !isAssistant ? "text-right" : ""
                        }`}
                      >
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-claude-paper border border-claude-border text-claude-accent shadow-xs">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className="rounded-lg px-3.5 py-2.5 bg-claude-bg border border-claude-border text-[9px] font-mono text-claude-accent font-bold flex items-center gap-1.5">
                    <span>AGENT_THINKING</span>
                    <span className="h-1.5 w-1.5 bg-claude-accent animate-pulse rounded-full"></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Form Controls */}
            <div className="p-4 border-t border-claude-border bg-claude-paper space-y-3">
              
              {/* Suggestion Quick Chips */}
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.slice(0, 3).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.question)}
                    disabled={loading}
                    className="rounded border border-claude-border hover:border-claude-accent bg-claude-bg px-2.5 py-1 text-[10px] text-[#5c5a52] hover:text-claude-accent font-semibold transition-all cursor-pointer shadow-xs"
                  >
                    {item.question}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                  placeholder="Ask about ML, RAG, or his degree..."
                  className="flex-1 rounded border border-claude-border bg-claude-bg px-3.5 py-2.5 text-xs text-claude-dark placeholder-[#8c8a82] focus:border-claude-accent focus:outline-none font-medium"
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={loading || !inputText.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded bg-claude-accent text-white hover:bg-[#b54c35] disabled:bg-[#deddd8] disabled:text-[#8c8a82] transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Direct links details */}
              <div className="flex items-center justify-between text-[9px] font-mono text-claude-muted font-bold">
                <span>HAVE A PROJECT PROPOSAL?</span>
                <a href={`mailto:${DEV_INFO.email}`} className="text-claude-accent hover:underline">
                  LET'S CONNECT
                </a>
              </div>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
