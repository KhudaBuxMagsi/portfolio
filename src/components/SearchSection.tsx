import { useState, useRef, useEffect, RefObject } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Loader2, Sparkles, CornerDownLeft, X, Database, Check } from "lucide-react";
import { SUGGESTED_QUESTIONS, PRESET_ANSWERS } from "../data.ts";

interface SearchSectionProps {
  searchRef: RefObject<HTMLDivElement | null>;
}

export default function SearchSection({ searchRef }: SearchSectionProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ answer: string; sources: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to query the portfolio search engine.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      const presetAnswer = PRESET_ANSWERS[searchQuery];
      if (presetAnswer) {
        setResult({
          answer: presetAnswer,
          sources: ["Local Dossier (Fallback Memory Store)"],
        });
      } else {
        setError(err.message || "An unexpected error occurred while querying the semantic model.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResult(null);
    setError(null);
  };

  return (
    <section ref={searchRef} id="ai-search" className="py-16 sm:py-24 border-t border-claude-border bg-claude-bg/50 relative">
      <div className="absolute top-0 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-claude-accent/5 blur-3xl animate-warm-drift-1"></div>
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-claude-border bg-claude-paper px-3.5 py-1 text-[10px] font-mono text-claude-accent font-semibold mb-3">
            <Sparkles className="h-3 w-3 text-claude-accent animate-pulse" />
            <span>SEMANTIC_EMBEDDING_RETRIEVAL</span>
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-claude-dark sm:text-4xl">
            Portfolio RAG Search Engine
          </h2>
          <p className="mt-3 text-sm text-[#5c5a52] max-w-2xl mx-auto font-medium leading-relaxed">
            Query Khuda Bux's resume, academic history, project details, and code architectures using an LLM search agent powered by Gemini.
          </p>
        </div>

        {/* LLM Search Input with Claude Design */}
        <div className="relative rounded-xl border border-claude-border bg-claude-paper p-1.5 shadow-sm transition-all duration-300 focus-within:border-claude-accent focus-within:shadow-md">
          <div className="flex items-center gap-3 px-3">
            <Search className="h-5 w-5 text-claude-muted flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              placeholder="Ask anything (e.g., 'What is his experience with PyTorch?', 'Show his RAG projects')..."
              className="w-full bg-transparent py-3.5 text-sm text-claude-dark placeholder-claude-muted/60 focus:outline-none font-sans font-medium"
            />
            
            {query && (
              <button
                onClick={clearSearch}
                className="p-1 rounded-md hover:bg-claude-bg text-claude-muted hover:text-claude-dark transition-colors"
                title="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={() => handleSearch(query)}
              disabled={loading || !query.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-claude-accent hover:bg-[#b54c35] disabled:bg-claude-border disabled:text-claude-muted text-white px-4 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline font-serif font-medium">Search</span>
                  <CornerDownLeft className="h-3 w-3" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Floating Suggestion Pills with Glassmorphism */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[10px] font-mono font-bold text-claude-muted mr-1.5">QUICK QUERIES:</span>
          {SUGGESTED_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(item.question)}
              disabled={loading}
              className="rounded-full border border-claude-border bg-claude-paper/80 px-3.5 py-1.5 text-xs text-claude-muted font-medium shadow-sm hover:border-claude-accent hover:bg-claude-paper hover:text-claude-accent hover:shadow-md transition-all cursor-pointer"
            >
              {item.question}
            </button>
          ))}
        </div>

        {/* Search Results Display */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-claude-border bg-claude-paper p-8 text-center shadow-sm"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full border-2 border-claude-accent/20 border-t-claude-accent animate-spin"></div>
                    <Database className="h-4 w-4 text-claude-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <span className="font-mono text-xs text-claude-accent font-bold tracking-wider">GENERATING ANSWER FROM PORTFOLIO DB...</span>
                  <p className="text-xs text-[#5c5a52] font-medium font-serif">Query embedding vector matched, synthesizing response via Gemini API.</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-red-200 bg-red-50/50 p-5 text-sm text-red-600 flex items-start gap-3 shadow-sm"
              >
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center border border-red-200 flex-shrink-0 text-red-600 font-bold">!</div>
                <div>
                  <p className="font-semibold text-red-800 font-serif">Retrieval Error</p>
                  <p className="mt-1 text-xs text-red-600/80">{error}</p>
                </div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="result-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-claude-border bg-claude-paper p-6 sm:p-8 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-claude-border pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-claude-bg border border-claude-border text-claude-accent shadow-sm">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-claude-dark tracking-wider font-mono">SYNTHESIS GENERATED RESPONSE</h4>
                      <p className="text-[10px] text-claude-muted font-mono font-semibold">Model: gemini-3.5-flash • Temperature: 0.2</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded bg-[#eaf6f0] border border-[#d3ecd9] px-2.5 py-1 text-[10px] font-mono text-[#2b7a4b] font-bold">
                    <Check className="h-3 w-3" />
                    <span>GROUNDED</span>
                  </div>
                </div>

                <div className="text-[14.5px] leading-relaxed text-[#2c2b26] font-serif space-y-3 whitespace-pre-line antialiased">
                  {result.answer}
                </div>

                {result.sources && result.sources.length > 0 && (
                  <div className="mt-6 border-t border-claude-border pt-4">
                    <h5 className="text-[10px] font-bold text-claude-muted tracking-wider font-mono uppercase mb-2">
                      Cited Context Sources
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {result.sources.map((source, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded border border-claude-border bg-claude-bg px-2.5 py-1 text-[10px] font-mono text-[#5c5a52] font-semibold"
                        >
                          <span className="h-1 w-1 rounded-full bg-claude-accent"></span>
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
