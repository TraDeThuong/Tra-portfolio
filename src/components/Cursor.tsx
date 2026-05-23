import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Enable custom cursor styles
    document.body.classList.add("custom-cursor-active");

    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    // Center the elements
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power3" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power3" });
    
    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power3" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover states
    const onMouseEnterLink = () => {
      gsap.to(ring, { 
        scale: 2.0, 
        borderColor: "rgba(122, 243, 166, 0.8)", 
        backgroundColor: "rgba(6, 182, 212, 0.1)",
        duration: 0.2 
      });
      gsap.to(dot, { 
        scale: 0.2, 
        backgroundColor: "#e7f65c", 
        duration: 0.2 
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, { 
        scale: 1, 
        borderColor: "rgba(255, 255, 255, 0.4)", 
        backgroundColor: "transparent",
        duration: 0.2 
      });
      gsap.to(dot, { 
        scale: 1, 
        backgroundColor: "#0cdf61", 
        duration: 0.2 
      });
    };

    const addHoverListeners = () => {
      const links = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    // Apply hover listeners on DOM mutations
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-olivine rounded-full pointer-events-none z-100 transition-transform duration-75 hidden md:block"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 w-9 h-9 border-2 border-white/40 rounded-full pointer-events-none z-100 transition-transform duration-75 hidden md:block"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
