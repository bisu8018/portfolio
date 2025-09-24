import CContentsBox from '@/features/commons/CContentsBox'
import Typewriter from '../features/commons/Typewriter'
import BlackHole from '@/features/commons/BlackHole'
import { useTranslation, Trans } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()
  const lines = t('home.hero.lines', { returnObjects: true }) as string[]

  return (
    <CContentsBox className="h-[calc(100%-32px)] overflow-y-hidden">
      <main id="main" className="flex flex-col h-full">
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
        <div className="mt-3 text-sm">{t('home.description.p2')}</div>

        <div className="mt-3 text-sm">{t('home.description.p3')}</div>

        <div className="mt-3 text-sm">{t('home.description.p4')}</div>

        <div className="flex justify-center">
          <BlackHole className="opacity-80" />
        </div>
      </main>
    </CContentsBox>
  )
}
