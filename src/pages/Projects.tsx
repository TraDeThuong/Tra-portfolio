import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigate from "../components/Navigate";
import ProjectCard from "../components/ProjectCard";
import { githubUrl, projects } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".proj-intro-anim, .project-card", {
          clearProps: "all",
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
        });
        return;
      }

      gsap.fromTo(
        ".proj-intro-anim",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateY = gsap.utils.mapRange(0, rect.width, -4, 4, x);
          const rotateX = gsap.utils.mapRange(0, rect.height, 4, -4, y);

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 800,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "elastic.out(1,0.5)",
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigate />

      <section
        id="projects"
        ref={sectionRef}
        className="relative w-full px-6 pb-28 pt-36 bg-[#030303] overflow-hidden border-t border-white/5"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-olivine/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-flax/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col gap-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="proj-intro-anim text-xs uppercase tracking-[0.25em] text-brand-olivine font-bold">
                Selected Works
              </span>
              <h1 className="proj-intro-anim text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display">
                Projects I've Built
              </h1>
            </div>
            <div className="proj-intro-anim flex flex-col gap-4 md:items-end">
              <p className="text-gray-400 text-sm font-light max-w-sm leading-relaxed md:text-right">
                A focused collection of web applications showing frontend craft, state management, API integration, and responsive UI decisions.
              </p>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/70 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105 hover:bg-zinc-800"
              >
                View My GitHub
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="proj-intro-anim flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-flax font-bold">
                Featured Projects
              </span>
              <p className="max-w-2xl text-sm text-gray-400">
                These projects best represent my current direction: polished React interfaces, practical data flows, and product-minded UI structure.
              </p>
            </div>

            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={idx}
                  className="min-h-full"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="proj-intro-anim flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-olivine font-bold">
                Full Archive
              </span>
              <p className="max-w-2xl text-sm text-gray-400">
                Additional practice projects covering maps, ordering flows, dashboards, and full-stack feature design.
              </p>
            </div>

            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
              {archiveProjects.map((project, idx) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={idx}
                  compact
                  className="min-h-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
