import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactInfo, primaryEmail } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
];

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function Contact() {
  const footerRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".contact-reveal, .contact-card", {
          clearProps: "all",
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      gsap.fromTo(
        ".contact-reveal",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-card",
        { y: 28, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-card-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      const footer = footerRef.current;
      const spotlight = spotlightRef.current;
      if (!footer || !spotlight) return;

      const handlePointerMove = (event: PointerEvent) => {
        const rect = footer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        gsap.to(spotlight, {
          opacity: 1,
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(162,202,108,0.16), rgba(34,211,238,0.07) 190px, transparent 390px)`,
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const handlePointerLeave = () => {
        gsap.to(spotlight, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      };

      footer.addEventListener("pointermove", handlePointerMove);
      footer.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        footer.removeEventListener("pointermove", handlePointerMove);
        footer.removeEventListener("pointerleave", handlePointerLeave);
      };
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#030303] px-6 py-24 text-white"
    >
      <div ref={spotlightRef} className="absolute inset-0 opacity-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_0)] bg-[length:28px_28px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-olivine/50 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="flex flex-col gap-5">
            <span className="contact-reveal w-fit rounded-full border border-brand-olivine/20 bg-brand-olivine/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-brand-olivine">
              Contact
            </span>
            <h2 className="contact-reveal max-w-3xl text-5xl font-black leading-none tracking-tight text-white md:text-7xl font-display">
              Let&apos;s build something worth remembering.
            </h2>
          </div>

          <div className="contact-reveal flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <p className="text-sm leading-relaxed text-gray-400">
              I am open to frontend internships, collaboration, and product UI work where clean implementation and thoughtful interaction both matter.
            </p>
            <a
              href={`mailto:${primaryEmail}?subject=${encodeURIComponent("Portfolio collaboration inquiry")}`}
              className="group inline-flex w-fit items-center gap-3 rounded-xl bg-brand-olivine px-5 py-3 text-sm font-bold text-black transition duration-300 hover:bg-brand-flax"
            >
              Start a conversation
              <span className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        <div className="contact-card-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map(({ label, href, type }) => {
            const content = (
              <>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-olivine transition duration-300 group-hover:border-brand-olivine/30 group-hover:bg-brand-olivine/10">
                  <ArrowIcon />
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500 transition duration-300 group-hover:text-brand-olivine">
                  {type}
                </span>
                <span className="mt-2 block break-words text-sm font-semibold text-white">
                  {label}
                </span>
              </>
            );

            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card group min-h-44 rounded-2xl border border-white/10 bg-[#0c0c12]/80 p-5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-brand-olivine/25 hover:bg-[#111119]"
              >
                {content}
              </a>
            ) : (
              <div
                key={label}
                className="contact-card group min-h-44 rounded-2xl border border-white/10 bg-[#0c0c12]/80 p-5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-brand-olivine/25 hover:bg-[#111119]"
              >
                {content}
              </div>
            );
          })}
        </div>

        <div className="contact-reveal flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Huynh Thanh Tra
          </p>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-gray-500" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-lg border border-transparent px-3 py-2 transition duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
