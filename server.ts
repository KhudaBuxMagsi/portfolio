import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { DEV_INFO, PROJECTS, SKILL_CATEGORIES, PRESET_ANSWERS } from "./src/data.ts";

dotenv.config();

// Ensure the API key exists
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("⚠️ Warning: GEMINI_API_KEY is not defined in environment variables. Please configure it in Settings > Secrets.");
}

// Initialize the @google/genai client
const ai = new GoogleGenAI({
  apiKey: apiKey || "MOCK_KEY",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const app = express();
const PORT = 3000;

app.use(express.json());

// Compile the comprehensive dossier on Khuda Bux for Gemini's System Instruction
const CONTEXT_DOSSIER = `
You are the AI Portfolio Assistant for Khuda Bux, an outstanding AI / Machine Learning Engineer.
Your purpose is to answer questions about Khuda Bux, his background, education, skills, and projects, representing him to human recruiters, engineering managers, and AI search agents.

Developer Dossier:
Name: ${DEV_INFO.name}
Title: ${DEV_INFO.title}
Education:
  - Degree: ${DEV_INFO.education.degree}
  - University: ${DEV_INFO.education.university} (Location: ${DEV_INFO.education.location})
  - Graduation Period: ${DEV_INFO.education.period}
  - Context: ${DEV_INFO.education.details}
Email: ${DEV_INFO.email}
GitHub: ${DEV_INFO.github}
LinkedIn: ${DEV_INFO.linkedin}
Location: ${DEV_INFO.location}
Bio: ${DEV_INFO.bio}

Core Tech Stack & Skills:
${SKILL_CATEGORIES.map(cat => `
- ${cat.title}:
  ${cat.skills.map(s => `  * ${s.name} (Proficiency: ${s.proficiency}%)`).join("\n")}
`).join("\n")}

Detailed Projects Accomplished:
${PROJECTS.map(p => `
* Project Title: ${p.title}
  - Category: ${p.category}
  - Short Description: ${p.shortDesc}
  - Full Details: ${p.longDesc}
  - Performance Metrics:
    ${p.metrics.map(m => `    * ${m.label}: ${m.value}`).join("\n")}
  - Tags: ${p.tags.join(", ")}
  - Architecture Workflow Steps:
    ${p.architecture.steps.map((step, idx) => `    ${idx + 1}. ${step}`).join("\n")}
  - Source Repository: ${p.githubUrl || "Available on request"}
`).join("\n")}

Behavior & Tone Guidelines:
1. Represent Khuda Bux with professional excellence. Be direct, intelligent, precise, and objective.
2. Provide technical explanations where appropriate. You are an expert in deep learning, LLMs, and RAG architectures, so do not shy away from describing things in terms of vector space embeddings, cosine similarity, BM25 retrieval, or quantizations.
3. If a recruiter asks how to hire or contact Khuda Bux, immediately provide his direct contact details (Email: ${DEV_INFO.email}, LinkedIn: ${DEV_INFO.linkedin}).
4. Always ground your responses strictly in this provided dossier. If someone asks a completely unrelated question (e.g., recipes, unrelated news), politely redirect them back to Khuda Bux's portfolio and capabilities.
5. Keep your responses concise, highly scannable, and formatted elegantly with markdown bullet points and bold text where appropriate.
`;

// Helper function to provide high-fidelity local answers when Gemini is experiencing high demand (503) or offline
function getLocalFallbackAnswer(query: string): { answer: string; sources: string[] } {
  const queryLower = query.toLowerCase();
  
  // 1. Direct check in PRESET_ANSWERS keys
  for (const presetKey of Object.keys(PRESET_ANSWERS)) {
    if (queryLower === presetKey.toLowerCase()) {
      return {
        answer: PRESET_ANSWERS[presetKey],
        sources: ["Local Portfolio Database", "Academic Transcripts"]
      };
    }
  }

  // 2. Keyword checks for Projects
  if (queryLower.includes("project") || queryLower.includes("rag") || queryLower.includes("neuro") || queryLower.includes("vision") || queryLower.includes("yolo") || queryLower.includes("bot")) {
    return {
      answer: `Khuda Bux has built several high-performance AI implementations:
• **NeuroSearch RAG**: An enterprise hybrid search engine combining sparse BM25 and dense cosine similarity via pgvector. It features 120ms latency and 92% retrieval relevance improvements.
• **SMIU Campus Bot**: An intelligent student advisor fine-tuned on Llama-3-8B using QLoRA. It achieves over 95% accuracy and runs locally at 4-bit quantization.
• **Autonomous Vision Traffic Agent**: A real-time traffic flow controller using YOLOv8, ByteTrack, and Deep Q-Networks (DQN) to reduce vehicle wait times by 32%.`,
      sources: ["NeuroSearch RAG Specs", "SMIU Campus Bot Case Study", "Vision Traffic Agent Logs"]
    };
  }

  // 3. Keyword checks for Education / SMIU
  if (queryLower.includes("smiu") || queryLower.includes("university") || queryLower.includes("education") || queryLower.includes("degree") || queryLower.includes("academic") || queryLower.includes("course")) {
    return {
      answer: `Khuda Bux graduated with a **BS in Computer Science** from **Sindh Madressatul Islam University (SMIU)** (2020 - 2024). 
SMIU is one of the oldest and most prestigious educational institutions in South Asia, established in 1885. His coursework included Design & Analysis of Algorithms, Artificial Intelligence, Deep Neural Networks, Natural Language Processing, and Distributed Cloud Architectures.`,
      sources: ["SMIU Registrar Office", "Academic Transcripts"]
    };
  }

  // 4. Keyword checks for Skills / Stack
  if (queryLower.includes("skill") || queryLower.includes("stack") || queryLower.includes("pytorch") || queryLower.includes("python") || queryLower.includes("tech") || queryLower.includes("experience")) {
    return {
      answer: `Khuda Bux's engineering toolset is categorized across three core domains:
• **Core AI & ML (90% avg)**: Python (95%), PyTorch (88%), TensorFlow (82%), Hugging Face Transformers (92%), and Scikit-Learn.
• **LLM & Generative AI (91% avg)**: LangChain (90%), LlamaIndex (88%), Vector Databases like pgvector and Pinecone (91%), Prompt Engineering & Guardrails.
• **Software Engineering (85% avg)**: FastAPI & Node.js (89%), Next.js & React (85%), TypeScript (86%), Docker, Git & CI/CD.`,
      sources: ["Skills Matrix Schema", "GitHub Activity Repositories"]
    };
  }

  // 5. Keyword checks for Contact
  if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("linkedin") || queryLower.includes("hire") || queryLower.includes("reach") || queryLower.includes("resume") || queryLower.includes("cv")) {
    return {
      answer: `You can reach out to Khuda Bux directly for opportunities, projects, or interviews:
• 📧 **Email**: khudabux1998@gmail.com
• 🔗 **LinkedIn**: https://linkedin.com/in/khudabux1998
• 💻 **GitHub**: https://github.com/khudabux1998
• 📍 **Location**: Karachi, Pakistan`,
      sources: ["Contact Registry Card"]
    };
  }

  // Default elegant profile summary
  return {
    answer: `Khuda Bux is an AI / Machine Learning Engineer specializing in Large Language Models (LLMs), RAG pipelines, and Computer Vision. 

He holds a **BS in Computer Science** from **Sindh Madressatul Islam University (SMIU)** (founded 1885). His signature deployments include **NeuroSearch RAG** (hybrid vector search with <120ms retrieval) and **SMIU Campus Bot** (a fine-tuned Llama-3 student advisor). 

How can I help you find more specific details about his background or project architectures?`,
    sources: ["Khuda Bux Profile Dossier"]
  };
}

// API routes
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Endpoint 1: RAG Semantic Search Engine API
app.post("/api/search", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Missing or invalid search 'query' parameter." });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      const fallback = getLocalFallbackAnswer(query);
      res.json({
        answer: fallback.answer,
        sources: [...fallback.sources, "Local Dossier (Demo Mode)"]
      });
      return;
    }

    try {
      // Call Gemini to act as a semantic search responder
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Search Query: "${query}". Provide a highly targeted answer extracting matching information from the dossier. State the matching metrics or projects clearly. Keep it under 150 words.`,
        config: {
          systemInstruction: CONTEXT_DOSSIER + "\n\nYou are operating in SEMANTIC SEARCH mode. Focus on precise extraction, answering the query directly with citations or statistics where possible.",
          temperature: 0.2,
        },
      });

      const text = response.text || "No relevant search results found in the profile database.";
      
      // Dynamically identify sources based on the query content
      const sources: string[] = ["Portfolio Resume Schema"];
      const lowercaseQuery = query.toLowerCase();
      if (lowercaseQuery.includes("rag") || lowercaseQuery.includes("search") || lowercaseQuery.includes("neuro")) {
        sources.push("NeuroSearch RAG Project Architecture");
      }
      if (lowercaseQuery.includes("smiu") || lowercaseQuery.includes("bot") || lowercaseQuery.includes("campus") || lowercaseQuery.includes("llama")) {
        sources.push("SMIU Campus Bot Case Study");
      }
      if (lowercaseQuery.includes("traffic") || lowercaseQuery.includes("vision") || lowercaseQuery.includes("yolo")) {
        sources.push("Autonomous Vision Traffic Agent Analytics");
      }
      if (lowercaseQuery.includes("skill") || lowercaseQuery.includes("stack") || lowercaseQuery.includes("python") || lowercaseQuery.includes("pytorch")) {
        sources.push("Profile Skills Matrix");
      }

      res.json({ answer: text, sources });
    } catch (geminiErr: any) {
      console.warn("Gemini API search error (falling back to high-fidelity local engine):", geminiErr.message || geminiErr);
      const fallback = getLocalFallbackAnswer(query);
      res.json({
        answer: fallback.answer,
        sources: [...fallback.sources, "Local Cache fallback (Gemini rate-limited/busy)"]
      });
    }
  } catch (err: any) {
    console.error("Search API Error:", err);
    res.status(500).json({ error: err.message || "An error occurred during search processing." });
  }
});

// Endpoint 2: Conversational Portfolio Chatbot API
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
      return;
    }

    const lastMsgText = messages[messages.length - 1]?.text || "";

    if (!process.env.GEMINI_API_KEY) {
      const fallback = getLocalFallbackAnswer(lastMsgText);
      res.json({
        reply: fallback.answer
      });
      return;
    }

    try {
      // Map frontend messages role of 'user'/'assistant' to Gemini expected model format
      // Gemini role format: 'user' or 'model'
      const formattedContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }],
      }));

      // If the contents array is empty, provide a default starting message
      if (formattedContents.length === 0) {
        formattedContents.push({
          role: "user",
          parts: [{ text: "Hello! Who are you?" }],
        });
      }

      // Request Gemini generate content
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: CONTEXT_DOSSIER + "\n\nYou are operating in CHATBOT mode. Respond warm, engagingly, yet professionally. Help recruiters schedule interview, answer technical questions, and represent his engineering achievements with confidence.",
          temperature: 0.6,
        },
      });

      const reply = response.text || "I am here to help you learn more about Khuda Bux's ML and AI engineering capabilities. Could you rephrase your question?";
      res.json({ reply });
    } catch (geminiErr: any) {
      console.warn("Gemini API chat error (falling back to high-fidelity local engine):", geminiErr.message || geminiErr);
      const fallback = getLocalFallbackAnswer(lastMsgText);
      res.json({
        reply: fallback.answer
      });
    }
  } catch (err: any) {
    console.error("Chat API Error:", err);
    res.status(500).json({ error: err.message || "An error occurred during chat reasoning." });
  }
});

// Integration with Vite (development vs production)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Import Vite dynamically to avoid requiring it in production builds
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("⚡ Vite development server mounted on Express");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("📦 Production static asset serving configured");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 AI Engineer Portfolio Server is running at http://localhost:${PORT}`);
  });
}

startServer();
