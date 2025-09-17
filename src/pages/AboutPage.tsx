import CContentsBox from '@/features/commons/CContentsBox'
import { useTranslation } from 'react-i18next'

const TECH_GROUPS = [
  {
    title: 'Languages',
    items: [
      { name: 'HTML5', img: 'https://cdn.simpleicons.org/html5' },
      { name: 'CSS3', img: 'https://cdn.simpleicons.org/css' },
      { name: 'ES6+', img: 'https://cdn.simpleicons.org/javascript' },
      { name: 'TypeScript', img: 'https://cdn.simpleicons.org/typescript' },
    ],
  },
  {
    title: 'Styling Frameworks / Libraries',
    items: [
      { name: 'Tailwind CSS', img: 'https://cdn.simpleicons.org/tailwindcss/38BDF8' },
      { name: 'Bootstrap', img: 'https://cdn.simpleicons.org/bootstrap' },
      { name: 'Styled-Components', img: 'https://cdn.simpleicons.org/styledcomponents' },
      { name: 'Sass/SCSS', img: 'https://cdn.simpleicons.org/sass' },
      { name: 'PostCSS', img: 'https://cdn.simpleicons.org/postcss' },
    ],
  },
  {
    title: 'CSR Frameworks',
    items: [
      { name: 'React', img: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Preact', img: 'https://cdn.simpleicons.org/preact' },
      { name: 'Vue.js', img: 'https://cdn.simpleicons.org/vue.js' },
    ],
  },
  {
    title: 'SSR Frameworks',
    items: [{ name: 'Next.js', img: 'https://cdn.simpleicons.org/nextdotjs' }],
  },
  {
    title: 'Build & Bundlers',
    items: [
      { name: 'Webpack', img: 'https://cdn.simpleicons.org/webpack' },
      { name: 'Vite', img: 'https://cdn.simpleicons.org/vite' },
      { name: 'ESBuild', img: 'https://cdn.simpleicons.org/esbuild' },
    ],
  },
  {
    title: 'Server & API',
    items: [
      { name: 'Node.js', img: 'https://cdn.simpleicons.org/nodedotjs' },
      { name: 'Express.js', img: 'https://cdn.simpleicons.org/express' },
    ],
  },
  {
    title: 'DevOps',
    items: [
      { name: 'Docker', img: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Kubernetes', img: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
    ],
  },
]

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <CContentsBox className="h-[calc(100%-32px)]">
      <section className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t('about.techStack')}</h1>
            <p className="text-sm text-neutral-600 mt-1">{t('about.frontendFocus')}</p>
          </div>
        </header>

        <div className="space-y-6">
          {TECH_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold mb-2">
                {t(`techGroups.${group.title}`) ?? group.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                {group.items.map((tItem) => (
                  <div
                    key={tItem.name}
                    className="flex flex-col items-center p-2 sm:p-3 bg-white/20 rounded-lg shadow-sm backdrop-blur-sm focus-within:ring-2 focus-within:ring-amber-400"
                    tabIndex={0}
                    role="button"
                    aria-label={tItem.name}
                  >
                    <img
                      src={tItem.img}
                      alt={tItem.name}
                      className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 mb-2 object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement
                        target.onerror = null
                        target.src = 'https://cdn.simpleicons.org/box'
                      }}
                    />
                    <div className="text-xs sm:text-xs md:text-sm text-center text-slate-900">
                      {tItem.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </CContentsBox>
  )
}
