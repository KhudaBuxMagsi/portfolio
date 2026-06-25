export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: "LLM & RAG" | "Computer Vision" | "Core ML";
  metrics: { label: string; value: string }[];
  tags: string[];
  architecture: {
    steps: string[];
    diagramData: { source: string; target: string; label: string }[];
  };
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; proficiency: number; icon: string }[];
}

export const DEV_INFO = {
  name: "Khuda Bux",
  title: "AI / Machine Learning Engineer",
  education: {
    degree: "BS Computer Science",
    university: "Sindh Madressatul Islam University (SMIU)",
    location: "Karachi, Pakistan",
    period: "2020 - 2024",
    details: "Specialized in Artificial Intelligence, Deep Learning, and Natural Language Processing. SMIU is one of the oldest institutions in South Asia, founded in 1885.",
  },
  email: "khudabux1998@gmail.com",
  github: "https://github.com/KhudaBuxMagsi",
  linkedin: "https://www.linkedin.com/in/khuda-bux-magsi-b26b3717b",
  location: "Karachi, Pakistan",
  bio: "Highly analytical and research-driven AI / ML Engineer specializing in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) pipelines, and Computer Vision. Adept at fine-tuning open-source models, architecting dense vector database schemas, and building lightning-fast serverless endpoints to deploy complex AI workloads in production.",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core AI / ML",
    skills: [
      { name: "Python", proficiency: 95, icon: "FileCode" },
      { name: "PyTorch", proficiency: 88, icon: "Flame" },
      { name: "TensorFlow", proficiency: 82, icon: "Cpu" },
      { name: "Scikit-Learn", proficiency: 90, icon: "Grid" },
      { name: "Hugging Face Transformers", proficiency: 92, icon: "Globe" },
    ],
  },
  {
    title: "LLM & GenAI",
    skills: [
      { name: "OpenAI API", proficiency: 94, icon: "Zap" },
      { name: "LangChain", proficiency: 90, icon: "Layers" },
      { name: "LlamaIndex", proficiency: 88, icon: "Compass" },
      { name: "Vector DBs (pgvector / Pinecone)", proficiency: 91, icon: "Database" },
      { name: "Prompt Engineering & Guardrails", proficiency: 93, icon: "Shield" },
    ],
  },
  {
    title: "Software Eng",
    skills: [
      { name: "Next.js / React", proficiency: 85, icon: "Code2" },
      { name: "TypeScript", proficiency: 86, icon: "FileJson" },
      { name: "FastAPI / Node.js", proficiency: 89, icon: "Zap" },
      { name: "Docker", proficiency: 80, icon: "Container" },
      { name: "Git & CI/CD", proficiency: 87, icon: "GitBranch" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "neurosearch-rag",
    title: "NeuroSearch RAG",
    shortDesc: "Enterprise semantic search engine using hybrid BM25 and dense vector retrieval with Supabase pgvector.",
    longDesc: "Designed and built an enterprise-grade semantic search platform capable of parsing, indexing, and executing ultra-low-latency semantic retrieval across hundreds of thousands of complex documents (PDFs, PPTXs, HTML). Implemented a state-of-the-art hybrid search system combining sparse lexical queries (BM25) and dense embeddings (openai text-embedding-3-small) to maximize retrieval precision while retaining absolute keyword safety.",
    category: "LLM & RAG",
    metrics: [
      { label: "End-to-End Latency", value: "<120ms" },
      { label: "Retrieval Relevance Improvement", value: "+92%" },
      { label: "Indexing Speed", value: "500 doc/sec" },
    ],
    tags: ["pgvector", "LangChain", "FastAPI", "Hybrid Search", "Transformers"],
    architecture: {
      steps: [
        "Ingestion Pipeline: Apache Tika parses raw files, chunked recursively by a 512-token sliding window using LangChain's recursive text splitters.",
        "Embedding Generation: Custom worker pools stream chunks to OpenAI/Hugging Face endpoints, caching vectors to avoid redundant calls.",
        "Hybrid Search Exec: Queries run a co-operative SQL CTE combining pgvector cosine similarity and full-text TSQuery with Reciprocal Rank Fusion (RRF).",
        "LLM Synthesis: Retrieved contexts are ranked by Cohere Rerank, packed into systemic context templates, and synthesized using Gemini-3.5-Flash.",
      ],
      diagramData: [
        { source: "Documents", target: "Parser / Splitter", label: "Raw Docs Ingestion" },
        { source: "Parser / Splitter", target: "Embeddings API", label: "Recursive Chunking" },
        { source: "Embeddings API", target: "pgvector DB (Supabase)", label: "Vector Insert" },
        { source: "User Search Query", target: "FastAPI Orchestrator", label: "Query Ingress" },
        { source: "FastAPI Orchestrator", target: "pgvector DB (Supabase)", label: "Hybrid CTE Retrieval (BM25 + Cosine)" },
        { source: "pgvector DB (Supabase)", target: "Cohere Rerank", label: "Top-20 Contexts" },
        { source: "Cohere Rerank", target: "Gemini Model", label: "Top-5 Reranked Contexts" },
        { source: "Gemini Model", target: "Clean UI Output", label: "Grounded Answer Generation" },
      ],
    },
    githubUrl: "https://github.com/KhudaBuxMagsi/neurosearch-rag",
  },
  {
    id: "smiu-campus-bot",
    title: "SMIU Campus Bot",
    shortDesc: "A fine-tuned Llama-3 agent answering complex SMIU student queries with 95% accuracy.",
    longDesc: "Developed an intelligent campus virtual advisor for Sindh Madressatul Islam University. Fine-tuned the Llama-3-8B-Instruct model using QLoRA (Quantized Low-Rank Adaptation) on a custom, meticulously scraped corpus comprising university bylaws, syllabus outlines, departments, admissions, fees, and examination regulations. Quantized the model to 4-bit GGUF format and deployed it locally on cost-effective virtual servers with high concurrency capabilities.",
    category: "LLM & RAG",
    metrics: [
      { label: "Answering Accuracy", value: "95%+" },
      { label: "First Token Latency", value: "1.4s" },
      { label: "Advisor Load Reduction", value: "4.2x" },
    ],
    tags: ["Llama-3", "QLoRA", "Unsloth", "llama.cpp", "FastAPI", "GGUF"],
    architecture: {
      steps: [
        "Sourcing: Web scraped official SMIU prospectus, departments, syllabus files, and admissions FAQ sheets to compile 2.5MB of clean text.",
        "Dataset Synthesis: Crafted 15,000 highly targeted multi-turn instruction-following QA pairs covering student dilemmas, course codes, and prerequisite queries.",
        "Supervised Fine-Tuning: Trained Llama-3-8B-Instruct on a single RTX 3900 using Unsloth and Hugging Face SFTTrainer for 3 epochs (Rank=16, Alpha=32).",
        "Quantization & Deployment: Converted checkpoints to GGUF, quantized to 4-bit (q4_k_m), and instantiated on a lightweight VM using llama.cpp and FastAPI server.",
      ],
      diagramData: [
        { source: "SMIUProspectus & Web Docs", target: "LLM QA Synthesis", label: "Data Scrape" },
        { source: "LLM QA Synthesis", target: "15,000 Instruction Dataset", label: "Annotation" },
        { source: "15,000 Instruction Dataset", target: "Unsloth QLoRA Training", label: "Llama-3 8B fine-tuning" },
        { source: "Unsloth QLoRA Training", target: "GGUF 4-Bit Quantization", label: "llama.cpp compilation" },
        { source: "Student Prompt", target: "FastAPI Middleware", label: "User Input" },
        { source: "FastAPI Middleware", target: "GGUF Model", label: "Inference Exec" },
        { source: "GGUF Model", target: "Student Prompt", label: "Streaming Token Pipeline" },
      ],
    },
    githubUrl: "https://github.com/KhudaBuxMagsi/smiu-campus-bot",
  },
  {
    id: "vision-traffic-agent",
    title: "Autonomous Vision Traffic Agent",
    shortDesc: "Real-time traffic flow optimization engine using YOLOv8, ByteTrack, and Deep Q-Learning.",
    longDesc: "Engineered an intelligent city traffic flow agent that continuously processes real-time surveillance feeds to calculate intersection vehicle loads. It leverages YOLOv8 for high-precision vehicle detection and ByteTrack for cross-frame tracking. The lane occupancy data is passed to a reinforcement learning environment (custom deep Q-learning) which intelligently adjusts traffic light signals to maximize vehicle throughput, reducing peak-hour waiting times.",
    category: "Computer Vision",
    metrics: [
      { label: "Intersection Waiting Reduction", value: "32%" },
      { label: "Vehicle Detection Accuracy", value: "98.4%" },
      { label: "Edge Inference Latency", value: "11ms" },
    ],
    tags: ["YOLOv8", "ByteTrack", "Reinforcement Learning", "Deep Q-Network", "OpenCV"],
    architecture: {
      steps: [
        "Inference Loop: Multi-lane camera streams decoded using OpenCV, forwarding frames to a calibrated YOLOv8 object detection model running on edge hardware.",
        "Tracking Strategy: Outputs are filtered and passed to ByteTrack to preserve object IDs, enabling accurate queue calculation and flow speed calculations.",
        "State Representation: Construct a dynamic vector comprising normalized lane occupancy, wait times, and approach rates.",
        "DQN Policy Execution: Every 15 seconds, a PyTorch DQN evaluates the state and triggers the optimal phase command (green extension or switch phase).",
      ],
      diagramData: [
        { source: "CCTV RTSP Streams", target: "OpenCV Frame Decoder", label: "Video Capture" },
        { source: "OpenCV Frame Decoder", target: "YOLOv8 Edge Model", label: "Detection (11ms)" },
        { source: "YOLOv8 Edge Model", target: "ByteTrack Tracker", label: "ID Association" },
        { source: "ByteTrack Tracker", target: "State Construction Vector", label: "Queue Density Math" },
        { source: "State Construction Vector", target: "Deep Q-Network Model", label: "RL State Ingestion" },
        { source: "Deep Q-Network Model", target: "Traffic Light Relay Controller", label: "Signal Switching Action" },
      ],
    },
    githubUrl: "https://github.com/KhudaBuxMagsi/vision-traffic-agent",
  },
];

export const SUGGESTED_QUESTIONS = [
  {
    question: "Show LLM and RAG projects",
    tag: "LLM & RAG",
  },
  {
    question: "View computer science background",
    tag: "Education",
  },
  {
    question: "What is his tech stack?",
    tag: "Skills",
  },
  {
    question: "How can I contact Khuda Bux?",
    tag: "Contact",
  },
];

export const PRESET_ANSWERS: Record<string, string> = {
  "Show LLM and RAG projects": `Khuda Bux has built two high-profile LLM and RAG projects:
1. **NeuroSearch RAG**: An enterprise semantic search engine featuring hybrid BM25 lexical search and dense cosine vector similarity via Supabase's \`pgvector\`. It achieves a sub-120ms latency and 92% improvement in context retrieval.
2. **SMIU Campus Bot**: A virtual student advisor fine-tuned on Sindh Madressatul Islam University's Prospectus and regulations using Unsloth (QLoRA) on Llama-3-8B. It responds with over 95% accuracy and runs locally via a 4-bit quantized GGUF format on \`llama.cpp\`.`,

  "View computer science background": `Khuda Bux completed his **BS Computer Science** from **Sindh Madressatul Islam University (SMIU)** in Karachi, Pakistan (graduated 2024). During his tenure, he specialized in AI, deep neural networks, and prompt engineering, publishing academic reports on automated grading systems. SMIU is historically renowned as one of South Asia's oldest educational institutions (founded in 1885).`,

  "What is his tech stack?": `Khuda Bux possesses a versatile, production-hardened tech stack:
- **Core AI/ML**: Python, PyTorch, TensorFlow, Scikit-Learn, Hugging Face Transformers.
- **LLM & GenAI**: OpenAI API, LangChain, LlamaIndex, Vector Databases (pgvector, Pinecone), Prompt Engineering, and model guardrails.
- **Software Engineering**: Next.js/React, TypeScript, FastAPI, Node.js, Docker, Git, CI/CD pipelines.`,

  "How can I contact Khuda Bux?": `You can reach out to Khuda Bux directly through these channels:
- 📧 **Email**: khudabux1998@gmail.com
- 💻 **GitHub**: https://github.com/KhudaBuxMagsi
- 🔗 **LinkedIn**: https://www.linkedin.com/in/khuda-bux-magsi-b26b3717b
- 📍 **Location**: Karachi, Pakistan

Feel free to send a message or request an interview through the portfolio chat agent!`,
};
