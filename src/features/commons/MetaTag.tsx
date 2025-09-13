import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { URLS } from '@/constants/urls'

/**
 * MetaTag
 * 각 라우트별로 SEO 및 웹 표준에 맞는 메타태그를 동적으로 추가합니다.
 */
export default function MetaTag() {
  const { t } = useTranslation()

  const title = t('meta.default.title')
  const description = t('meta.default.description')
  const canonical = URLS.PORTFOLIO || URLS.MAIN
  const ogImage = `${canonical}og-main.png`

  return (
    <Helmet>
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
