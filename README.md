# TRA Portfolio

https://tra-portfolio-kappa.vercel.app/home

This is a personal portfolio site built with React, TypeScript and Vite. It contains pages to present an introduction, skills, projects, and contact information.

## Key technologies

- React
- TypeScript
- Vite
- Tailwind / CSS (if used)

## Install & Run (Local)

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

Note: If `npm run dev` fails, check your Node.js version and reinstall dependencies.

## Project structure (high level)

- `src/` — source code
  - `components/` — reusable components
  - `pages/` — pages (Home, About, Projects, Contact...)
  - `assets/` — images, icons
  - `main.tsx`, `App.tsx` — app entry points
- `public/` — static assets

Example: the contact page is at `src/pages/Contact.tsx`.

## Deployment

You can deploy to Vercel, Netlify, GitHub Pages, or any static hosting. Typical steps:

1. `npm run build`
2. Upload the generated `dist/` (or follow your host's build settings)

## Common edits

- Update personal info in `src/pages/About.tsx` or `src/components/home/Hero.tsx`.
- Add new projects in `src/pages/Projects.tsx` or a dedicated component.

## Contact

- Email: (add your email inside `src/pages/Contact.tsx`)
- GitHub: (add your GitHub link)

---

If you want a more detailed README (with deployment steps, screenshots, badges, or per-project descriptions), tell me what to include and I'll expand this file.
