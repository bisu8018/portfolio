/**
 * HeaderLangIcon 컴포넌트
 * 현재 언어를 아이콘으로 표시합니다.
 * @component
 * @returns {JSX.Element} 언어 아이콘
 */
import { useTranslation } from 'react-i18next'
import { useWindowStore } from '@/stores/windowStore'
import clsx from 'clsx'

const LANG_ICON: Record<string, string> = {
  ko: '한',
  en: 'A',
}

export default function HeaderLangIcon({ ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const { i18n, t } = useTranslation()
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const lang = i18n.language.split('-')[0]
  const icon = LANG_ICON[lang] || lang.toUpperCase()
  const LANG_LABEL: Record<string, string> = {
    ko: t('lang.korean', '한국어'),
    en: t('lang.english', 'English'),
  }
  const langLabel = LANG_LABEL[lang] || lang.toUpperCase()

  const onClick = () => {
    console.log('Language icon clicked')
  }

  return (
    <span
      className={clsx(
        'flex items-center justify-center w-7 h-5 rounded text-xs font-bold select-none border',
        isMaximized ? 'text-[#1a1a1a] border-[#1a1a1a]' : 'text-white border-white',
      )}
      onClick={onClick}
      role="img"
      aria-label={langLabel}
      title={langLabel}
      {...props}
    >
      {icon}
    </span>
  )
}
