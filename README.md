# TRA Portfolio

https://tra-portfolio-kappa.vercel.app

This is a personal portfolio site built with React, TypeScript and Vite. It contains pages to present an introduction, skills, projects, and contact information.

## Key technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- EmailJS

## Install & Run (Local)

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Configure the contact form:

Copy `.env.example` to `.env.local` and fill in the EmailJS values:

```bash
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

If these values are missing, the contact form falls back to opening a `mailto:` link.

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

Note: If `npm run dev` fails, check your Node.js version and reinstall dependencies.

## Project structure (high level)

- `src/` — source code
  - `components/` — reusable components
  - `pages/` — pages (Home, About, Projects, Contact...)
  - `data/` — shared portfolio data for projects, skills, roadmap, and contact info
  - `main.tsx`, `App.tsx` — app entry points
- `public/` — static assets

Example: the contact page is at `src/pages/Contact.tsx`.

## Deployment

You can deploy to Vercel, Netlify, GitHub Pages, or any static hosting. Typical steps:

1. `npm run build`
2. Upload the generated `dist/` (or follow your host's build settings)

## Common edits

- Update shared project, skill, roadmap, and contact data in `src/data/portfolio.ts`.
- Update personal copy in `src/pages/About.tsx` or `src/components/home/Hero.tsx`.

## Contact

- Email: (add your email inside `src/pages/Contact.tsx`)
- GitHub: (add your GitHub link)

---

If you want a more detailed README (with deployment steps, screenshots, badges, or per-project descriptions), tell me what to include and I'll expand this file.
