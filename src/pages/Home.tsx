import About from "../components/home/About";
import Hero from "../components/home/Hero";
import TechStack from "../components/home/TechStack";
import Navigate from "../components/Navigate";
import Projects from "../components/home/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="w-full">
      <Navigate/>
      <Hero/>
      <About/>
      <TechStack/>
      <Projects/>
      <Contact/>
    </div>
  )
}
