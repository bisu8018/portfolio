import { useTranslation } from 'react-i18next'
import { useWindowStore } from '@/stores/windowStore'
import HeaderLangIcon from './HeaderLangIcon'
import { useRef, useState } from 'react'
import HeaderLangIconContextMenu from './HeaderLangIconContextMenu'

/**
 * HeaderLang 컴포넌트
 * 현재 언어를 아이콘으로 표시합니다.
 * @component
 * @returns {JSX.Element} 언어 아이콘
 */
export default function HeaderLang({ ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const { i18n } = useTranslation()
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const lang = i18n.language.split('-')[0]

  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen((prev) => !prev)
  }

  return (
    <>
      <span ref={ref} onMouseDown={handleMouseDown} {...props}>
        <HeaderLangIcon
          lang={lang}
          className={isMaximized ? 'text-[#1a1a1a] border-[#1a1a1a]' : 'text-white border-white'}
        />
      </span>
      <HeaderLangIconContextMenu
        anchorEl={ref.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
