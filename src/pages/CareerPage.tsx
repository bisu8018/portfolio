import CContentsBox from '@/features/commons/CContentsBox'

const EXPERIENCES = [
  {
    company: 'NEXON KOREA',
    role: 'Frontend Engineer',
    period: '2021.02 - Present',
    duration: '4년 8개월',
    location: '성남시 분당구, 대한민국 · 대면',
    highlights: [
      '레거시 시스템 현대화(성능·유지보수성 개선) 및 최신 프레임워크 적용',
      '다수 SDK 및 Web 솔루션 개발(게임 런처, Remote Play, 광고 SDK, 인증/결제 SDK 등)',
      '글로벌 대상 i18n 및 반응형 UI/UX 구현',
      '고트래픽 서비스 아키텍처 개선 및 성능 최적화',
      'Playwright/Storybook 테스트 환경 및 Git hook CI 파이프라인 구축',
      'SDK 리팩토링·모듈화로 재사용성 향상 및 기술 부채 감소',
    ],
    tech: ['React', 'Next.js', 'WebSocket', 'TypeScript', 'Playwright', 'Storybook'],
  },
  {
    company: 'Polaris Office',
    role: 'Frontend Engineer',
    period: '2019.02 - 2020.11',
    duration: '1년 10개월',
    location: '서울 금천구, 대한민국',
    highlights: [
      'React/Next 기반 반응형 CSR/SSR SPA 개발',
      'GraphQL(Apollo) 도입 및 클라이언트 최적화',
      'Webpack 설계 및 빌드 파이프라인 구축',
      'Node.js, AWS(EC2/ECS/EKS/Lambda) 운영 및 Docker·Kubernetes 적용',
      'TDD(Jest) 및 성능 튜닝, SEO 최적화',
    ],
    tech: ['React', 'Next.js', 'GraphQL', 'Webpack', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    company: 'Jakin',
    role: 'Frontend Engineer',
    period: '2018.05 - 2018.10',
    duration: '6개월',
    location: '성남시 분당구, 대한민국',
    highlights: ['Vue 기반 SPA 개발, Webpack 빌드 및 프론트엔드 성능 튜닝'],
    tech: ['Vue.js', 'Webpack'],
  },
  {
    company: 'INCA Internet',
    role: 'Engineer',
    period: '2017.03 - 2018.04',
    duration: '1년 2개월',
    location: '서울 구로구, 대한민국',
    highlights: ['nProtect Web SDK 구축 및 유지보수', '클라이언트·서버 보안 모듈 유지보수 및 통합'],
    tech: ['JavaScript'],
  },
  {
    company: 'MYEMS',
    role: 'Backend Engineer',
    period: '2016.04 - 2017.02',
    duration: '11개월',
    location: '서울 중구, 대한민국 · 재택',
    highlights: ['PHP 기반 백엔드 API 개발 및 클라이언트 웹 플랫폼 구축'],
    tech: ['PHP', 'MySQL'],
  },
]

export default function CareerPage() {
  return (
    <CContentsBox className="h-[calc(100%-32px)] overflow-y-auto">
      <section className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold">경력</h1>
          <p className="text-sm text-muted-foreground mt-1">주요 직무 및 성과 요약</p>
        </header>

        <div className="grid gap-6">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.company}
              className="bg-white/5 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow focus-within:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              role="article"
              aria-labelledby={`title-${exp.company.replace(/\s+/g, '')}`}
              aria-describedby={`desc-${exp.company.replace(/\s+/g, '')}`}
              tabIndex={0}
            >
              <span className="sr-only" id={`desc-${exp.company.replace(/\s+/g, '')}`}>
                {exp.company}에서 {exp.role}로 근무 ({exp.period}). 주요 성과와 사용 기술 목록이
                이어집니다.
              </span>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4 md:flex-1">
                  <div
                    className="w-12 h-12 rounded-md bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-800"
                    aria-hidden
                  >
                    {exp.company.split(' ')[0].slice(0, 2)}
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      id={`title-${exp.company.replace(/\s+/g, '')}`}
                    >
                      {' '}
                      {exp.company}
                    </h3>
                    <div className="text-sm text-neutral-400">
                      {exp.role} · {exp.duration}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">{exp.location}</div>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <div className="text-right text-xs text-neutral-500 md:text-sm">{exp.period}</div>
                  <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm list-inside leading-relaxed">
                    {exp.highlights.map((h) => (
                      <li key={h} className="list-disc">
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center max-w-[140px] truncate px-2 py-0.5 text-[10px] sm:text-[11px] md:text-xs bg-white/3 rounded-full"
                        title={t}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </CContentsBox>
  )
}
