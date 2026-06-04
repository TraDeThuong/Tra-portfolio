import { useState, useRef } from "react";
import type { FormEvent } from "react";
import Navigate from "../components/Navigate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import emailjs from "@emailjs/browser";
import { contactInfo, primaryEmail } from "../data/portfolio";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(() => {
    // Stagger fade animations
    gsap.fromTo(
      ".contact-anim",
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out" }
    );
  }, { scope: containerRef });

  const openMailFallback = () => {
    const fallbackSubject = subject || `Portfolio inquiry from ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    window.location.href = `mailto:${primaryEmail}?subject=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || !formRef.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      openMailFallback();
      setStatus("error");
      return;
    }

    setStatus("sending");

    emailjs
      .sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      )
      .then(
        () => {
          setStatus("success");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        },
        (error) => {
          console.error("EmailJS Error details:", error);
          setStatus("error");
          openMailFallback();
        }
      );
  };

  return (
    <div ref={containerRef} className="pt-20 bg-[#030303] min-h-screen">
      <Navigate />

      <section className="px-6 py-20 max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header Block */}
        <div className="flex flex-col gap-3">
          <span className="contact-anim text-xs uppercase tracking-[0.25em] text-brand-olivine font-bold">
            Get In Touch
          </span>
          <h1 className="contact-anim text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display">
            Let's Make Something
          </h1>
          <p className="contact-anim text-gray-400 text-sm md:text-base font-light max-w-xl">
            Whether you want to discuss internships, collaborations, or simply want to say hello, feel free to drop a message.
          </p>
        </div>

        {/* Form and Contact Detail Split */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 items-start mt-4">
          
          {/* Left Column: Quick Info Cards */}
          <div className="flex flex-col gap-6 w-full">
            {contactInfo.filter((card) => card.href).map((card) => (
              <a
                key={card.label}
                href={card.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-anim group p-6 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-olivine/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-5 shadow-lg"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold group-hover:text-brand-olivine transition-colors duration-300">
                    {card.type}
                  </span>
                  <span className="text-sm font-medium text-white break-all mt-1">
                    {card.label}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="contact-anim bg-brand-card border border-white/5 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            
            {status === "success" ? (
              /* Success Animation Panel */
              <div className="flex flex-col items-center justify-center py-14 text-center gap-5">
                <div className="w-20 h-20 rounded-full bg-brand-olivine/10 border-2 border-brand-olivine flex items-center justify-center text-brand-olivine text-4xl animate-bounce">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white font-display">Message Sent!</h3>
                <p className="text-xs text-gray-400 font-light max-w-xs">
                  Thank you for reaching out. I've received your message and will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-brand-olivine hover:bg-brand-olivine/80 transition-all duration-300 shadow-md shadow-brand-olivine/10"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Form State */
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="text-white font-bold text-lg font-display mb-2">Send a Message</h3>
                
                {/* Name field */}
                <div className="relative flex flex-col">
                  <input
                    type="text"
                    required
                    id="form-name"
                    name="user_name" // Khớp hoàn toàn với biến {{user_name}} trên EmailJS
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-brand-olivine/40 text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300"
                  />
                  <label
                    htmlFor="form-name"
                    className="absolute left-4 top-3.5 text-xs text-gray-500 transition-all duration-300 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-brand-olivine peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85"
                  >
                    Your Name
                  </label>
                </div>

                {/* Email field */}
                <div className="relative flex flex-col">
                  <input
                    type="email"
                    required
                    id="form-email"
                    name="user_email" // Khớp hoàn toàn với biến {{user_email}} trên EmailJS
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-brand-olivine/40 text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300"
                  />
                  <label
                    htmlFor="form-email"
                    className="absolute left-4 top-3.5 text-xs text-gray-500 transition-all duration-300 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-brand-olivine peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85"
                  >
                    Email Address
                  </label>
                </div>

                {/* Subject field */}
                <div className="relative flex flex-col">
                  <input
                    type="text"
                    id="form-subject"
                    name="subject" // Khớp hoàn toàn với biến {{subject}} trên EmailJS
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-brand-olivine/40 text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300"
                  />
                  <label
                    htmlFor="form-subject"
                    className="absolute left-4 top-3.5 text-xs text-gray-500 transition-all duration-300 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-brand-olivine peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85"
                  >
                    Subject (Optional)
                  </label>
                </div>

                {/* Message field */}
                <div className="relative flex flex-col">
                  <textarea
                    required
                    rows={4}
                    id="form-message"
                    name="message" // Khớp hoàn toàn với biến {{message}} trên EmailJS
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-brand-olivine/40 text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300 resize-none"
                  />
                  <label
                    htmlFor="form-message"
                    className="absolute left-4 top-3.5 text-xs text-gray-500 transition-all duration-300 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-brand-olivine peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-85"
                  >
                    Your Message
                  </label>
                </div>

                {/* Thông báo lỗi khi quá trình gửi thất bại */}
                {status === "error" && (
                  <p className="text-red-400 text-xs font-medium tracking-wide animate-pulse">
                    Message could not be sent directly. Your email app should open as a fallback.
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-brand-olivine hover:bg-brand-olivine/85 disabled:bg-brand-olivine/40 transition-all duration-300 shadow-lg shadow-brand-olivine/15 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Dispatching Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
