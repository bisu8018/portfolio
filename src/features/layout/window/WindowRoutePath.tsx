import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getBreadcrumbsFromPath } from '@/constants/navigation'
import GlassLayeredBox from '@/features/commons/GlassLayeredBox'

export default function WindowRoutePath() {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const breadcrumbs = getBreadcrumbsFromPath(pathname)
  if (breadcrumbs.length === 0) return null

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

        return (
          <div key={index} className="text-sm flex items-center justify-center">
            <div
              className={
                index === breadcrumbs.length - 1
                  ? 'px-2 py-1 bg-white rounded-full'
                  : 'text-white px-2 py-1'
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
