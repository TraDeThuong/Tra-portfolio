import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { githubUrl, primaryEmail } from "../data/portfolio";

export default function Navigate() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const links = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const activePath = location.pathname;

  // Scroll-based nav shrink
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic hover effect on desktop nav links
  const handleLinkMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.2,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleLinkMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  // Mobile menu GSAP animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".mobile-nav-link",
        { y: 30, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-40 glass-nav shadow-2xl shadow-black/30 transition-all duration-500 ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link to="/home" className="flex items-center gap-2 group">
          <img
            src="/profile.png"
            alt="Huynh Thanh Tra"
            className={`rounded-full transition-all duration-500 ${
              scrolled ? "w-10 h-10" : "w-12 h-12"
            }`}
          />
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-olivine transition-colors duration-300">
            HUYNH THANH TRA
            <span className="text-brand-flax">.</span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link, idx) => {
              const isActive = activePath === link.path;
              return (
                <li key={link.name} className="relative">
                  <Link
                    ref={(el) => { linksRef.current[idx] = el; }}
                    to={link.path}
                    onMouseMove={handleLinkMouseMove}
                    onMouseLeave={handleLinkMouseLeave}
                    className={`px-5 py-2 text-sm font-medium transition-colors duration-300 relative block rounded-lg ${
                      isActive ? "text-brand-olivine" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-5 right-5 h-[2px] bg-gradient-to-r from-brand-flax to-brand-olivine rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 text-white focus:outline-none"
          aria-label="Toggle menu"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
        >
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 origin-center ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 origin-center ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation Menu Drawer */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-[#030303]/95 backdrop-blur-xl z-30 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-8 text-center" onClick={(event) => event.stopPropagation()}>
          {links.map((link) => {
            const isActive = activePath === link.path;
            return (
              <li key={link.name} className="mobile-nav-link">
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-display font-semibold transition-colors duration-300 ${
                    isActive ? "text-brand-olivine" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="block w-8 h-0.5 bg-gradient-to-r from-brand-flax to-brand-olivine rounded-full mx-auto mt-2" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile social links */}
        <div className="flex items-center gap-6 mt-8">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.16-1.11-1.47-1.11-1.47-.91-.64.07-.63.07-.63 1 .07 1.53 1.04 1.53 1.04.9 1.55 2.36 1.1 2.94.84.09-.66.35-1.1.64-1.35-2.22-.26-4.55-1.13-4.55-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03A9.37 9.37 0 0112 7.81c.86.01 1.73.12 2.54.35 1.9-1.3 2.74-1.03 2.74-1.03.55 1.41.2 2.45.1 2.71.64.71 1.02 1.62 1.02 2.73 0 3.9-2.34 4.76-4.57 5.01.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .28.18.6.69.5A10.27 10.27 0 0022 12.25C22 6.58 17.52 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href={`mailto:${primaryEmail}`}
            className="text-gray-500 hover:text-white transition-colors duration-300"
            aria-label="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
