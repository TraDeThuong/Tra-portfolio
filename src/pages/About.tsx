import { useRef } from "react";
import Navigate from "../components/Navigate";
import Contact from "../components/Contact";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  side: "left" | "right";
}

const timelineData: TimelineItem[] = [
  {
      year: "2022 - Present",
      title: "PTIT Ho Chi Minh",
      subtitle: "Multimedia Technology Student",
      description:
        "Currently studying Multimedia Technology at Posts and Telecommunications Institute of Technology (PTIT HCMC), focusing on frontend development, interactive design, and creative digital experiences.",
      side: "right",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get the exact path drawing length
    const pathLength = path.getTotalLength();
    
    // Set initial dash attributes
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate drawing path on scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 25%",
        end: "bottom 75%",
        scrub: 0.5,
      },
    });

    // Staggered slide-in for timeline item cards
    const items = gsap.utils.toArray(".timeline-item");
    items.forEach((item: any) => {
      const isLeft = item.classList.contains("item-left");
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: isLeft ? -80 : 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Intro text fade-in
    gsap.fromTo(
      ".about-intro-anim",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-20 bg-[#030303] min-h-screen">
      <Navigate />

      {/* Hero Header */}
      <section className="px-6 py-20 max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="about-intro-anim text-xs uppercase tracking-[0.25em] text-brand-olivine font-bold">
            My Biography
          </span>
          <h1 className="about-intro-anim text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display">
            The Journey & Mission
          </h1>
        </div>

        <div className="about-intro-anim grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 items-start">
          <div className="flex flex-col gap-6 text-gray-400 font-light leading-relaxed">
            <p>
              My name is <strong className="text-white font-medium">Huynh Thanh Tra</strong>, a Multimedia Technology student who finds inspiration in both art and technology. I’ve always been drawn to creative expression, dreamy visuals, and emotional design, but over time, I also discovered a strong interest in the logic and problem-solving side of programming.
            </p>
            <p>
              I came to coding quite late, as my original direction was more connected to art and design. However, the more I learned about development, the more I realized that programming is also a creative process — a way to turn ideas and emotions into interactive experiences.
            </p>
            <p>
              Currently, I’m focusing on improving my skills as a Frontend Developer, especially in UI/UX, motion, and modern web experiences. In the future, I hope to continue growing toward becoming a Fullstack Developer and build digital products that combine both creativity and technology.
            </p>
            <p>
              A girl between art and technology — designing dreams through code.
            </p>
          </div>

          <div className="bg-brand-card border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-white font-bold font-display">Core Philosophies</h3>
            <ul className="flex flex-col gap-3 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-brand-olivine">✓</span>
                <span>Details over speed. Perfect padding, smooth alignments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-olivine">✓</span>
                <span>Semantic structures for accessibility and optimal SEO.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-olivine">✓</span>
                <span>Optimized assets and component lifecycles for speed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-olivine">✓</span>
                <span>Always learning. Adapting to the modern standards.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 py-24 bg-[#050508] border-t border-white/5" ref={triggerRef}>
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-brand-flax font-bold">Timeline</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">Education & Milestones</h2>
          </div>

          {/* Interactive Scroll Timeline Container */}
          <div className="relative mt-12">
            
            {/* Center Timeline Path Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-white/5 pointer-events-none">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 1000">
                <line x1="1" y1="0" x2="1" y2="1000" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              </svg>
            </div>

            {/* Glowing active path line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 pointer-events-none">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none">
                <path
                  ref={pathRef}
                  d="M1 0 L1 1500"
                  stroke="url(#timeline-glow-gradient)"
                  strokeWidth="2.5"
                />
                <defs>
                  <linearGradient id="timeline-glow-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5f3b7" />
                    <stop offset="100%" stopColor="#a2ca6c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Timeline Cards Container */}
            <div className="flex flex-col gap-12 relative z-10 pl-10 md:pl-0">
              {timelineData.map((item, idx) => {
                const isLeft = item.side === "left";
                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row w-full md:justify-between items-start timeline-item ${
                      isLeft ? "item-left md:flex-row-reverse" : "item-right"
                    }`}
                  >
                    {/* Node Dot indicator */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-olivine shadow-lg shadow-brand-olivine/20 z-20" />

                    {/* Timeline Item Details Card */}
                    <div className="w-full md:w-[45%] p-6 rounded-2xl bg-brand-card border border-white/5 hover:border-white/10 transition-colors duration-300 relative shadow-xl">
                      {/* Triangle tooltip marker for desktop */}
                      <div className={`hidden md:block absolute top-5 w-3 h-3 bg-brand-card border-t border-l border-white/5 rotate-45 ${
                        isLeft ? "-right-1.5 border-r border-b-0 border-l-0" : "-left-1.5"
                      }`} />

                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-brand-olivine uppercase tracking-wider font-display">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-bold text-white font-display">
                          {item.title}
                        </h3>
                        <span className="text-xs text-gray-500 font-medium">
                          {item.subtitle}
                        </span>
                        <p className="text-xs text-gray-400 leading-relaxed font-light mt-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Spacer layout element for side alignment */}
                    <div className="hidden md:block w-[45%]" />
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Footer component */}
      <Contact />
    </div>
  );
}
