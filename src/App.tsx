import { useState, useEffect, useRef, useCallback } from "react";
import { SUBJECTS, findSubjectById, findCourseById, type Subject, type Course, type QuizQuestion } from "./data";

const assetPathPrefix = "/assets";
const imgGradientBg = `${assetPathPrefix}/7a154.png`;
const imgHeaderBird = `${assetPathPrefix}/b4b47.svg`;

const LAST_STUDIED_KEY = "apstudy_last_course";
const SCORES_KEY = "apstudy_scores";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getScores(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(SCORES_KEY) || "{}"); } catch { return {}; }
}
function setScore(courseId: string, score: number) {
  const scores = getScores();
  if (!scores[courseId] || score > scores[courseId]) scores[courseId] = score;
  localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
}

// ── Splash ───────────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("out"), 2000);
    const t3 = setTimeout(onDone, 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      style={{
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 0.7s ease" : undefined,
      }}
    >
      <img src={imgGradientBg} alt="" className="absolute inset-0 w-full h-full object-cover" />

      {/* floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 120 + i * 60,
              height: 120 + i * 60,
              background: `rgba(255,255,255,${0.04 + i * 0.01})`,
              left: `${[10, 70, 30, 80, 5, 60][i]}%`,
              top: `${[20, 10, 70, 60, 40, 80][i]}%`,
              animation: `floatOrb ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "scale(0.7) translateY(20px)" : "scale(1) translateY(0)",
          transition: "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        className="relative bg-white rounded-[32px] px-10 py-7 flex items-center gap-4 shadow-2xl"
      >
        <img
          src={imgHeaderBird}
          alt=""
          style={{ width: 56, height: 56, animation: "birdBob 2s ease-in-out infinite" }}
        />
        <span className="logo-text" style={{ fontSize: 48 }}>APStudy</span>
      </div>

      <p
        className="absolute bottom-16 text-white/60 text-sm tracking-widest uppercase font-medium"
        style={{
          opacity: phase === "hold" ? 1 : 0,
          transform: phase === "hold" ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s",
          fontFamily: '"Bricolage Grotesque"',
          letterSpacing: "0.15em",
        }}
      >
        Study smarter, not harder
      </p>
    </div>
  );
}

// ── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 cursor-pointer bg-transparent border-0 outline-none group"
      style={{ padding: 0 }}
    >
      <img
        src={imgHeaderBird}
        alt=""
        style={{ width: 34, height: 34, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
        className="group-hover:scale-110"
      />
      <span className="logo-text" style={{ fontSize: 26 }}>APStudy</span>
    </button>
  );
}

// ── Home Screen ───────────────────────────────────────────────────────────────
function HomeScreen({ onSelectSubject }: { onSelectSubject: (s: Subject) => void }) {
  const [mounted, setMounted] = useState(false);
  const lastCourse = localStorage.getItem(LAST_STUDIED_KEY);
  const lastData = lastCourse ? findCourseById(lastCourse) : null;
  const scores = getScores();

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* header */}
      <header
        className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-black/5"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            {lastData && (
              <button
                onClick={() => onSelectSubject(lastData.subject)}
                className="text-sm font-medium px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 transition-all"
                style={{ fontFamily: '"Bricolage Grotesque"', letterSpacing: "-0.01em" }}
              >
                Continue studying
              </button>
            )}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)", fontFamily: '"Bricolage Grotesque"' }}
            >
              {Object.keys(scores).length > 0 ? Object.keys(scores).length : "✦"}
            </div>
          </div>
        </div>
      </header>

      {/* hero */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-black/30 mb-3"
            style={{ fontFamily: '"Bricolage Grotesque"', letterSpacing: "0.12em" }}>
            {getGreeting()} 👋
          </p>
          <h1
            className="text-black leading-none mb-2"
            style={{
              fontFamily: '"Bricolage Grotesque:Medium"',
              fontWeight: 600,
              fontSize: "clamp(44px, 6vw, 80px)",
              fontVariationSettings: '"opsz" 96, "wdth" 100',
              letterSpacing: "-0.04em",
            }}
          >
            What are we<br />studying today?
          </h1>
          <p className="text-black/40 mt-4 text-lg" style={{ fontFamily: '"Bricolage Grotesque"' }}>
            Pick a subject to explore AP courses, units, and practice quizzes.
          </p>
        </div>

        {/* continue banner */}
        {lastData && (
          <ContinueBanner
            course={lastData.course}
            subject={lastData.subject}
            score={scores[lastData.course.id]}
            onContinue={() => onSelectSubject(lastData.subject)}
            mounted={mounted}
          />
        )}

        {/* subject grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {SUBJECTS.map((subject, i) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              scores={scores}
              onClick={() => onSelectSubject(subject)}
              delay={i * 70}
              mounted={mounted}
            />
          ))}
        </div>

        {/* stats row */}
        {Object.keys(scores).length > 0 && (
          <div
            className="mt-10 grid grid-cols-3 gap-4"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s ease 0.5s",
            }}
          >
            <StatTile label="Quizzes taken" value={Object.keys(scores).length} icon="🎯" />
            <StatTile label="Best score" value={`${Math.max(...Object.values(scores))}%`} icon="⭐" />
            <StatTile
              label="Courses explored"
              value={Object.keys(scores).length}
              icon="📖"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ContinueBanner({
  course, subject, score, onContinue, mounted,
}: { course: Course; subject: Subject; score?: number; onContinue: () => void; mounted: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onContinue}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full mt-8 rounded-2xl overflow-hidden relative text-left cursor-pointer border-0 outline-none block"
      style={{
        background: subject.gradient,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s, box-shadow 0.3s ease",
        boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.2)" : "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url(${course.banner})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="relative p-6 flex items-center justify-between">
        <div>
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ fontFamily: '"Bricolage Grotesque"', letterSpacing: "0.1em" }}>
            Pick up where you left off
          </p>
          <h3 className="text-white font-semibold text-xl leading-tight"
            style={{ fontFamily: '"Bricolage Grotesque:Medium"', fontVariationSettings: '"opsz" 96, "wdth" 100', letterSpacing: "-0.02em" }}>
            {course.name}
          </h3>
          {score !== undefined && (
            <p className="text-white/70 text-sm mt-1" style={{ fontFamily: '"Bricolage Grotesque"' }}>
              Best quiz score: {score}%
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl"
          style={{
            transform: hovered ? "translateX(4px) scale(1.1)" : "translateX(0) scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          →
        </div>
      </div>
    </button>
  );
}

function SubjectCard({
  subject, onClick, delay, mounted, scores,
}: { subject: Subject; onClick: () => void; delay: number; mounted: boolean; scores: Record<string, number> }) {
  const [hovered, setHovered] = useState(false);
  const courseCount = subject.courses.length;
  const completedCount = subject.courses.filter((c) => scores[c.id] !== undefined).length;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden text-left cursor-pointer border-0 outline-none aspect-[4/3] flex flex-col justify-end p-5"
      style={{
        background: subject.gradient,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, box-shadow 0.3s ease`,
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.25)" : "0 4px 20px rgba(0,0,0,0.12)",
      }}
    >
      {/* shimmer on hover */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        className="absolute top-4 right-4 text-3xl"
        style={{
          transform: hovered ? "scale(1.2) rotate(8deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {subject.emoji}
      </div>
      <div className="relative">
        <h2
          className="text-white font-semibold leading-tight mb-1"
          style={{
            fontFamily: '"Bricolage Grotesque:Medium"',
            fontVariationSettings: '"opsz" 96, "wdth" 100',
            fontSize: 22,
            letterSpacing: "-0.02em",
          }}
        >
          {subject.name}
        </h2>
        <p className="text-white/60 text-xs" style={{ fontFamily: '"Bricolage Grotesque"' }}>
          {courseCount} courses
          {completedCount > 0 && ` · ${completedCount} quizzed`}
        </p>
        {completedCount > 0 && (
          <div className="mt-2 h-1 rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white/70"
              style={{ width: `${(completedCount / courseCount) * 100}%`, transition: "width 0.6s ease" }}
            />
          </div>
        )}
      </div>
    </button>
  );
}

function StatTile({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="rounded-2xl border border-black/8 p-4 flex items-center gap-3" style={{ background: "#FAFAFA" }}>
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-bold text-xl text-black leading-none"
          style={{ fontFamily: '"Bricolage Grotesque:Medium"', fontVariationSettings: '"opsz" 76, "wdth" 100', letterSpacing: "-0.02em" }}>
          {value}
        </p>
        <p className="text-black/40 text-xs mt-0.5" style={{ fontFamily: '"Bricolage Grotesque"' }}>{label}</p>
      </div>
    </div>
  );
}

// ── Subject Screen ────────────────────────────────────────────────────────────
function SubjectScreen({
  subject,
  scores,
  onBack,
  onSelectCourse,
}: {
  subject: Subject;
  scores: Record<string, number>;
  onBack: () => void;
  onSelectCourse: (c: Course) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* gradient header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: subject.gradient,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <div className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-5 pb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-8 bg-transparent border-0 outline-none cursor-pointer transition-colors"
            style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 15 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Subjects
          </button>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2"
                style={{ fontFamily: '"Bricolage Grotesque"', letterSpacing: "0.12em" }}>
                {subject.courses.length} AP Courses
              </p>
              <h1
                className="text-white leading-none"
                style={{
                  fontFamily: '"Bricolage Grotesque:Medium"',
                  fontWeight: 600,
                  fontSize: "clamp(44px, 8vw, 80px)",
                  fontVariationSettings: '"opsz" 96, "wdth" 100',
                  letterSpacing: "-0.04em",
                }}
              >
                {subject.name}
              </h1>
              <p className="text-white/60 mt-2 text-base" style={{ fontFamily: '"Bricolage Grotesque"' }}>
                {subject.tagline}
              </p>
            </div>
            <span className="text-7xl hidden md:block mb-2">{subject.emoji}</span>
          </div>
        </div>
      </div>

      {/* courses */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subject.courses.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              subject={subject}
              score={scores[course.id]}
              onClick={() => onSelectCourse(course)}
              delay={i * 60}
              mounted={mounted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  course, subject, score, onClick, delay, mounted,
}: { course: Course; subject: Subject; score?: number; onClick: () => void; delay: number; mounted: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden text-left cursor-pointer border-0 outline-none w-full"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease ${delay + 200}ms, transform 0.4s cubic-bezier(0.34,1.2,0.64,1) ${delay + 200}ms, box-shadow 0.25s ease`,
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.18)" : "0 2px 12px rgba(0,0,0,0.08)",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* banner */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={course.banner}
          alt=""
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: "brightness(0.85)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))" }} />
        {score !== undefined && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-xs font-bold"
            style={{ background: subject.accentColor, fontFamily: '"Bricolage Grotesque"' }}
          >
            {score}%
          </div>
        )}
      </div>

      {/* info */}
      <div className="p-4">
        <h3
          className="text-black font-semibold leading-tight mb-1"
          style={{
            fontFamily: '"Bricolage Grotesque:Medium"',
            fontVariationSettings: '"opsz" 76, "wdth" 100',
            fontSize: 18,
            letterSpacing: "-0.02em",
          }}
        >
          {course.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-black/40 text-sm" style={{ fontFamily: '"Bricolage Grotesque"' }}>
            {course.units.length} units · {course.quiz.length} quiz questions
          </p>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              fontFamily: '"Bricolage Grotesque"',
              background: subject.accentColor + "18",
              color: subject.accentColor,
              transform: hovered ? "translateX(3px)" : "translateX(0)",
              transition: "transform 0.25s ease",
            }}
          >
            Study →
          </span>
        </div>
      </div>
    </button>
  );
}

// ── Course Screen ─────────────────────────────────────────────────────────────
function CourseScreen({
  course,
  subject,
  onBack,
  onStartQuiz,
}: {
  course: Course;
  subject: Subject;
  onBack: () => void;
  onStartQuiz: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [expandedUnit, setExpandedUnit] = useState<number | null>(0);
  const scores = getScores();
  const score = scores[course.id];

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* hero banner */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img src={course.banner} alt="" className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }} />
        <div className="absolute inset-0" style={{ background: subject.gradient, opacity: 0.6 }} />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-4 bg-transparent border-0 outline-none cursor-pointer transition-colors"
            style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 14 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {subject.name}
          </button>
          <h1
            className="text-white leading-tight"
            style={{
              fontFamily: '"Bricolage Grotesque:Medium"',
              fontVariationSettings: '"opsz" 96, "wdth" 100',
              fontSize: "clamp(28px, 5vw, 52px)",
              letterSpacing: "-0.03em",
              fontWeight: 600,
            }}
          >
            {course.name}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* quiz CTA */}
        <div
          className="rounded-2xl p-6 mb-8 flex items-center justify-between gap-4 flex-wrap"
          style={{
            background: subject.gradient,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
          }}
        >
          <div>
            <h2 className="text-white font-semibold text-xl mb-1"
              style={{ fontFamily: '"Bricolage Grotesque:Medium"', fontVariationSettings: '"opsz" 76, "wdth" 100', letterSpacing: "-0.02em" }}>
              {score !== undefined ? `Your best: ${score}%` : "Ready to test yourself?"}
            </h2>
            <p className="text-white/70 text-sm" style={{ fontFamily: '"Bricolage Grotesque"' }}>
              {course.quiz.length} AP-style multiple choice questions
            </p>
          </div>
          <button
            onClick={onStartQuiz}
            className="flex-shrink-0 bg-white font-semibold px-6 py-3 rounded-xl cursor-pointer border-0 outline-none hover:scale-105 active:scale-95 transition-all"
            style={{
              fontFamily: '"Bricolage Grotesque:Medium"',
              fontVariationSettings: '"opsz" 76, "wdth" 100',
              letterSpacing: "-0.01em",
              color: subject.accentColor,
              fontSize: 16,
            }}
          >
            🚀 Start Quiz
          </button>
        </div>

        {/* resources */}
        {course.resources.length > 0 && (
          <div
            className="mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s",
            }}
          >
            <h3 className="font-semibold mb-3 text-black/50 text-xs uppercase tracking-wider"
              style={{ fontFamily: '"Bricolage Grotesque"', letterSpacing: "0.1em" }}>
              External Resources
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.resources.map((r) => (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/10 text-sm hover:border-black/30 hover:bg-black/3 transition-all"
                  style={{ fontFamily: '"Bricolage Grotesque"', letterSpacing: "-0.01em", color: "#111" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  {r.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* units */}
        <div>
          <h3 className="font-semibold mb-4 text-black/50 text-xs uppercase tracking-wider"
            style={{ fontFamily: '"Bricolage Grotesque"', letterSpacing: "0.1em" }}>
            Course Units
          </h3>
          <div className="flex flex-col gap-2">
            {course.units.map((unit, i) => (
              <UnitAccordion
                key={unit.number}
                unit={unit}
                subject={subject}
                isExpanded={expandedUnit === i}
                onToggle={() => setExpandedUnit(expandedUnit === i ? null : i)}
                delay={i * 40}
                mounted={mounted}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UnitAccordion({
  unit, subject, isExpanded, onToggle, delay, mounted,
}: { unit: { number: number; title: string; weight: string; topics: string[] }; subject: Subject; isExpanded: boolean; onToggle: () => void; delay: number; mounted: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        borderColor: isExpanded ? subject.accentColor + "40" : "rgba(0,0,0,0.07)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.4s ease ${delay + 300}ms, transform 0.4s ease ${delay + 300}ms, border-color 0.2s ease`,
      }}
    >
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer border-0 outline-none"
        style={{
          background: isExpanded ? subject.accentColor + "08" : hovered ? "rgba(0,0,0,0.02)" : "white",
          transition: "background 0.2s ease",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              fontFamily: '"Bricolage Grotesque"',
              background: isExpanded ? subject.accentColor : "rgba(0,0,0,0.07)",
              color: isExpanded ? "white" : "rgba(0,0,0,0.5)",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {unit.number}
          </span>
          <div>
            <p className="font-semibold text-black text-sm leading-tight"
              style={{ fontFamily: '"Bricolage Grotesque:Medium"', fontVariationSettings: '"opsz" 76, "wdth" 100', letterSpacing: "-0.01em" }}>
              {unit.title}
            </p>
            <p className="text-black/35 text-xs mt-0.5" style={{ fontFamily: '"Bricolage Grotesque"' }}>{unit.weight}</p>
          </div>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, opacity: 0.3, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 flex flex-wrap gap-2">
          {unit.topics.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                fontFamily: '"Bricolage Grotesque"',
                background: subject.accentColor + "12",
                color: subject.accentColor,
                letterSpacing: "-0.005em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Quiz Screen ───────────────────────────────────────────────────────────────
type QuizState = "question" | "feedback" | "done";

const ANSWER_COLORS = [
  { bg: "#EEF2FF", hover: "#E0E7FF", accent: "#4F46E5", text: "#312E81" },
  { bg: "#FFF7ED", hover: "#FFEDD5", accent: "#EA580C", text: "#7C2D12" },
  { bg: "#F0FDF4", hover: "#DCFCE7", accent: "#16A34A", text: "#14532D" },
  { bg: "#FDF4FF", hover: "#FAE8FF", accent: "#9333EA", text: "#581C87" },
];

function QuizScreen({
  course,
  subject,
  onFinish,
  onBack,
}: {
  course: Course;
  subject: Subject;
  onFinish: (score: number) => void;
  onBack: () => void;
}) {
  const questions = course.quiz;
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<QuizState>("question");
  const [results, setResults] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [showStreakPop, setShowStreakPop] = useState(false);
  const particleIdRef = useRef(0);

  const currentQ = questions[qIndex];
  const progress = (qIndex / questions.length) * 100;
  const finalProgress = ((qIndex + 1) / questions.length) * 100;

  const spawnParticles = useCallback((correct: boolean) => {
    if (!correct) return;
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: particleIdRef.current++,
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 40,
      color: ["#4F46E5", "#10B981", "#F59E0B", "#EC4899", "#6366F1"][i % 5],
    }));
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => setParticles((p) => p.filter((x) => !newParticles.find((n) => n.id === x.id))), 1200);
  }, []);

  const handleSelect = useCallback((idx: number) => {
    if (quizState !== "question") return;
    setSelected(idx);
    setQuizState("feedback");

    const correct = idx === currentQ.answer;
    const newResults = [...results, correct];
    setResults(newResults);

    if (correct) {
      spawnParticles(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > 1) { setShowStreakPop(true); setTimeout(() => setShowStreakPop(false), 1000); }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setQuestionVisible(false);
      setTimeout(() => {
        if (qIndex + 1 >= questions.length) {
          const score = Math.round((newResults.filter(Boolean).length / questions.length) * 100);
          setScore(course.id, score);
          localStorage.setItem(LAST_STUDIED_KEY, course.id);
          onFinish(score);
        } else {
          setQIndex((q) => q + 1);
          setSelected(null);
          setQuizState("question");
          setQuestionVisible(true);
        }
      }, 250);
    }, 1600);
  }, [quizState, currentQ, results, streak, qIndex, questions.length, course.id, onFinish, spawnParticles]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0F0F14" }}>
      {/* animated bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: subject.gradient, opacity: 0.15 }} />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: 300 + i * 200,
              height: 300 + i * 200,
              background: subject.accentColor,
              opacity: 0.04,
              left: `${[10, 60, 30][i]}%`,
              top: `${[20, 50, 70][i]}%`,
              transform: "translate(-50%, -50%)",
              animation: `floatOrb ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i}s`,
            }}
          />
        ))}
      </div>

      {/* particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none rounded-full z-50"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 10,
            height: 10,
            background: p.color,
            animation: "particlePop 1.2s ease-out forwards",
          }}
        />
      ))}

      {/* streak popup */}
      {showStreakPop && (
        <div
          className="fixed top-1/4 left-1/2 z-50 text-white font-bold text-2xl pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            fontFamily: '"Bricolage Grotesque:Medium"',
            fontVariationSettings: '"opsz" 76, "wdth" 100',
            animation: "streakPop 0.9s ease-out forwards",
            textShadow: `0 0 20px ${subject.accentColor}`,
          }}
        >
          🔥 {streak} streak!
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        {/* top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-white/50 hover:text-white transition-colors bg-transparent border-0 outline-none cursor-pointer flex items-center gap-1.5"
            style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 14 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Exit
          </button>
          <div
            className="px-4 py-1.5 rounded-full text-white/80 text-sm"
            style={{ background: "rgba(255,255,255,0.1)", fontFamily: '"Bricolage Grotesque"' }}
          >
            {qIndex + 1} / {questions.length}
          </div>
          <div
            className="flex items-center gap-1.5 text-white/80 text-sm"
            style={{ fontFamily: '"Bricolage Grotesque"' }}
          >
            {streak > 0 && <span>🔥</span>}
            <span>{streak > 0 ? `${streak}` : "–"}</span>
          </div>
        </div>

        {/* progress bar */}
        <div className="h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${quizState === "feedback" ? finalProgress : progress}%`,
              background: subject.gradient,
              transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </div>

        {/* question card */}
        <div
          style={{
            opacity: questionVisible ? 1 : 0,
            transform: questionVisible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          <div
            className="rounded-3xl p-6 md:p-8 mb-6"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3"
              style={{ fontFamily: '"Bricolage Grotesque"', letterSpacing: "0.12em" }}>
              Question {qIndex + 1}
            </p>
            <p
              className="text-white leading-snug"
              style={{
                fontFamily: '"Bricolage Grotesque:Medium"',
                fontVariationSettings: '"opsz" 76, "wdth" 100',
                fontSize: "clamp(18px, 3vw, 24px)",
                letterSpacing: "-0.02em",
              }}
            >
              {currentQ.q}
            </p>
          </div>

          {/* answers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === currentQ.answer;
              const showingFeedback = quizState === "feedback";
              const col = ANSWER_COLORS[i % ANSWER_COLORS.length];

              let bg = col.bg;
              let border = "transparent";
              let textColor = col.text;
              if (showingFeedback) {
                if (isCorrect) { bg = "#D1FAE5"; border = "#10B981"; textColor = "#064E3B"; }
                else if (isSelected) { bg = "#FEE2E2"; border = "#EF4444"; textColor = "#7F1D1D"; }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={quizState !== "question"}
                  className="rounded-2xl p-4 text-left cursor-pointer border-2 outline-none"
                  style={{
                    background: bg,
                    borderColor: border,
                    color: textColor,
                    opacity: showingFeedback && !isCorrect && !isSelected ? 0.4 : 1,
                    transform: isSelected && showingFeedback
                      ? isCorrect ? "scale(1.02)" : "scale(0.98)"
                      : "scale(1)",
                    transition: "all 0.2s cubic-bezier(0.34,1.2,0.64,1)",
                    animation: !showingFeedback ? `answerPulse 0.3s ease ${i * 60}ms` : undefined,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{
                        background: showingFeedback && isCorrect ? "#10B981"
                          : showingFeedback && isSelected ? "#EF4444"
                          : col.accent,
                        color: "white",
                        fontFamily: '"Bricolage Grotesque"',
                      }}
                    >
                      {showingFeedback && isCorrect ? "✓" : showingFeedback && isSelected ? "✗" : ["A", "B", "C", "D"][i]}
                    </span>
                    <span style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 15, lineHeight: 1.45 }}>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* explanation */}
          {quizState === "feedback" && (
            <div
              className="mt-4 rounded-2xl p-4"
              style={{
                background: selected === currentQ.answer ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                border: `1px solid ${selected === currentQ.answer ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                animation: "fadeUp 0.3s ease",
              }}
            >
              <p className="font-semibold text-white text-sm mb-1" style={{ fontFamily: '"Bricolage Grotesque"' }}>
                {selected === currentQ.answer ? "✓ Correct!" : "✗ Not quite"}
              </p>
              <p className="text-white/70 text-sm" style={{ fontFamily: '"Bricolage Grotesque"', lineHeight: 1.5 }}>
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Quiz Results ───────────────────────────────────────────────────────────────
function QuizResults({
  score,
  course,
  subject,
  onRetry,
  onBack,
}: {
  score: number;
  course: Course;
  subject: Subject;
  onRetry: () => void;
  onBack: () => void;
}) {
  const [countedScore, setCountedScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let frame: number;
    const start = Date.now();
    const duration = 1200;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountedScore(Math.round(eased * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [mounted, score]);

  const grade = score >= 90 ? "🏆 Excellent!" : score >= 70 ? "⭐ Great work!" : score >= 50 ? "📈 Keep going!" : "💪 Keep studying!";
  const gradeColor = score >= 70 ? "#10B981" : score >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#0F0F14" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: subject.gradient, opacity: 0.12 }} />
      </div>

      <div
        className="relative z-10 max-w-md w-full text-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        {/* score ring */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
            <circle
              cx="80" cy="80" r="68" fill="none"
              stroke={gradeColor} strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 68}`}
              strokeDashoffset={`${2 * Math.PI * 68 * (1 - countedScore / 100)}`}
              style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 0.05s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-white font-bold leading-none"
              style={{
                fontFamily: '"Bricolage Grotesque:Medium"',
                fontVariationSettings: '"opsz" 96, "wdth" 100',
                fontSize: 40,
                letterSpacing: "-0.04em",
              }}
            >
              {countedScore}%
            </span>
          </div>
        </div>

        <h2
          className="text-white font-bold mb-2"
          style={{
            fontFamily: '"Bricolage Grotesque:Medium"',
            fontVariationSettings: '"opsz" 96, "wdth" 100',
            fontSize: 28,
            letterSpacing: "-0.03em",
          }}
        >
          {grade}
        </h2>
        <p className="text-white/50 mb-10" style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 16 }}>
          {course.name}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onRetry}
            className="w-full py-4 rounded-2xl font-semibold text-white cursor-pointer border-0 outline-none hover:scale-[1.02] active:scale-[0.98] transition-all"
            style={{
              fontFamily: '"Bricolage Grotesque:Medium"',
              fontVariationSettings: '"opsz" 76, "wdth" 100',
              fontSize: 17,
              letterSpacing: "-0.01em",
              background: subject.gradient,
            }}
          >
            Try Again
          </button>
          <button
            onClick={onBack}
            className="w-full py-4 rounded-2xl font-semibold cursor-pointer border-0 outline-none hover:scale-[1.02] active:scale-[0.98] transition-all"
            style={{
              fontFamily: '"Bricolage Grotesque:Medium"',
              fontVariationSettings: '"opsz" 76, "wdth" 100',
              fontSize: 17,
              letterSpacing: "-0.01em",
              background: "rgba(255,255,255,0.08)",
              color: "white",
            }}
          >
            Back to Course
          </button>
        </div>
      </div>
    </div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
type Screen =
  | { type: "splash" }
  | { type: "home" }
  | { type: "subject"; subjectId: string }
  | { type: "course"; subjectId: string; courseId: string }
  | { type: "quiz"; subjectId: string; courseId: string }
  | { type: "results"; subjectId: string; courseId: string; score: number };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: "splash" });
  const [transitioning, setTransitioning] = useState(false);

  const go = useCallback((next: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 180);
  }, []);

  const scores = getScores();

  return (
    <div
      style={{
        opacity: transitioning ? 0 : 1,
        transition: "opacity 0.18s ease",
        minHeight: "100vh",
      }}
    >
      {screen.type === "splash" && (
        <SplashScreen onDone={() => go({ type: "home" })} />
      )}
      {screen.type === "home" && (
        <HomeScreen
          onSelectSubject={(s) => go({ type: "subject", subjectId: s.id })}
        />
      )}
      {screen.type === "subject" && (() => {
        const subject = findSubjectById(screen.subjectId);
        if (!subject) return null;
        return (
          <SubjectScreen
            subject={subject}
            scores={scores}
            onBack={() => go({ type: "home" })}
            onSelectCourse={(c) => go({ type: "course", subjectId: subject.id, courseId: c.id })}
          />
        );
      })()}
      {screen.type === "course" && (() => {
        const data = findCourseById(screen.courseId);
        if (!data) return null;
        return (
          <CourseScreen
            course={data.course}
            subject={data.subject}
            onBack={() => go({ type: "subject", subjectId: data.subject.id })}
            onStartQuiz={() => go({ type: "quiz", subjectId: data.subject.id, courseId: data.course.id })}
          />
        );
      })()}
      {screen.type === "quiz" && (() => {
        const data = findCourseById(screen.courseId);
        if (!data) return null;
        return (
          <QuizScreen
            course={data.course}
            subject={data.subject}
            onFinish={(score) => go({ type: "results", subjectId: data.subject.id, courseId: data.course.id, score })}
            onBack={() => go({ type: "course", subjectId: data.subject.id, courseId: data.course.id })}
          />
        );
      })()}
      {screen.type === "results" && (() => {
        const data = findCourseById(screen.courseId);
        if (!data) return null;
        return (
          <QuizResults
            score={screen.score}
            course={data.course}
            subject={data.subject}
            onRetry={() => go({ type: "quiz", subjectId: data.subject.id, courseId: data.course.id })}
            onBack={() => go({ type: "course", subjectId: data.subject.id, courseId: data.course.id })}
          />
        );
      })()}
    </div>
  );
}
