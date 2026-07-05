import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { SkipToContent } from './components/a11y/SkipToContent'
import { AboutPage } from './pages/AboutPage'
import { AccessibilityPage } from './pages/AccessibilityPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { ServicePage } from './pages/ServicePage'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <SkipToContent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
