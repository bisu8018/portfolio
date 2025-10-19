import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getBreadcrumbsFromPath } from '@/constants/navigation'
import { ROUTE_PATHS } from '@/constants/routePaths'
import GlassLayeredBox from '@/features/commons/GlassLayeredBox'

export default function WindowRoutePath() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const breadcrumbs = getBreadcrumbsFromPath(pathname)
  if (breadcrumbs.length === 0) return null

  const handleBreadcrumbClick = (index: number, breadcrumb: (typeof breadcrumbs)[0]) => {
    // 마지막 항목(현재 페이지)은 클릭 불가
    if (index === breadcrumbs.length - 1) return

    // path가 있으면 해당 경로로 이동
    if (breadcrumb.path) {
      navigate(breadcrumb.path)
    } else {
      // 첫 번째 항목(그룹)은 해당 그룹의 메인 페이지로 이동
      navigate(ROUTE_PATHS.PORTFOLIO.MAIN_PAGE)
    }
  }

  return (
    <GlassLayeredBox
      width="fit-content"
      className="px-4 py-2 mb-4 flex items-center justify-center gap-2"
    >
      {breadcrumbs.map((breadcrumb, index) => {
        // i18n 키가 있으면 번역된 텍스트 사용, 없으면 기본 라벨 사용
        const displayText = breadcrumb.i18nKey
          ? t(breadcrumb.i18nKey, breadcrumb.fallback || breadcrumb.label)
          : breadcrumb.label

        const isLast = index === breadcrumbs.length - 1
        const isClickable = !isLast

        return (
          <div key={index} className="text-sm flex items-center justify-center">
            <div
              onClick={() => handleBreadcrumbClick(index, breadcrumb)}
              className={
                isLast
                  ? 'px-2 py-1 bg-white rounded-full'
                  : isClickable
                    ? 'text-white px-2 py-1 cursor-pointer hover:bg-white/10 rounded-full transition-colors'
                    : 'text-white px-2 py-1'
              }
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleBreadcrumbClick(index, breadcrumb)
                      }
                    }
                  : undefined
              }
            >
              {displayText}
            </div>
          </div>
        )
      })}
    </GlassLayeredBox>
  )
}
