import CContentsBox from '@/features/commons/CContentsBox'

const EXPERIENCES = [
  {
    company: 'NEXON KOREA',
    role: 'Frontend Engineer',
    period: '2021.02 - Present',
    duration: '4년 8개월',
    location: '성남시 분당구, 대한민국 · 대면',
    highlights: [
      '게임런처 WebApp | Remote Play WebApp | 개인화 광고 Web/SDK | 공식 웹 (포탈, 고객정보, 게임 웹 실행 SDK etc) | WebSocket Streaming SDK | 통합 결제 SDK | 통합 인증 SDK | 다수 콘솔 Web',
      '최신 프레임워크를 활용하여 레거시 시스템을 현대화, 성능 및 유지보수성 개선',
      '다양한 SDK 클라이언트 및 솔루션 관리 도구를 개발하여 내부 운영 효율성 향상',
      '글로벌 사용자 대상 다국어(i18n) 기능 및 반응형 UI/UX 구현을 통해 사용자 경험 강화',
      '고트래픽 웹 서비스의 API 설계, 시스템 아키텍처 개선, 성능 최적화에 기여',
      'Playwright, Storybook 기반 테스트 환경과 Git hook 기반 CI/CD 파이프라인을 구축하여 배포 안정성 확보',
      '기획, 디자인, QA, 글로벌 개발팀 등 다양한 조직과 협업하여 고품질 기능을 안정적으로 제공',
      'SDK 구조 리팩토링 및 모듈화 작업을 주도하여 기술 부채를 줄이고 재사용성 향상',
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
      'Polaris Office 엄브렐라 브랜드 문서 공유 플랫폼 Polaris Share',
      'ES6 ~ Lodash, 모던 자바스크립트, FP',
      'React.js + Express 및 Next.js 기반 반응형 CSR/SSR SPA 구축',
      'GraphQL ~ Apollo Client',
      'Webpack 프로젝트 설계, 구축',
      'TDD(JEST, Enzyme)',
      'SEO (Google), Open Graph, oEmbed',
      '클라이언트 프로파일링 성능 튜닝',
      'Node.js, AWS (EC2, ECS, EKS, Lambda, blue/green 배포 등등), Docker + Kubernetes 적용',
      'Polaris Office ~ Polaris Share webview SDK 연동, 클라이언트 개발 담당',
    ],
    tech: [
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
  },
  {
    company: 'Jakin',
    role: 'Frontend Engineer',
    period: '2018.05 - 2018.10',
    duration: '6개월',
    location: '성남시 분당구, 대한민국 · 대면',
    highlights: [
      'P2P 가상화폐 거래소 구축 프로젝트',
      'Vue.js 기반 반응형 SPA 구축',
      'Webpack 빌드 시스템 구축 및 유지보수',
      '백엔드 API 기반 테스트 코드 작성',
      '프론트엔드 성능 튜닝',
      '프론트엔드 관련 기술 문서 작성',
      'CSS 및 디자인 라이브러리 공통화 작업 진행',
    ],
    tech: ['Vue.js', 'Webpack'],
  },
  {
    company: 'INCA Internet',
    role: 'Engineer',
    period: '2017.03 - 2018.04',
    duration: '1년 2개월',
    location: '서울 구로구, 대한민국',
    highlights: [
      'nProtect Web SDK 구축 및 운영 관리 및 유지보수',
      '브라우저·모바일·OS 환경에서 동작하는 P2P 암호화 모듈 유지보수로 안전한 데이터 전송 보장',
      '키보드 보안 모듈(클라이언트 및 클라이언트-서버 통신) 유지보수를 통한 사용자 입력 보안 강화',
      'nProtect 클라이언트 통신 엔드포인트 SDK 안정화 및 플랫폼 연동 지원',
      'B2B 보안 시스템 구축 및 운영을 위한 기술 컨설팅과 고객 지원 수행',
      '신규 보안 솔루션 기업 대상 POC 진행 및 서버/클라이언트 솔루션 배포·운영 관리',
    ],
    tech: ['JavaScript', 'SDK', 'Security', 'C/C++'],
  },
  {
    company: 'MYEMS',
    role: 'Backend Engineer',
    period: '2016.04 - 2017.02',
    duration: '11개월',
    location: '서울 중구, 대한민국 · 재택',
    highlights: [
      'B2B용 Admin EMS 웹 플랫폼 설계 및 구축',
      'PHP 기반 백엔드 API 개발 및 서비스 운영, 데이터베이스 연동(Oracle / MySQL)',
      'Javascript / jQuery 기반 프론트엔드 페이지 개발로 관리용 UI 제공',
      '우체국 우정사업본부 및 롯데 글로벌로지스 등 외부 파트너와 협업하여 서버 데이터 연동 및 정산 프로세스 개발 담당',
      'Android 기반 업무용 앱 유지보수 참여(택배기사 업무 지원)',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Android', 'Java'],
  },
]

export default function CareerPage() {
  return (
    <CContentsBox className="h-[calc(100%-32px)]">
      <main className="antialiased space-y-8 max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">경력</h1>
            <p className="text-sm text-neutral-600 mt-1">주요 직무 및 성과 요약</p>
          </div>
        </header>

        <section className="space-y-8">
          {EXPERIENCES.map((exp) => {
            const id = `career-${exp.company.replace(/\s+/g, '')}`
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
                    {exp.company.split(' ')[0].slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                      <div className="space-y-1">
                        <h3
                          id={`${id}-title`}
                          className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight"
                        >
                          {exp.company}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                          {exp.role} · {exp.duration}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 font-normal">
                          {exp.location}
                        </p>
                      </div>

                      <time
                        dateTime={exp.period}
                        className="text-xs sm:text-sm text-slate-700 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap"
                      >
                        {exp.period}
                      </time>
                    </div>

                    <div className="mt-5 space-y-3">
                      {exp.highlights.map((h, index) =>
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
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 hover:scale-105 transition-all duration-200 border border-slate-200"
                          title={t}
                          aria-label={`기술 스택: ${t}`}
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
