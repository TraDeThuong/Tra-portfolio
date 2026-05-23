import Navigate from "../components/Navigate";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
export default function Projects() {
  const projects = [
    {
      title: "WorldWise",
      link: "https://xva-worldwise.netlify.app",
      github: "https://github.com/TraDeThuong/worldwise",
      description:
        "A modern travel tracking application that allows users to mark and explore cities around the world on an interactive map. Users can save memorable experiences, organize visited locations, and visualize their journeys through a clean and intuitive interface.",
      tech: ["React", "React Router", "CSS Modules", "Leaflet"],
      category: "frontend",
    },
    {
      title: "The Wild Oasis Website",
      link: "https://the-wild-oasis-website-virid-sigma.vercel.app",
      github: "https://github.com/TraDeThuong/wild-oasis-website",
      description:
        "A modern guest-facing luxury cabin rental website built with Next.js. The platform allows guests to browse cabins, manage profiles, explore booking information, and enjoy a seamless responsive experience designed for premium hospitality services.",
      tech: ["Next.js", "React", "Supabase", "Tailwind CSS"],
      category: "fullstack",
    },
    {
      title: "Fast React Pizza Co",
      link: "https://fast-react-pizza-jey6u002i-tradethuongs-projects.vercel.app",
      github: "https://github.com/TraDeThuong/fast-react-pizza",
      description:
        "A responsive pizza ordering web application built with React, Vite, Tailwind CSS, Redux Toolkit, and React Router. The system delivers a smooth ordering experience with dynamic cart management and optimized state handling.",
      tech: [
        "React",
        "Vite",
        "Redux Toolkit",
        "Tailwind CSS",
        "React Router",
      ],
      category: "frontend",
    },
    {
      title: "The Wild Oasis",
      link: "https://tra-the-wild-oasis.netlify.app",
      github: "https://github.com/TraDeThuong/wild-oasis",
      description:
        "A hotel and resort management web application built with React.js. The platform supports cabin management, reservations, customer management, booking operations, and administrative dashboards for efficient resort management.",
      tech: ["React", "Styled Components", "Supabase", "React Query"],
      category: "fullstack",
    },
    {
      title: "8Express",
      link: "",
      github: "https://github.com/TraDeThuong/8express",
      description:
        "A full-stack social media and forum platform developed using ExpressJS, ReactJS, Tailwind CSS, Sequelize, and MySQL. The system includes user management, post moderation, analytics dashboards, AI-assisted content moderation, commenting, sharing, and social interaction features.",
      tech: [
        "ExpressJS",
        "ReactJS",
        "Tailwind CSS",
        "Sequelize",
        "MySQL",
      ],
      category: "fullstack",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Intro headers fade in
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

      // Projects card stagger reveal
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3D tilt effect on cards
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

      {/* GitHub Button */}
      <div className="flex justify-center mt-10">
        <a
          href="https://github.com/TraDeThuong"
          target="_blank"
          rel="noopener noreferrer"
          className="m-20 px-12 py-3 rounded-2xl border border-zinc-700 bg-zinc-900/70 backdrop-blur-md 
          hover:bg-zinc-800 transition-all duration-300 hover:scale-105 
          shadow-lg shadow-black/30"
        >
          View My GitHub
        </a>
      </div>

      <section
      id="projects"
      ref={sectionRef}
      className="relative w-full px-6 py-28 bg-[#030303] overflow-hidden border-t border-white/5"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-olivine/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-flax/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="proj-intro-anim text-xs uppercase tracking-[0.25em] text-brand-olivine font-bold">
              Selected Works
            </span>
            <h2 className="proj-intro-anim text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              Projects I've Built
            </h2>
          </div>
          <p className="proj-intro-anim text-gray-400 text-sm font-light max-w-sm leading-relaxed">
            A curated selection of web applications showcasing frontend skills, API integration, database management, and responsive UI layouts.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="project-card group relative flex flex-col justify-between p-8 rounded-3xl glass-panel glow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15 will-change-transform"
            >
              {/* Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Project Index Number */}
              <span className="absolute top-4 right-4 text-[10px] font-mono text-white/10 font-bold group-hover:text-brand-olivine/30 transition-colors duration-500">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col gap-5">
                {/* Title and Link Indicator */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-white font-display tracking-tight group-hover:text-brand-flax transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-olivine group-hover:text-black transition-all duration-300 hover:scale-110"
                        aria-label={`Visit live demo for ${proj.title}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </a>
                    )}
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-flax hover:text-black transition-all duration-300 hover:scale-110"
                        aria-label={`View source code for ${proj.title}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.16-1.11-1.47-1.11-1.47-.91-.64.07-.63.07-.63 1 .07 1.53 1.04 1.53 1.04.9 1.55 2.36 1.1 2.94.84.09-.66.35-1.1.64-1.35-2.22-.26-4.55-1.13-4.55-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03A9.37 9.37 0 0112 7.81c.86.01 1.73.12 2.54.35 1.9-1.3 2.74-1.03 2.74-1.03.55 1.41.2 2.45.1 2.71.64.71 1.02 1.62 1.02 2.73 0 3.9-2.34 4.76-4.57 5.01.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .28.18.6.69.5A10.27 10.27 0 0022 12.25C22 6.58 17.52 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-8">
                {proj.tech.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-[10px] text-gray-300 bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-lg font-medium backdrop-blur-sm hover:border-brand-olivine/30 hover:text-white transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="proj-intro-anim flex justify-center">
          <Link
            to="/projects"
            className="group flex items-center gap-3 px-8 py-3.5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-sm font-medium text-gray-400 hover:text-white"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
}