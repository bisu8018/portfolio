import { useEffect } from 'react'
import { useMobileStore } from '../stores/mobileStore'

/**
 * 가로 768px 미만이면 isMobile을 true로, 아니면 false로 지정하는 훅
 */
export default function useDetectMobile() {
  const setIsMobile = useMobileStore((s) => s.setIsMobile)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsMobile])
}
