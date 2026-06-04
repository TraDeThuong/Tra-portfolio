import { Link } from "react-router-dom";
import Navigate from "../components/Navigate";

export default function PageNotFound() {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Navigate />
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 py-32 text-center">
        <span className="rounded-full border border-brand-olivine/20 bg-brand-olivine/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-brand-olivine">
          404
        </span>
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl font-display">
            Page Not Found
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
            This route does not exist in the portfolio. Return to the main experience or jump straight into the project archive.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/home"
            className="rounded-xl bg-brand-olivine px-6 py-3 text-sm font-semibold text-black transition hover:bg-brand-olivine/85"
          >
            Back Home
          </Link>
          <Link
            to="/projects"
            className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/25 hover:text-white"
          >
            Browse Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
