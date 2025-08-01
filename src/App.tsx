import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './features/layout/Layout'
import MiniHomePage from './pages/MiniHomePage'
import { ROUTE_PATHS } from './constants/routePaths'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATHS.ROOT} element={<Layout />}>
          <Route index element={<Navigate to={ROUTE_PATHS.MINI_HOME_PAGE} replace />} />
          <Route path={ROUTE_PATHS.MINI_HOME_PAGE} element={<MiniHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
