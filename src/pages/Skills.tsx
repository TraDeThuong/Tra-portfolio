import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigate from "../components/Navigate";
import { roadmapItems, skillCategories } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".header-anim, .card-anim, .tag-anim, .roadmap-title-anim, .milestone-anim", {
        clearProps: "all",
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      });
      return;
    }

    const tl = gsap.timeline();

    // --- Animation load trang ban đầu ---
    tl.fromTo(
      ".header-anim",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
    );

    tl.fromTo(
      ".card-anim",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.6" 
    );

    tl.fromTo(
      ".tag-anim",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.03, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // --- 2. Scroll Animation cho Lộ trình 3 năm ---
    // Hiệu ứng hiện tiêu đề lộ trình
    gsap.fromTo(
      ".roadmap-title-anim",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".roadmap-section",
          start: "top 80%", // Kích hoạt khi đỉnh phần roadmap chạm 80% chiều cao màn hình
        }
      }
    );

    // Hiệu ứng hiện tuần tự các cột mốc (Milestones) khi cuộn xuống
    gsap.fromTo(
      ".milestone-anim",
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".roadmap-timeline",
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  // Hover Effect bằng GSAP cho các card kỹ năng hiện tại
  const onCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -8,
      scale: 1.02,
      borderColor: "rgba(255, 255, 255, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const onCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.05)",
      backgroundColor: "transparent",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const futureGoal = "I am focused on becoming an internship-ready Frontend Developer who can turn visual ideas into accessible, responsive, and production-minded React interfaces. My next step is expanding into backend fundamentals so I can contribute across complete full-stack product flows.";

  return (
    <section ref={containerRef} className="min-h-screen bg-[#030303] text-gray-100 pb-32 pt-24 relative overflow-hidden">
      <Navigate />
      
      {/* Current Skills Section */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <h1 className="header-anim text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display mb-4">
          Skills &amp; Future Direction
        </h1>
        <p className="header-anim text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
          {futureGoal}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {skillCategories.map((cat, idx) => (
          <div 
            key={idx} 
            className="card-anim bg-brand-card border border-white/5 p-6 rounded-2xl transition-shadow duration-300"
            onMouseEnter={onCardMouseEnter}
            onMouseLeave={onCardMouseLeave}
          >
            <h2 className="text-xl font-bold text-white mb-4">{cat.label}</h2>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item, i) => (
                <span
                  key={i}
                  className="tag-anim text-[10px] text-gray-300 bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-lg font-medium backdrop-blur-sm inline-block"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- 3. UI Lộ Trình Tương Lai (3-Year Roadmap) --- */}
      <div className="roadmap-section max-w-5xl mx-auto px-6 border-t border-white/5 pt-20">
        <div className="roadmap-title-anim mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            The 3-Year Growth Roadmap
          </h2>
          <p className="text-gray-400 max-w-2xl">
            My strategic learning path to expand horizons from a UI specialist into an engineered Full-Stack Developer.
          </p>
        </div>

        {/* Timeline Line */}
        <div className="roadmap-timeline relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
          {roadmapItems.map((milestone, idx) => (
            <div key={idx} className="milestone-anim relative pl-8 md:pl-10">
              
              {/* Timeline Bullet/Dot */}
              <span className="absolute -left-[7px] top-1.5 bg-white border-4 border-[#030303] w-3.5 h-3.5 rounded-full z-10 custom-glow" />

              {/* Roadmap Content Card */}
              <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
                <span className="text-xs font-bold tracking-widest uppercase text-brand-olivine block mb-1">
                  {milestone.year}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed max-w-3xl">
                  {milestone.description}
                </p>

                {/* Future Technology Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {milestone.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-brand-flax/90 bg-brand-olivine/5 border border-brand-olivine/10 px-2 py-0.5 rounded font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
