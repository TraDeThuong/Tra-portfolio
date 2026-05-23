import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import PageNotFound from './pages/PageNotFound'
import CV from "./pages/CV";
import Cursor from './components/Cursor'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-brand-dark text-gray-100 selection:bg-brand-olivine/30 selection:text-brand-olivine overflow-x-hidden">
        <Cursor />
        <ScrollToTop />
        <Routes>
          <Route index element = {<Navigate replace to = "home"/>} />
          <Route path = "home" element = {<Home/>} />
          <Route path = "about" element = {<About/>} />
          <Route path = "contact" element = {<Contact/>} />
          <Route path = "projects" element = {<Projects/>} />
          <Route path = "skills" element = {<Skills/>} />
          <Route path=  "/cv" element={<CV />} />
          <Route path = "/*" element = {<PageNotFound/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
