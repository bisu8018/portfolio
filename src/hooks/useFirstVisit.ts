import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '@/constants/routePaths'

/**
 * 사이트 첫 방문 시 자동으로 메인 페이지로 리디렉션하는 훅
 * sessionStorage를 사용하여 탭 단위로 방문 여부를 관리합니다.
 */
export default function useFirstVisit() {
  const navigate = useNavigate()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')

    if (!hasVisited) {
      // 첫 방문
      sessionStorage.setItem('hasVisited', 'true')
      setShouldRedirect(true)
    }
  }, [])

  useEffect(() => {
    if (shouldRedirect) {
      navigate(ROUTE_PATHS.PORTFOLIO.MAIN_PAGE, { replace: true })
    }
  }, [shouldRedirect, navigate])

  return shouldRedirect
}
