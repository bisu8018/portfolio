import clsx from 'clsx'

const LANG_ICON: Record<string, string> = {
  ko: '한',
  en: 'A',
}

export default function HeaderLangIcon({ lang, className }: { lang: string; className?: string }) {
  const icon = LANG_ICON[lang] || lang.toUpperCase()
  return (
    <span
      className={clsx(
        'flex items-center justify-center w-7 h-5 rounded text-xs font-bold select-none border',
        className,
      )}
      role="img"
      aria-label={lang}
      title={lang}
    >
      {icon}
    </span>
  )
}
