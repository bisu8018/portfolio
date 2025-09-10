import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './features/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CareerPage from './pages/CareerPage'
import ContactPage from './pages/ContactPage'
import { ROUTE_PATHS } from './constants/routePaths'
import MetaTag from './features/commons/MetaTag'

function RouterWrapper() {
  const navigate = useNavigate()

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const p = params.get('p')
      if (p) {
        const parts = p.split('/').filter(Boolean)
        const target = parts.length > 1 ? parts.slice(1).join('/') : parts.join('/')
        if (target) navigate(target, { replace: true })
      }
    } catch {
      // ignore
    }
  }, [navigate])

  return (
    <Routes>
      <Route path={ROUTE_PATHS.ROOT} element={<Layout />}>
        <Route index element={<Navigate to={ROUTE_PATHS.PORTFOLIO.MAIN_PAGE} replace />} />
        <Route path={ROUTE_PATHS.PORTFOLIO.MAIN_PAGE} element={<HomePage />} />
        <Route path={ROUTE_PATHS.PORTFOLIO.ABOUT} element={<AboutPage />} />
        <Route path={ROUTE_PATHS.PORTFOLIO.CAREER} element={<CareerPage />} />
        <Route path={ROUTE_PATHS.PORTFOLIO.CONTACT} element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <MetaTag />
        <RouterWrapper />
      </Router>
    </HelmetProvider>
  )
}
