import { useTranslation } from 'react-i18next'

import ContextMenu from '@/features/commons/ContextMenu'
import HeaderLangIcon from './HeaderLangIcon'

interface HeaderLangIconContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
}

export default function HeaderLangIconContextMenu({
  anchorEl,
  open,
  onClose,
  ...props
}: HeaderLangIconContextMenuProps) {
  const { i18n, t } = useTranslation()

  return (
    <ContextMenu open={open} anchor={anchorEl} onClose={onClose}>
      <div className="flex flex-col min-w-[120px] text-sm" {...props}>
        <button
          className="text-left flex items-center gap-2 px-3 py-2 hover:bg-white/40 hover:rounded-md cursor-pointer"
          onClick={() => {
            i18n.changeLanguage('ko')
            onClose()
          }}
        >
          <HeaderLangIcon lang="ko" className="text-base" />
          {t('lang.korean', '한국어')}
        </button>

        <button
          className="text-left flex items-center gap-2 px-3 py-2 hover:bg-white/40 hover:rounded-md cursor-pointer"
          onClick={() => {
            i18n.changeLanguage('en')
            onClose()
          }}
        >
          <HeaderLangIcon lang="en" className="text-base" />
          {t('lang.english', 'English')}
        </button>
      </div>
    </ContextMenu>
  )
}
