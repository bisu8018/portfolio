import React from 'react'
import { useLocation } from 'react-router-dom'
import FooterIconWrapper from './FooterIconWrapper'
import { ROUTE_PATHS } from '@/constants/routePaths'
import { useTranslation } from 'react-i18next'

/**
 * PortfolioIcon - Footer용 포트폴리오 이모지 아이콘
 * @returns {JSX.Element}
 */
export default function PortfolioIcon({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const location = useLocation()
  const { t } = useTranslation()
  const portfolioPaths = Object.values(ROUTE_PATHS.PORTFOLIO)
  const isPortfolio = portfolioPaths.some((path) => location.pathname === path)

  return (
    <FooterIconWrapper selected={isPortfolio} tooltipText={t('footer.portfolio', '포트폴리오')}>
      <span
        role="img"
        aria-label="portfolio"
        className={`text-4xl transition-colors hover:opacity-80 ${className}`}
        {...props}
      >
        🧑‍💻
      </span>
    </FooterIconWrapper>
  )
}
