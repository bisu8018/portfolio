import Typewriter from '../features/commons/Typewriter'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()
  const lines = t('home.hero.lines', { returnObjects: true }) as string[]

  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <div className="text-md">{t('home.hero.greeting')}</div>
        <div className="font-bold text-xl">
          <Typewriter texts={lines} />
        </div>
        <div className="text-md">{t('home.hero.suffix')}</div>
      </div>
    </div>
  )
}
