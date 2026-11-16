import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { SkipToContent } from './components/a11y/SkipToContent'
import { AboutPage } from './pages/AboutPage'
import { AccessibilityPage } from './pages/AccessibilityPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ServicePage } from './pages/ServicePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ThankYouPage } from './pages/ThankYouPage'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <SkipToContent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
