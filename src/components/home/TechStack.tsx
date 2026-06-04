import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const accents = [
  {
    label: "Core",
    border: "border-brand-flax/25",
    surface: "bg-brand-flax/10",
    text: "text-brand-flax",
    bar: "from-brand-flax to-brand-olivine",
  },
  {
    label: "Build",
    border: "border-brand-cyan/25",
    surface: "bg-brand-cyan/10",
    text: "text-brand-cyan",
    bar: "from-brand-cyan to-brand-reef",
  },
  {
    label: "UI",
    border: "border-brand-olivine/25",
    surface: "bg-brand-olivine/10",
    text: "text-brand-olivine",
    bar: "from-brand-olivine to-brand-flax",
  },
  {
    label: "Workflow",
    border: "border-white/15",
    surface: "bg-white/[0.06]",
    text: "text-gray-200",
    bar: "from-white to-brand-cyan",
  },
];

export default function TechStack() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".stack-intro, .stack-card, .stack-chip", {
          clearProps: "all",
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      gsap.fromTo(
        ".stack-intro",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".stack-card",
        { y: 34, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stack-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".stack-chip",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.025,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stack-grid",
            start: "top 76%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden border-y border-white/5 bg-[#040506] px-6 py-24"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[length:56px_56px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-flax/40 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="flex flex-col gap-7 lg:sticky lg:top-28">
          <div className="flex flex-col gap-4">
            <p className="stack-intro text-xs font-bold uppercase text-brand-olivine">
              Tech stack
            </p>
            <h2 className="stack-intro max-w-xl text-4xl font-black leading-tight text-white md:text-6xl font-display">
              Tools I use to ship polished interfaces.
            </h2>
            <p className="stack-intro max-w-lg text-sm leading-relaxed text-gray-400 md:text-base">
              My stack is centered on React product work: strong fundamentals, component-driven UI, responsive styling, and enough backend awareness to collaborate across full-stack flows.
            </p>
          </div>

          <div className="stack-intro grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="border-r border-white/10 p-4">
              <span className="block text-2xl font-black text-white">4</span>
              <span className="text-xs text-gray-500">Focus areas</span>
            </div>
            <div className="border-r border-white/10 p-4">
              <span className="block text-2xl font-black text-white">18+</span>
              <span className="text-xs text-gray-500">Tools</span>
            </div>
            <div className="p-4">
              <span className="block text-2xl font-black text-white">React</span>
              <span className="text-xs text-gray-500">Main lane</span>
            </div>
          </div>
        </div>

        <div className="stack-grid grid grid-cols-1 gap-5 md:grid-cols-2">
          {skillCategories.map((category, index) => {
            const accent = accents[index % accents.length];

            return (
              <article
                key={category.label}
                className={`stack-card group min-h-[280px] rounded-2xl border ${accent.border} bg-[#0c0c12]/85 p-6 shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:bg-[#111119]`}
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <span className={`w-fit rounded-full border ${accent.border} ${accent.surface} px-3 py-1 text-xs font-bold ${accent.text}`}>
                      {accent.label}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white font-display">
                      {category.label}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  {category.description}
                </p>

                <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className={`h-full w-[78%] rounded-full bg-linear-to-r ${accent.bar} transition-all duration-500 group-hover:w-[92%]`} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="stack-chip rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-medium text-gray-300 transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
