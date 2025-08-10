import { useEffect } from 'react'
import { useWindowStore } from '../stores/windowStore'
import { useMobileStore } from '../stores/mobileStore'

/**
 * 모바일 환경(가로 768px 미만)에서 isMaximized를 true로 강제 고정하는 훅
 */
export default function useForceMaximizeOnMobile() {
  const isMobile = useMobileStore((s) => s.isMobile)
  const setMaximizedState = useWindowStore((s) => s.setMaximizedState)
  const syncMaximizedFromCookie = useWindowStore((s) => s.syncMaximizedFromCookie)

  useEffect(() => {
    function handleResize() {
      if (isMobile) {
        setMaximizedState(true)
      } else {
        syncMaximizedFromCookie()
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile, setMaximizedState, syncMaximizedFromCookie])
}
