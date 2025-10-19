import CContentsBox from '@/features/commons/CContentsBox'
import { useTranslation } from 'react-i18next'

const TECH_STACK = {
  Languages: {
    items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'TypeScript'],
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  'Frontend Frameworks': {
    items: ['React', 'Next.js', 'Vue.js', 'Preact'],
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  Styling: {
    items: ['Tailwind CSS', 'Sass/SCSS', 'Styled Components', 'PostCSS', 'Bootstrap'],
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  'Build Tools': {
    items: ['Vite', 'Webpack', 'ESBuild'],
    color: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  'Backend & Infrastructure': {
    items: ['Node.js', 'Express', 'Docker', 'Kubernetes'],
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  'State Management': {
    items: ['Zustand', 'Redux', 'Context API'],
    color: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  'API & Data': {
    items: ['REST API', 'GraphQL', 'TanStack Query', 'Apollo Client'],
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  Testing: {
    items: ['Jest', 'Playwright', 'Enzyme', 'Vitest'],
    color: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  'Tools & Others': {
    items: ['Git', 'GitHub Actions', 'Figma', 'Storybook'],
    color: 'bg-slate-50 text-slate-700 border-slate-200',
  },
}

export default function SkillsPage() {
  const { t } = useTranslation()

  return (
    <CContentsBox className="h-[calc(100%-32px)]">
      <div className="w-full max-w-4xl">
        <div className="space-y-8 md:space-y-10">
          {Object.entries(TECH_STACK).map(([category, { items, color }]) => (
            <div key={category}>
              <h2 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
                {t(`techGroups.${category}`, category)}
              </h2>
              <div className="flex flex-wrap gap-2 md:gap-2.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center px-3 md:px-3.5 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-md border ${color}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CContentsBox>
  )
}
