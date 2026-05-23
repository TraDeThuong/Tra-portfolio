import Navigate from "../components/Navigate";
import ProjectsComponent from "../components/home/Projects";

export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigate />

      {/* GitHub Button */}
      <div className="flex justify-center mt-10">
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="m-20 px-12 py-3 rounded-2xl border border-zinc-700 bg-zinc-900/70 backdrop-blur-md 
          hover:bg-zinc-800 transition-all duration-300 hover:scale-105 
          shadow-lg shadow-black/30"
        >
          View My GitHub
        </a>
      </div>

      <ProjectsComponent />
    </div>
  );
}