import { useEffect } from 'react'
import { useMobileStore } from '../stores/mobileStore'

/**
 * 다양한 방법(window size, userAgent, 터치 지원)으로 모바일 환경을 감지하는 훅
 * @returns {boolean} 모바일 여부
 */
function isMobileEnv() {
  if (typeof window === 'undefined') return false
  const widthCheck = window.innerWidth < 768
  const ua = navigator.userAgent.toLowerCase()
  const uaCheck = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua)
  const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  return widthCheck || uaCheck || touchCheck
}

export default function useDetectMobile() {
  const setIsMobile = useMobileStore((s) => s.setIsMobile)
  const isMobile = useMobileStore((s) => s.isMobile)

  useEffect(() => {
    function handleResizeOrDetect() {
      setIsMobile(isMobileEnv())
    }
    handleResizeOrDetect()
    window.addEventListener('resize', handleResizeOrDetect)
    return () => window.removeEventListener('resize', handleResizeOrDetect)
  }, [setIsMobile])

  return isMobile
}
