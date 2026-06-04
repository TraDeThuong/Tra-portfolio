export interface Project {
  title: string;
  role: string;
  link?: string;
  github: string;
  description: string;
  tech: string[];
  category: "frontend" | "fullstack";
  featured?: boolean;
  thumbnail: string;
  highlights: string[];
}

export interface SkillCategory {
  label: string;
  description: string;
  items: string[];
}

export interface RoadmapItem {
  year: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ContactInfo {
  label: string;
  href: string | null;
  type: string;
}

export const projects: Project[] = [
  {
    title: "Classora",
    role: "Classroom management platform",
    link: "https://classora-xva.vercel.app",
    github: "https://github.com/TraDeThuong/Classora",
    description:
      "A classroom and learning management web application focused on organizing classes, study workflows, and education-facing product interactions through a clean modern interface.",
    tech: ["React", "Tailwind CSS", "Supabase", "React Query", "TypeScript", "Responsive UI"],
    category: "frontend",
    featured: true,
    thumbnail: "/classora.png",
    highlights: [
      "Designed a polished education product interface for class and learning workflows.",
      "Built deployable frontend flows with responsive layouts for desktop and mobile.",
      "Practiced product structure for a real-world classroom management concept.",
    ],
  },
  {
    title: "The Wild Oasis",
    role: "Full-stack dashboard",
    link: "https://tra-the-wild-oasis.netlify.app",
    github: "https://github.com/TraDeThuong/wild-oasis",
    description:
      "A resort management application for cabins, bookings, guests, and operational dashboards. It demonstrates protected workflows, server state management, and responsive admin UI patterns.",
    tech: ["React", "Styled Components", "Supabase", "React Query"],
    category: "fullstack",
    featured: true,
    thumbnail: "/The-wild-oasis-dashboard.png",
    highlights: [
      "Built booking and cabin management flows with Supabase data.",
      "Used React Query for cached server state and loading states.",
      "Designed dashboard views for quick operational scanning.",
    ],
  },
  {
    title: "The Wild Oasis Website",
    role: "Guest-facing web app",
    link: "https://the-wild-oasis-website-virid-sigma.vercel.app",
    github: "https://github.com/TraDeThuong/wild-oasis-website",
    description:
      "A premium cabin rental website built with Next.js for guests to browse cabins, manage profiles, and explore booking information through a polished responsive experience.",
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    category: "fullstack",
    featured: true,
    thumbnail: "/The-wild-oasis-website.png",
    highlights: [
      "Structured guest journeys from cabin discovery to profile management.",
      "Practiced Next.js routing, rendering, and Supabase integration.",
      "Focused on premium hospitality visuals and responsive layouts.",
    ],
  },
  {
    title: "WorldWise",
    role: "Frontend travel tracker",
    link: "https://xva-worldwise.netlify.app",
    github: "https://github.com/TraDeThuong/worldwise",
    description:
      "A travel tracking application that lets users mark visited cities, save memories, and visualize journeys on an interactive map.",
    tech: ["React", "React Router", "CSS Modules", "Leaflet"],
    category: "frontend",
    thumbnail: "/WorldWise.png",
    highlights: [
      "Implemented map-first interaction with Leaflet.",
      "Organized routing and city detail flows with React Router.",
      "Balanced visual exploration with simple saved-location UX.",
    ],
  },
  {
    title: "Fast React Pizza Co",
    role: "Frontend ordering flow",
    link: "https://fast-react-pizza-jey6u002i-tradethuongs-projects.vercel.app",
    github: "https://github.com/TraDeThuong/fast-react-pizza",
    description:
      "A responsive pizza ordering web application with dynamic cart management, routing, and optimized state handling.",
    tech: ["React", "Vite", "Redux Toolkit", "Tailwind CSS", "React Router"],
    category: "frontend",
    thumbnail: "/FastPizza.png",
    highlights: [
      "Managed cart and order state with Redux Toolkit.",
      "Built responsive ordering steps with route-level flows.",
      "Practiced form handling and user feedback states.",
    ],
  },
  {
    title: "8Express",
    role: "Full-stack social platform",
    github: "https://github.com/TraDeThuong/8express",
    description:
      "A social media and forum platform with user management, post moderation, analytics dashboards, commenting, sharing, and AI-assisted moderation concepts.",
    tech: ["ExpressJS", "ReactJS", "Tailwind CSS", "Sequelize", "MySQL"],
    category: "fullstack",
    thumbnail: "/8-express.png",
    highlights: [
      "Designed core social features including posts and comments.",
      "Worked with Express, Sequelize, and MySQL for backend data flows.",
      "Explored moderation and analytics features for community operations.",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    description: "Core programming and markup languages.",
    items: ["TypeScript", "JavaScript ES6+", "HTML5", "CSS3"],
  },
  {
    label: "Frameworks & Libraries",
    description: "Modern rendering, routing, and server-state tools.",
    items: ["React", "Next.js", "React Query", "Redux Toolkit", "React Router"],
  },
  {
    label: "Backend",
    description: "Server-side fundamentals for APIs and full-stack product flows.",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    label: "UI & Styling",
    description: "Interface systems, motion, and responsive styling.",
    items: ["Tailwind CSS", "GSAP", "Shadcn/ui", "Styled Components", "CSS Modules"],
  },
  {
    label: "Design & Tools",
    description: "Design, source control, and day-to-day development workflow.",
    items: ["Figma", "Git / GitHub", "VS Code", "Adobe Photoshop", "Postman"],
  },
];

export const roadmapItems: RoadmapItem[] = [
  {
    year: "Year 1 (Next Step)",
    title: "Advanced Frontend & Backend Foundation",
    description:
      "Deepen Next.js, state management, accessibility, testing, and backend fundamentals with Node.js and NestJS.",
    tags: ["Next.js", "Zustand", "Node.js", "NestJS", "REST APIs", "Testing"],
  },
  {
    year: "Year 2",
    title: "Database Mastery & System Architecture",
    description:
      "Practice data modeling, query optimization, API design, and scalable architecture through larger full-stack projects.",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM", "Clean Architecture"],
  },
  {
    year: "Year 3",
    title: "DevOps, Cloud Platforms & AI Integration",
    description:
      "Build deployable products with CI/CD, cloud hosting, containerization, monitoring, and useful AI-assisted workflows.",
    tags: ["Docker", "GitHub Actions", "Nginx", "AWS", "OpenAI API"],
  },
];

export const contactInfo: ContactInfo[] = [
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

export const primaryEmail = "huynhthanhtra458@gmail.com";
export const githubUrl = "https://github.com/TraDeThuong";
