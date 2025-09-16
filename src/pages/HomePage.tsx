import CContentsBox from '@/features/commons/CContentsBox'
import Typewriter from '../features/commons/Typewriter'
import { useTranslation, Trans } from 'react-i18next'
import Spline from '@splinetool/react-spline'

export default function HomePage() {
  const { t } = useTranslation()
  const lines = t('home.hero.lines', { returnObjects: true }) as string[]

  return (
    <CContentsBox className="min-[900px]:h-[475px]">
      <main id="main">
        <div className="font-bold text-xl text-left">
          <Typewriter texts={lines} />
        </div>

        <h1 className="text-sm mt-5 text-left">{t('home.hero.greeting')}</h1>

        <div className="mt-3 text-sm text-left">
          <Trans
            i18nKey="home.description.p1"
            components={{
              strong: (
                <span className="mx-1 font-bold text-md bg-gradient-to-r from-purple-600 via-purple-400 to-indigo-400 bg-clip-text text-transparent" />
              ),
            }}
          />
        </div>

        <div className="mt-3 text-sm text-left">{t('home.description.p2')}</div>

        <div className="mt-3 text-sm text-left">{t('home.description.p3')}</div>

        <div className="mt-3 text-sm text-left">{t('home.description.p4')}</div>

        <div className="absolute w-full h-[254px] left-0 -bottom-[57px] max-[900px]:hidden">
          <Spline scene="https://prod.spline.design/nNYxzif-G0M27BhX/scene.splinecode" />
        </div>
      </main>
    </CContentsBox>
  )
}
