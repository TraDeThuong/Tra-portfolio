import { Link } from "react-router-dom";

interface InfoItem {
  label: string;
  href: string | null;
  type: string;
}

export default function Contact() {
  const info: InfoItem[] = [
    {
      label: "0372 127 458",
      href: "tel:0372127458",
      type: "Phone",
    },
    {
      label: "huynhthanhtra458@gmail.com",
      href: "mailto:huynhthanhtra458@gmail.com",
      type: "Email",
    },
    {
      label: "Thu Duc, Ho Chi Minh City",
      href: null,
      type: "Location",
    },
    {
      label: "github.com/TraDeThuong",
      href: "https://github.com/TraDeThuong",
      type: "GitHub",
    },
  ];

  return (
    <footer
      id="contact"
      className="w-full bg-black text-white px-6 py-24"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-20">

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Contact
          </span>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Let’s work together
          </h2>

          <p className="max-w-lg text-sm md:text-base text-gray-400 leading-relaxed">
            Creating digital experiences with clean code and thoughtful design.
          </p>
        </div>

        {/* Contact List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {info.map(({ label, href, type }) => (
            <div
              key={label}
              className="border-b border-white/10 pb-4"
            >
              <span className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                {type}
              </span>

              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-white hover:text-gray-400 transition"
                >
                  {label}
                </a>
              ) : (
                <p className="text-base text-white">
                  {label}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Huynh Thanh Tra
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link
              to="/home"
              className="hover:text-white transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="hover:text-white transition"
            >
              About
            </Link>

            <Link
              to="/projects"
              className="hover:text-white transition"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}