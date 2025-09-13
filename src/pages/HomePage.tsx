import CContentsBox from '@/features/commons/CContentsBox'
import Typewriter from '../features/commons/Typewriter'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()
  const lines = t('home.hero.lines', { returnObjects: true }) as string[]

  return (
    <main id="main" className="">
      <CContentsBox>
        <div className="font-bold text-xl text-left">
          <Typewriter texts={lines} />
        </div>

        <h1 className="text-sm mt-5  text-left">{t('home.hero.greeting')}</h1>

        <div className="mt-3 text-sm max-w-2xl text-left">
          저는 사용자와의 접점을 설계하고, 브랜드의 감성을 담아내며, 기획의 의도를 섬세하게 구현하는
          것에 가치를 두고 있습니다.
        </div>
      </CContentsBox>
    </main>
  )
}
