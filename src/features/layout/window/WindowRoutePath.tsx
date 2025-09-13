import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getTopLevelGroupFromPath } from '@/constants/navigation'

export default function WindowRoutePath() {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const groupKey = getTopLevelGroupFromPath(pathname)
  if (!groupKey) return null

  const i18nKey = `lnb.${groupKey.toLowerCase()}`
  const fallback = groupKey.charAt(0).toUpperCase() + groupKey.slice(1)
  const label = t(i18nKey, fallback)

  return <div className="mb-3 text-left w-full font-bold text-sm">{label}</div>
}
