import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import ProjectCard from "../ProjectCard";
import { projects } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const isPaused = useRef(false);
  const dragStartX = useRef(0);
  const trackStartX = useRef(0);
  const lastMoves = useRef<Array<{ x: number; t: number }>>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".proj-intro-anim, .project-card", {
          clearProps: "all",
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
        });
        return;
      }

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

      // Horizontal loop with autoplay, drag, wheel scroll, and momentum.
      const track = trackRef.current;
      const autoScrollSpeed = 34; // px per second

      function wrapX(x: number) {
        if (!track) return x;
        const half = track.scrollWidth / 2;
        if (!half) return x;
        // normalize into (-half, 0]
        while (x <= -half) x += half;
        while (x > 0) x -= half;
        return x;
      }

      function setTrackX(x: number) {
        if (!track) return;
        const wrapped = wrapX(x);
        currentX.current = wrapped;
        gsap.set(track, { x: wrapped });
      }

      // Wheel scroll (vertical wheel -> horizontal)
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY;
        setTrackX(currentX.current - delta);
      };

      const pauseLoop = () => {
        isPaused.current = true;
      };

      const resumeLoop = () => {
        isPaused.current = false;
      };

      // Pointer drag handlers
      const onPointerDown = (e: PointerEvent) => {
        isDragging.current = true;
        pauseLoop();
        dragStartX.current = e.clientX;
        trackStartX.current = currentX.current;
        lastMoves.current = [{ x: e.clientX, t: performance.now() }];
        (e.target as Element).setPointerCapture?.(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging.current) return;
        const delta = e.clientX - dragStartX.current;
        const next = trackStartX.current + delta;
        setTrackX(next);
        // store last moves for velocity
        const now = performance.now();
        lastMoves.current.push({ x: e.clientX, t: now });
        if (lastMoves.current.length > 6) lastMoves.current.shift();
      };

      const onPointerUp = (e: PointerEvent) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        // const now = performance.now();
        // compute velocity from lastMoves
        const moves = lastMoves.current;
        if (moves.length >= 2) {
          const first = moves[0];
          const last = moves[moves.length - 1];
          const dx = last.x - first.x;
          const dt = (last.t - first.t) || 16;
          const velocity = dx / dt; // px per ms
          // momentum animation using RAF
          let v = velocity * 1000; // px/s
          const friction = 0.95;
          let lastTime = performance.now();
          function momentumFrame() {
            const t = performance.now();
            const dtSec = (t - lastTime) / 1000;
            lastTime = t;
            v *= Math.pow(friction, dtSec * 60);
            const next = currentX.current + v * dtSec;
            setTrackX(next);
            if (Math.abs(v) > 5) requestAnimationFrame(momentumFrame);
          }
          requestAnimationFrame(momentumFrame);
        }
        lastMoves.current = [];
        (e.target as Element).releasePointerCapture?.(e.pointerId);
        if (e.pointerType !== "mouse") resumeLoop();
      };

      let autoFrameId = 0;
      let previousAutoTime = performance.now();

      function autoFrame(time: number) {
        const dt = (time - previousAutoTime) / 1000;
        previousAutoTime = time;

        if (!isDragging.current && !isPaused.current) {
          setTrackX(currentX.current - autoScrollSpeed * dt);
        }

        autoFrameId = requestAnimationFrame(autoFrame);
      }

      if (track) {
        track.addEventListener("pointerdown", onPointerDown);
        track.addEventListener("pointerenter", pauseLoop);
        track.addEventListener("pointerleave", resumeLoop);
        track.addEventListener("focusin", pauseLoop);
        track.addEventListener("focusout", resumeLoop);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        track.addEventListener("wheel", onWheel, { passive: false });
        autoFrameId = requestAnimationFrame(autoFrame);
      }

      // cleanup listeners when unmounting
      return () => {
        cancelAnimationFrame(autoFrameId);
        if (track) {
          track.removeEventListener("pointerdown", onPointerDown);
          track.removeEventListener("pointerenter", pauseLoop);
          track.removeEventListener("pointerleave", resumeLoop);
          track.removeEventListener("focusin", pauseLoop);
          track.removeEventListener("focusout", resumeLoop);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          track.removeEventListener("wheel", onWheel);
        }
      };
    },
    { scope: sectionRef }
  );

  return (
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

        {/* Projects Cards Track (horizontal loop) */}
        <div className="projects-track-wrapper relative w-full overflow-hidden">
          <div ref={trackRef} className="projects-track flex items-stretch gap-6">
            {[...projects, ...projects].map((proj, idx) => (
              <ProjectCard
                key={`${proj.title}-${idx}`}
                project={proj}
                index={idx % projects.length}
                compact
                className="flex-shrink-0 w-80 md:w-96"
              />
            ))}
          </div>
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
  );
}
