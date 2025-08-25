import Header from './header/Header'
import Footer from './footer/Footer'
import Main from './main/Main'
import Wallpaper from './wallpaper/Wallpaper'
import { useEffect } from 'react'
import { useWindowStore } from '@/stores/windowStore'
import useDetectMobile from '@/hooks/useDetectMobile'

import { useLocation } from 'react-router-dom'
import Rnb from './rnb/Rnb'

/**
 * Layout 컴포넌트
 * 전체 화면 구조를 담당하며, 배경, 헤더, 메인, 푸터를 포함합니다.
 * @component
 * @returns {JSX.Element} 전체 레이아웃 구조
 */
export default function Layout() {
  const syncMaximizedFromCookie = useWindowStore((s) => s.syncMaximizedFromCookie)
  const isMobile = useDetectMobile()
  const location = useLocation()

  useEffect(() => {
    syncMaximizedFromCookie()
  }, [syncMaximizedFromCookie])

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Wallpaper />

      {!isMobile && <Rnb />}
      {!isMobile && <Header />}

      {location.pathname !== '/' && <Main />}

      {!isMobile && <Footer />}
    </div>
  )
}
