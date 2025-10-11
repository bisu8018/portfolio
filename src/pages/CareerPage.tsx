import CContentsBox from '@/features/commons/CContentsBox'
import { useTranslation } from 'react-i18next'

const TECH_STACKS = {
  nexon: ['React', 'Next.js', 'WebSocket', 'TypeScript', 'Playwright', 'Storybook'],
  polaris: [
    'React',
    'Next.js',
    'GraphQL',
    'Webpack',
    'AWS',
    'Docker',
    'Kubernetes',
    'Express',
    'Jest',
    'Enzyme',
  ],
  jakin: ['Vue.js', 'Webpack'],
  inca: ['JavaScript', 'SDK', 'Security', 'C/C++'],
  myems: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Android', 'Java'],
}

export default function CareerPage() {
  const { t } = useTranslation()

  const experiences = [
    { key: 'nexon', tech: TECH_STACKS.nexon },
    { key: 'polaris', tech: TECH_STACKS.polaris },
    { key: 'jakin', tech: TECH_STACKS.jakin },
    { key: 'inca', tech: TECH_STACKS.inca },
    { key: 'myems', tech: TECH_STACKS.myems },
  ]

  return (
    <CContentsBox className="h-[calc(100%-32px)]">
      <main className="antialiased space-y-8 max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t('careerPage.title')}</h1>
            <p className="text-sm text-neutral-600 mt-1">{t('careerPage.subtitle')}</p>
          </div>
        </header>

        <section className="space-y-8">
          {experiences.map(({ key, tech }) => {
            const company = t(`careerPage.experiences.${key}.company`)
            const role = t(`careerPage.experiences.${key}.role`)
            const period = t(`careerPage.experiences.${key}.period`)
            const duration = t(`careerPage.experiences.${key}.duration`)
            const location = t(`careerPage.experiences.${key}.location`)
            const highlights = t(`careerPage.experiences.${key}.highlights`, {
              returnObjects: true,
            }) as string[]

            const id = `career-${company.replace(/\s+/g, '')}`

            return (
              <article
                key={id}
                id={id}
                className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:bg-white/90 border border-slate-200/80"
                tabIndex={0}
                aria-labelledby={`${id}-title`}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div
                    className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-base sm:text-lg font-bold text-white shadow-md"
                    aria-hidden="true"
                  >
                    {company.split(' ')[0].slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                      <div className="space-y-1">
                        <h3
                          id={`${id}-title`}
                          className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight"
                        >
                          {company}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                          {role} · {duration}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 font-normal">{location}</p>
                      </div>

                      <time
                        dateTime={period}
                        className="text-xs sm:text-sm text-slate-700 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap"
                      >
                        {period}
                      </time>
                    </div>

                    <div className="mt-5 space-y-3">
                      {highlights.map((h, index) =>
                        index === 0 ? (
                          <div
                            key={h}
                            className="text-sm sm:text-base font-semibold text-slate-800 bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3 rounded-lg border border-purple-200/50 shadow-sm"
                          >
                            {h}
                          </div>
                        ) : (
                          <div
                            key={h}
                            className="text-sm sm:text-base text-slate-700 leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-purple-500 before:font-bold before:text-base"
                          >
                            {h}
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 hover:scale-105 transition-all duration-200 border border-slate-200"
                          title={t}
                          aria-label={`${t}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      </main>
    </CContentsBox>
  )
}
