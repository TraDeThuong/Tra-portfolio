import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  label: string;
  description: string;
  items: string[];
}

const stack: SkillCategory[] = [
  {
    label: "Languages",
    description: "Core programming and markup languages.",
    items: ["TypeScript", "JavaScript ES6+", "HTML5", "CSS3"],
  },
  {
    label: "Frameworks & libs",
    description: "Modern rendering engines and state management.",
    items: [
      "React.js",
      "Next.js",
      "React Query",
      "Redux Toolkit",
      "React Router",
      "React Context API",
    ],
  },
  {
    label: "UI & styling",
    description: "Styling utilities and interactive animation engines.",
    items: [
      "Tailwind CSS",
      "GSAP",
      "Shadcn/ui",
      "Styled Components",
      "Bootstrap",
      "CSS Modules",
    ],
  },
  {
    label: "Dev tools",
    description: "Source control, design programs, and workflows.",
    items: [
      "Git / GitHub",
      "Figma",
      "VS Code",
      "Adobe Photoshop",
      "Adobe Illustrator",
    ],
  },
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = containerRef.current;

      // =========================
      // INTRO TIMELINE
      // =========================

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".ts-eyebrow", {
        y: 16,
        opacity: 0,
        duration: 0.5,
      })
        .from(
          ".ts-title-inner",
          {
            opacity: 0,
            y: 80,
            rotateX: 90,
            transformPerspective: 1000,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.2"
        )
        .from(
          ".ts-sub-inner",
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.6"
        );

      // =========================
      // FLOATING ORB
      // =========================

      gsap.to(".ts-orb", {
        y: 120,
        x: -80,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // =========================
      // ROW REVEAL + PARALLAX
      // =========================

      gsap.utils.toArray<HTMLElement>(".ts-row").forEach((row, i) => {
        const badges = row.querySelectorAll<HTMLElement>(".ts-badge");

        ScrollTrigger.create({
          trigger: row,
          start: "top 88%",
          onEnter: () => {
            gsap.to(row, {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              delay: i * 0.05,
            });

            gsap.to(badges, {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              stagger: 0.05,
              ease: "back.out(1.6)",
              delay: i * 0.05 + 0.2,
            });
          },
        });

        // Parallax
        gsap.to(row, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // =========================
        // 3D TILT EFFECT
        // =========================

        row.addEventListener("mousemove", (e) => {
          const rect = row.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const rotateY = gsap.utils.mapRange(
            0,
            rect.width,
            -6,
            6,
            x
          );

          const rotateX = gsap.utils.mapRange(
            0,
            rect.height,
            6,
            -6,
            y
          );

          gsap.to(row, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            transformOrigin: "center",
            duration: 0.4,
            ease: "power2.out",
          });
        });

        row.addEventListener("mouseleave", () => {
          gsap.to(row, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "elastic.out(1,0.5)",
          });
        });
      });

      // =========================
      // MAGNETIC BADGES
      // =========================

      const badges = gsap.utils.toArray<HTMLElement>(".ts-badge");

      badges.forEach((badge) => {
        const xTo = gsap.quickTo(badge, "x", {
          duration: 0.4,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(badge, "y", {
          duration: 0.4,
          ease: "power3.out",
        });

        badge.addEventListener("mousemove", (e) => {
          const rect = badge.getBoundingClientRect();

          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          xTo(x * 0.25);
          yTo(y * 0.25);

          gsap.to(badge, {
            scale: 1.08,
            duration: 0.25,
          });
        });

        badge.addEventListener("mouseleave", () => {
          xTo(0);
          yTo(0);

          gsap.to(badge, {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1,0.4)",
          });
        });
      });

      // =========================
      // FLOATING BADGE LOOP
      // =========================

      gsap.to(".ts-badge", {
        y: "random(-4,4)",
        duration: "random(2,4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.03,
          from: "random",
        },
      });

      // =========================
      // SPOTLIGHT EFFECT
      // =========================

      const spotlight = section?.querySelector(
        ".ts-spotlight"
      ) as HTMLDivElement;

      if (section && spotlight) {
        section.addEventListener("mousemove", (e) => {
          const rect = section.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(spotlight, {
            opacity: 1,
            background: `
              radial-gradient(
                circle at ${x}px ${y}px,
                rgba(255,255,255,0.08),
                transparent 240px
              )
            `,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        section.addEventListener("mouseleave", () => {
          gsap.to(spotlight, {
            opacity: 0,
            duration: 0.5,
          });
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden w-full px-6 py-24 bg-[#071c0b]"
    >
      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light pointer-events-none bg-[url('/noise.png')]" />

      {/* SPOTLIGHT */}
      <div className="ts-spotlight absolute inset-0 pointer-events-none opacity-0" />

      {/* FLOATING ORB */}
      <div className="ts-orb absolute top-0 left-1/2 w-[500px] h-[500px] rounded-full bg-brand-olivine/10 blur-3xl pointer-events-none -translate-x-1/2" />

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-16 relative z-10">
        <p className="ts-eyebrow text-xs tracking-[0.2em] uppercase text-brand-olivine mb-3">
          Tech stack
        </p>

        <div className="overflow-hidden mb-3">
          <h2 className="ts-title-inner text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
            What I work with
          </h2>
        </div>

        <div className="overflow-hidden">
          <p className="ts-sub-inner text-sm md:text-base text-gray-400 max-w-xl leading-relaxed">
            My development stack is tailored to building fast,
            modular, immersive, and beautifully interactive
            digital experiences.
          </p>
        </div>
      </div>

      {/* STACK */}
      <div className="max-w-4xl mx-auto flex flex-col relative z-10">
        {stack.map((cat) => (
          <div
            key={cat.label}
            className="
              ts-row
              group
              grid
              md:grid-cols-[180px_1fr]
              gap-5
              py-7
              border-t border-white/5
              opacity-0
              -translate-x-8
              transition-all
              duration-500
              hover:bg-white/[0.03]
              hover:px-5
              hover:rounded-3xl
              will-change-transform
            "
          >
            {/* LEFT */}
            <div className="flex items-start pt-1">
              <span
                className="
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  group-hover:text-brand-flax-300
                "
              >
                {cat.label}
              </span>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="
                      ts-badge
                      text-xs
                      text-gray-300
                      bg-white/5
                      border
                      border-white/[0.08]
                      px-3
                      py-1.5
                      rounded-full
                      opacity-0
                      scale-75
                      cursor-default
                      transition-all
                      duration-300
                      hover:text-brand-dark
                      hover:border-brand-flax-400/40
                      hover:bg-brand-flax-400
                      hover:shadow-[0_0_25px_rgba(248,231,43,0.18)]
                      backdrop-blur-sm
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="border-t border-white/5 mt-2" />

        
      </div>


    </section>
  );
}