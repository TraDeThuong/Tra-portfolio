import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

const HERO_FULL_TEXT = "Designing & Developing Premium Digital Products with Code & Art";

const HERO_CONFIG = {
  smoothing: 0.12,
  movementThreshold: 0.01,
  sizeFromSpeed: 0.25,
  expandMultiplier: 3.5,
  expandTime: 2.2,
  expandEase: "power2.out",
  dissolveStart: 1.8,
  dissolveTime: 2.5,
  dissolveEase: "power2.in",
};

export default function Hero() {
  const heroSection = useRef<HTMLElement | null>(null)
  const smudgeSVG = useRef<SVGSVGElement | null>(null)
  const smudgeContainer = useRef<SVGGElement | null>(null)
  const titleContainerRef = useRef<HTMLDivElement | null>(null)

  const pointer = useRef({ x: 0, y: 0 })
  const smoothPointer = useRef({ x: 0, y: 0 })
  const hasStarted = useRef(false)

  // Typing animation state
  const [typedText, setTypedText] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? HERO_FULL_TEXT
      : ""
  )

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let idx = 0;
    const timer = setInterval(() => {
      if (idx <= HERO_FULL_TEXT.length) {
        setTypedText(HERO_FULL_TEXT.slice(0, idx));
        idx++;
      } else {
        clearInterval(timer);
      }
    }, 35);
    return () => clearInterval(timer);
  }, []);

  function onPointerMove(x: number, y: number) {
    if (!heroSection.current) return
    const rect = heroSection.current.getBoundingClientRect()
    const relativeX = x - rect.left
    const relativeY = y - rect.top
    
    if (!hasStarted.current) {
      pointer.current.x = smoothPointer.current.x = relativeX
      pointer.current.y = smoothPointer.current.y = relativeY
      hasStarted.current = true
      return
    }
    pointer.current.x = relativeX
    pointer.current.y = relativeY
  }

  useEffect(() => {
    const section = heroSection.current
    if (!section) return
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY)
    section.addEventListener("mousemove", handleMouseMove)
    return () => section.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const section = heroSection.current
    if (!section) return
    const handleTouchStart = (e: TouchEvent) => onPointerMove(e.touches[0].clientX, e.touches[0].clientY)
    section.addEventListener("touchstart", handleTouchStart, { passive: true })
    return () => section.removeEventListener("touchstart", handleTouchStart)
  }, [])

  useEffect(() => {
    const section = heroSection.current
    if (!section) return
    const handleTouchMove = (e: TouchEvent) => onPointerMove(e.touches[0].clientX, e.touches[0].clientY)
    section.addEventListener("touchmove", handleTouchMove, { passive: true })
    return () => section.removeEventListener("touchmove", handleTouchMove)
  }, [])

  useEffect(() => {
    function matchSVGToViewport() {
      if (!smudgeSVG.current || !heroSection.current) return
      const rect = heroSection.current.getBoundingClientRect()
      smudgeSVG.current.setAttribute("width", String(rect.width))
      smudgeSVG.current.setAttribute("height", String(rect.height))
      smudgeSVG.current.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`)
    }
    matchSVGToViewport()
    window.addEventListener("resize", matchSVGToViewport)
    return () => window.removeEventListener("resize", matchSVGToViewport)
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function stampSmudgeAt(x: number, y: number, radius: number) {
      if (!smudgeContainer.current) return
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", String(x))
      circle.setAttribute("cy", String(y))
      circle.setAttribute("r", String(radius))
      circle.setAttribute("fill", "#fff")
      smudgeContainer.current.appendChild(circle)

      const animateRadius = { current: radius }

      const timeline = gsap.timeline({
        onUpdate() {
          circle.setAttribute("r", String(Math.max(0, animateRadius.current)))
        },
        onComplete() {
          timeline.kill()
          circle.remove()
        }
      })

      timeline.to(animateRadius, {
        current: radius * HERO_CONFIG.expandMultiplier,
        duration: HERO_CONFIG.expandTime,
        ease: HERO_CONFIG.expandEase
      })

      timeline.to(animateRadius, {
        current: 0,
        duration: HERO_CONFIG.dissolveTime,
        ease: HERO_CONFIG.dissolveEase
      }, HERO_CONFIG.dissolveStart)
    }

    let rafId: number

    function update() {
      if (hasStarted.current) {
        smoothPointer.current.x += (pointer.current.x - smoothPointer.current.x) * HERO_CONFIG.smoothing
        smoothPointer.current.y += (pointer.current.y - smoothPointer.current.y) * HERO_CONFIG.smoothing

        const speed = Math.hypot(
          pointer.current.x - smoothPointer.current.x,
          pointer.current.y - smoothPointer.current.y
        )

        if (speed > HERO_CONFIG.movementThreshold) {
          stampSmudgeAt(
            smoothPointer.current.x,
            smoothPointer.current.y,
            speed * HERO_CONFIG.sizeFromSpeed
          )
        }
      }

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Intro text animations using GSAP
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(".hero-animate", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    )
  }, { scope: titleContainerRef })

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-brand-dark"
      ref={heroSection}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-radial from-[#0d071a] via-[#030303] to-[#030303] select-none pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        
        <div className="flex flex-col items-center justify-center text-center px-6" ref={titleContainerRef}>
          <span className="hero-animate text-xs uppercase tracking-[0.3em] text-brand-olivine/60 font-semibold mb-3">
            Creative Portfolio
          </span>
          <h2 className="hero-animate text-5xl md:text-8xl font-black tracking-tight text-white/5 uppercase select-none font-display">
            HUYNH THANH TRA
          </h2>
          <p className="hero-animate text-sm md:text-base text-gray-500 max-w-md mt-4 font-light select-none">
            [ Move your cursor or swipe to reveal the creative developer behind the code ]
          </p>
        </div>

        {/* CTA Buttons — restored & upgraded */}
        <div className="hero-animate absolute bottom-28 flex items-center justify-center gap-4 pointer-events-auto">
          <Link
            to="/projects"
            className="group relative px-7 py-3.5 border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur text-sm font-medium rounded-xl text-white transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Work
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
          <Link
            to="/contact"
            className="group relative px-7 py-3.5 border border-brand-olivine/20 bg-brand-olivine/10 hover:bg-brand-olivine/20 text-sm font-medium rounded-xl text-brand-olivine transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute inset-0 bg-gradient-to-r from-brand-olivine/0 via-brand-olivine/10 to-brand-olivine/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </div>
      </div>

      <svg
        ref={smudgeSVG}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 pointer-events-none w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="smudge-goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 70 -16
              "
              result="goo"
            />
          </filter>

          <mask id="smudge-mask">
            <g filter="url(#smudge-goo)" ref={smudgeContainer} />
          </mask>
        </defs>

        <foreignObject
          x="0" y="0"
          width="100%"
          height="100%"
          mask="url(#smudge-mask)"
        >
          <div
            style={{
              width: "100%", 
              height: "100%", 
              backgroundImage: "url('/hero-background.png')", 
              backgroundSize: "cover", 
              backgroundPosition: "center",
              maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            }}
            className="flex flex-col items-center justify-center text-white"
          >
            <div className="flex flex-col items-center justify-center text-center px-6">
              <span className="text-sm font-bold tracking-[0.25em] text-brand-dark uppercase bg-brand-olivine/10 px-3 py-1 rounded-full border border-brand-olivine/20 mb-4 animate-pulse-slow">
                Full Stack Developer
              </span>
              <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-brand-olivine font-display filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                Huynh Thanh Tra
              </h1>
              <p className="text-lg md:text-2xl text-gray-500 font-light mt-4 max-w-xl">
                {typedText}
                <span className="inline-block w-0.5 h-6 bg-brand-olivine/60 ml-1 animate-pulse" />
              </p>
            </div>
          </div>
        </foreignObject>
      </svg>

      {/* Scroll Indicator — improved */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 pointer-events-none select-none">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-9 border border-gray-600 rounded-full flex justify-center p-1.5">
          <div className="w-1 h-2 bg-brand-olivine rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
