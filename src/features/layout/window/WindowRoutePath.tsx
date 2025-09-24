import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getBreadcrumbsFromPath } from '@/constants/navigation'

export default function WindowRoutePath() {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const breadcrumbs = getBreadcrumbsFromPath(pathname)
  if (breadcrumbs.length === 0) return null

  return (
    <div className="text-left w-full font-bold text-sm">
      {breadcrumbs.map((breadcrumb, index) => {
        // i18n 키가 있으면 번역된 텍스트 사용, 없으면 기본 라벨 사용
        const displayText = breadcrumb.i18nKey
          ? t(breadcrumb.i18nKey, breadcrumb.fallback || breadcrumb.label)
          : breadcrumb.label

        return (
          <span key={index}>
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            <span className={index === breadcrumbs.length - 1 ? 'text-gray-600' : 'text-gray-400'}>
              {displayText}
            </span>
          </span>
        )
      })}
    </div>
  )
}
