import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ROUTE_PATHS } from '@/constants/routePaths'
import { useTranslation } from 'react-i18next'

/**
 * MetaTag
 * 각 라우트별로 SEO 및 웹 표준에 맞는 메타태그를 동적으로 추가합니다.
 */
export default function MetaTag() {
  const location = useLocation()
  const { pathname } = location
  const { t } = useTranslation()

  // 라우트별 i18n 키 매핑
  const metaKeyMap: Record<string, { key: string; ogImage: string; canonical: string }> = {
    [ROUTE_PATHS.MAIN_PAGE]: {
      key: 'main',
      ogImage: 'https://yourdomain.com/og-main.png',
      canonical: 'https://yourdomain.com/',
    },
    [ROUTE_PATHS.ABOUT]: {
      key: 'about',
      ogImage: 'https://yourdomain.com/og-about.png',
      canonical: 'https://yourdomain.com/about',
    },
    [ROUTE_PATHS.CAREER]: {
      key: 'career',
      ogImage: 'https://yourdomain.com/og-career.png',
      canonical: 'https://yourdomain.com/career',
    },
    [ROUTE_PATHS.CONTACT]: {
      key: 'contact',
      ogImage: 'https://yourdomain.com/og-contact.png',
      canonical: 'https://yourdomain.com/contact',
    },
  }

  const metaKey = metaKeyMap[pathname]?.key || 'default'
  const ogImage = metaKeyMap[pathname]?.ogImage || 'https://yourdomain.com/og-default.png'
  const canonical = metaKeyMap[pathname]?.canonical || 'https://yourdomain.com/'

  const title = t(`meta.${metaKey}.title`)
  const description = t(`meta.${metaKey}.description`)

  return (
    <Helmet>
      {/* SEO 기본 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={canonical} />
    </Helmet>
  )
}
