import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './features/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CareerPage from './pages/CareerPage'
import ContactPage from './pages/ContactPage'
import { ROUTE_PATHS } from './constants/routePaths'
import MetaTag from './features/commons/MetaTag'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <MetaTag />
        <Routes>
          <Route path={ROUTE_PATHS.ROOT} element={<Layout />}>
            <Route index element={<Navigate to={ROUTE_PATHS.MAIN_PAGE} replace />} />
            <Route path={ROUTE_PATHS.MAIN_PAGE} element={<HomePage />} />
            <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
            <Route path={ROUTE_PATHS.CAREER} element={<CareerPage />} />
            <Route path={ROUTE_PATHS.CONTACT} element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
