import CContentsBox from '@/features/commons/CContentsBox'

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
]

export default function AboutPage() {
  return (
    <CContentsBox className="h-[calc(100%-32px)]">
      <section>
        <h2 className="text-lg font-medium mb-3">기술 스택</h2>
        <div className="space-y-6">
          {TECH_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold mb-2">{group.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {group.items.map((t) => (
                  <div
                    key={t.name}
                    className="flex flex-col items-center p-3 bg-white/5 rounded-lg"
                  >
                    <img src={t.img} alt={t.name} className="w-12 h-12 mb-2" />
                    <div className="text-xs text-center">{t.name}</div>
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
