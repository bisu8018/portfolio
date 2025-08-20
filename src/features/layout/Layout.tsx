/**
 * Layout 컴포넌트
 * 전체 화면 구조를 담당하며, 배경, 헤더, 메인, 푸터를 포함합니다.
 * @component
 * @returns {JSX.Element} 전체 레이아웃 구조
 */
import Header from './header/Header'
import Footer from './footer/Footer'
import Main from './main/Main'
import BgWallpaper from './BgWallpaper'
import { useEffect } from 'react'
import { useWindowStore } from '@/stores/windowStore'
import useDetectMobile from '@/hooks/useDetectMobile'

export default function Layout() {
  const syncMaximizedFromCookie = useWindowStore((s) => s.syncMaximizedFromCookie)
  const isMobile = useDetectMobile()

  useEffect(() => {
    syncMaximizedFromCookie()
  }, [syncMaximizedFromCookie])

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <BgWallpaper />

      {!isMobile && <Header />}

      <Main />

      {!isMobile && <Footer />}
    </div>
  )
}
