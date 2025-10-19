import CContentsBox from '@/features/commons/CContentsBox'
import VirtualScrollbar from '@/features/commons/VirtualScrollbar'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { URLS } from '@/constants/urls'

interface ContactMethod {
  key: string
  icon: string
  href: string
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    key: 'email',
    icon: '✉️',
    href: `mailto:${URLS.EMAIL}`,
  },
  {
    key: 'github',
    icon: '💻',
    href: URLS.GITHUB,
  },
  {
    key: 'linkedin',
    icon: '💼',
    href: URLS.LINKEDIN,
  },
  {
    key: 'blog',
    icon: '📝',
    href: URLS.BLOG,
  },
]

export default function ContactPage() {
  const { t } = useTranslation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative h-[calc(100%-32px)]">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <main className="antialiased space-y-4 max-w-4xl mx-auto">
          {/* Contact Methods */}
          {CONTACT_METHODS.map(({ key, icon, href }) => {
            const label = t(`contactPage.${key}.label`)
            const value = t(`contactPage.${key}.value`)
            const action = t(`contactPage.${key}.action`)

            return (
              <CContentsBox key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full group"
                  aria-label={`${action} - ${label}`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-slate-300 flex items-center justify-center text-2xl sm:text-3xl transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    >
                      {icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                        {label}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 truncate">{value}</p>
                    </div>

                    {/* Action Arrow */}
                    <div className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </CContentsBox>
            )
          })}

          {/* Availability Info */}
          <CContentsBox>
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-sm sm:text-base text-slate-700 font-medium">
                  {t('contactPage.availability')}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">{t('contactPage.responseTime')}</p>
            </div>
          </CContentsBox>
        </main>
      </div>
      <VirtualScrollbar targetRef={scrollContainerRef} right={-10} />
    </div>
  )
}
