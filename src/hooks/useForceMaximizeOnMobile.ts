import { useEffect } from 'react'
import { useLnbStore } from '../stores/lnbStore'
import { useMobileStore } from '../stores/mobileStore'

/**
 * 모바일 환경(가로 768px 미만)에서 isMaximized를 true로 강제 고정하는 훅
 */
export default function useForceMaximizeOnMobile() {
  const isMobile = useMobileStore((s) => s.isMobile)
  const setMaximized = useLnbStore((s) => s.setMaximized)

  useEffect(() => {
    function handleResize() {
      if (isMobile) {
        setMaximized(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile, setMaximized])
}
