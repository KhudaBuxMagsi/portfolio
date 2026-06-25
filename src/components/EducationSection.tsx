import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, Clock, Landmark } from "lucide-react";
import { DEV_INFO } from "../data.ts";

export default function EducationSection() {
  const courses = [
    "Design and Analysis of Algorithms",
    "Artificial Intelligence & Expert Systems",
    "Deep Neural Networks & Machine Learning",
    "Natural Language Processing (NLP)",
    "Database Management Systems & pgvector schemas",
    "Distributed Cloud Architectures"
  ];

  return (
    <section id="smiu" className="py-16 sm:py-24 border-t border-claude-border bg-claude-bg/50 relative overflow-hidden">
      {/* Background soft ambient lights */}
      <div className="absolute bottom-0 right-10 -z-10 h-[250px] w-[250px] rounded-full bg-claude-accent/5 blur-3xl animate-warm-drift-2"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-claude-border bg-claude-paper px-3 py-1 text-[10px] font-mono text-claude-accent font-semibold mb-3">
              <span>ACADEMIC_FOUNDATION</span>
            </div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-claude-dark sm:text-4xl">
              Education & Academic Heritage
            </h2>
          </div>
          <p className="text-claude-muted text-sm max-w-md font-sans font-medium leading-relaxed">
            Grounded in a classic Computer Science syllabus, translating fundamental complexity math and algorithm design into AI engineering.
          </p>
        </div>

        {/* SMIU Historic Highlight Card */}
        <div className="grid gap-8 md:grid-cols-12 items-stretch">
          
          {/* Main Institution Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 rounded-xl border border-claude-border bg-claude-paper p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group overflow-hidden shadow-sm"
          >
            {/* Top reflection light effect */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-claude-bg/30 to-transparent pointer-events-none"></div>

            <div className="space-y-4 relative">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-claude-bg border border-claude-border text-claude-accent shadow-sm">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-claude-dark leading-tight">
                    {DEV_INFO.education.university}
                  </h3>
                  <p className="text-[9px] text-claude-muted font-mono tracking-wide uppercase font-bold mt-0.5">
                    ESTABLISHED 1885 • ONE OF THE OLDEST IN SOUTH ASIA
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5c5a52] mb-3 font-semibold">
                  <span className="flex items-center gap-1.5 bg-claude-bg px-2.5 py-1 rounded-lg border border-claude-border shadow-sm">
                    <GraduationCap className="h-3.5 w-3.5 text-claude-accent" />
                    <strong>{DEV_INFO.education.degree}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 bg-claude-bg px-2.5 py-1 rounded-lg border border-claude-border shadow-sm">
                    <Clock className="h-3.5 w-3.5 text-[#cc5a42]" />
                    {DEV_INFO.education.period}
                  </span>
                </div>
                <p className="text-sm text-[#3c3b36] leading-relaxed font-sans font-medium">
                  {DEV_INFO.education.details}
                </p>
              </div>
            </div>

            {/* SMIU Historic Fun Fact Banner */}
            <div className="bg-claude-bg border border-claude-border p-4 rounded-lg flex items-start gap-3 shadow-inner">
              <Award className="h-5 w-5 text-claude-accent shrink-0 mt-0.5" />
              <div className="text-xs text-[#5c5a52] leading-relaxed font-medium">
                <strong className="text-claude-dark font-serif font-semibold">Did you know?</strong> Quaid-e-Azam Muhammad Ali Jinnah, the founder of Pakistan, was among the most distinguished alumni of Sindh Madressatul Islam, having received his primary education there.
              </div>
            </div>

          </motion.div>

          {/* Coursework Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 rounded-xl border border-claude-border bg-claude-paper p-6 sm:p-8 flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-claude-accent" />
                <h4 className="text-[9px] font-mono font-bold text-claude-muted tracking-wider">
                  CORE COMPUTER SCIENCE COURSEWORK
                </h4>
              </div>

              <div className="grid gap-3">
                {courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-claude-border bg-claude-bg px-3.5 py-2.5 hover:border-claude-accent hover:bg-claude-paper transition-all shadow-sm"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-claude-accent"></div>
                    <span className="text-xs text-claude-dark font-sans font-medium">
                      {course}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9px] font-mono text-claude-muted flex items-center justify-between mt-4">
              <span>ACADEMIC FOCUS</span>
              <span>KARACHI, PK</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
