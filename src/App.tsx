import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import PageNotFound from './pages/PageNotFound'
import CV from "./pages/CV";
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'

function withTransition(page: ReactNode) {
  return <PageTransition>{page}</PageTransition>
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-brand-dark text-gray-100 selection:bg-brand-olivine/30 selection:text-brand-olivine overflow-x-hidden">
        <ScrollToTop />
        <Routes>
          <Route index element = {<Navigate replace to = "home"/>} />
          <Route path = "home" element = {withTransition(<Home/>)} />
          <Route path = "about" element = {withTransition(<About/>)} />
          <Route path = "contact" element = {withTransition(<Contact/>)} />
          <Route path = "projects" element = {withTransition(<Projects/>)} />
          <Route path = "skills" element = {withTransition(<Skills/>)} />
          <Route path=  "/cv" element={withTransition(<CV />)} />
          <Route path = "/*" element = {withTransition(<PageNotFound/>)} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
