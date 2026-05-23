import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Spotlight Text ───────────────────────────────────────────────────────────
function SpotlightText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const state = useRef({ rx: 0, ry: 0, radius: 0, target: 0 });

  const tick = useCallback(() => {
    const s = state.current;
    s.radius += (s.target - s.radius) * 0.12;
    const r = Math.round(s.radius);
    if (revealRef.current) {
      const mask = `radial-gradient(circle ${r}px at ${Math.round(s.rx)}px ${Math.round(s.ry)}px, black 0%, black 40%, transparent 70%)`;
      revealRef.current.style.webkitMaskImage = mask;
      revealRef.current.style.maskImage = mask;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    state.current.rx = e.clientX - rect.left;
    state.current.ry = e.clientY - rect.top;
  }, []);

  const handleMouseEnter = useCallback(() => { state.current.target = 110; }, []);
  const handleMouseLeave = useCallback(() => { state.current.target = 0; }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-gray-500 leading-relaxed font-light select-none">
        {children}
      </div>
      <div
        ref={revealRef}
        className="absolute inset-0 text-white leading-relaxed font-light select-none pointer-events-none"
        style={{
          WebkitMaskImage: "radial-gradient(circle 0px at -200px -200px, black 0%, transparent 70%)",
          maskImage: "radial-gradient(circle 0px at -200px -200px, black 0%, transparent 70%)",
        }}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
export default function About() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // cột trái — slide từ trái vào
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // cột phải — slide từ phải vào
      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

    });

    return () => ctx.revert(); 
  }, []);

  return (
    <section
      id="about"
      className="w-full px-6 py-32 bg-[#050508] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-flax/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

        {/* CỘT TRÁI */}
        <div ref={leftRef} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-brand-cyan">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
              Huynh Thanh Tra
            </h2>
          </div>

          <SpotlightText className="text-base md:text-lg">
            As a final-year IT student at Posts and Telecommunications Institute
            of Technology, I am passionate about creating digital experiences
            where logic and creativity coexist. I enjoy transforming ideas into
            interactive interfaces through clean code and thoughtful design. With
            experience in ReactJS and a strong foundation in UI/UX principles, I
            have developed various academic and personal projects focused on
            front-end development.
          </SpotlightText>

          <SpotlightText className="text-sm md:text-base">
            Currently, I am continuously improving my skills in Figma and modern
            web technologies to move closer toward becoming a full-stack
            developer — someone who can seamlessly bridge design and development
            while creating products that are both visually engaging and
            user-centered.
          </SpotlightText>

          <div className="flex items-center gap-4 mt-2">
            <Link
              to="/cv"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-100 bg-brand-cyan hover:bg-brand-cyan/80 transition-all duration-300 shadow-lg shadow-brand-cyan/15 hover:scale-105"
            >
              Download CV
            </Link>
            <Link
              to="/projects"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              Browse Projects
            </Link>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div ref={rightRef} className="flex justify-center items-center">
          <div className="relative group w-full max-w-95 aspect-square rounded-3xl overflow-hidden shadow-2xl bg-brand-card border border-white/10 glow-card">
            <div className="absolute inset-0 bg-linear-to-br from-brand-flax/20 to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/Tra.jpg"
              alt="Huynh Thanh Tra Profile"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur border border-white/10 text-[10px] uppercase font-bold tracking-widest text-brand-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              Available for Internships
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}