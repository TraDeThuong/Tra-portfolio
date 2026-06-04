import type { Project } from "../data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
  compact?: boolean;
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path
        fillRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.16-1.11-1.47-1.11-1.47-.91-.64.07-.63.07-.63 1 .07 1.53 1.04 1.53 1.04.9 1.55 2.36 1.1 2.94.84.09-.66.35-1.1.64-1.35-2.22-.26-4.55-1.13-4.55-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03A9.37 9.37 0 0112 7.81c.86.01 1.73.12 2.54.35 1.9-1.3 2.74-1.03 2.74-1.03.55 1.41.2 2.45.1 2.71.64.71 1.02 1.62 1.02 2.73 0 3.9-2.34 4.76-4.57 5.01.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .28.18.6.69.5A10.27 10.27 0 0022 12.25C22 6.58 17.52 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ProjectCard({ project, index, className = "", compact = false }: ProjectCardProps) {
  return (
    <article
      className={`project-card group relative flex flex-col justify-between rounded-3xl glass-panel glow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15 will-change-transform overflow-hidden ${className}`}
    >
      <div className="relative h-36 overflow-hidden bg-white/[0.03]">
        <img
          src={project.thumbnail}
          alt={`${project.title} project preview`}
          className="h-full w-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/35 to-transparent" />
        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full border border-brand-flax/20 bg-brand-flax/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-flax">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-7">
        <span className="absolute top-4 right-4 text-[10px] font-mono text-white/20 font-bold group-hover:text-brand-olivine/50 transition-colors duration-500">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-olivine/80">
              {project.role}
            </p>
            <h3 className="text-xl font-bold text-white font-display tracking-tight group-hover:text-brand-flax transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-olivine group-hover:text-black transition-all duration-300 hover:scale-110"
                aria-label={`Visit live demo for ${project.title}`}
              >
                <ExternalLinkIcon />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-flax hover:text-black transition-all duration-300 hover:scale-110"
              aria-label={`View source code for ${project.title}`}
            >
              <GitHubIcon />
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-400 font-light leading-relaxed">
          {project.description}
        </p>

        {!compact && (
          <ul className="flex flex-col gap-2 text-xs text-gray-400">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-olivine" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-gray-300 bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-lg font-medium backdrop-blur-sm hover:border-brand-olivine/30 hover:text-white transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
