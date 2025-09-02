import ContextMenu from '@/features/commons/ContextMenu'
import HeaderControlCenterParallaxToggleBtn from './HeaderControlCenterParallaxToggleBtn'
import HeaderControlRainToggleBtn from './HeaderControlRainToggleBtn'
import { useTranslation } from 'react-i18next'

interface HeaderControlCenterContextMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
}

/**
 * macOS 스타일의 컨트롤센터 컨텍스트 메뉴
 */
export default function HeaderControlCenterContextMenu({
  anchorEl,
  open,
  onClose,
}: HeaderControlCenterContextMenuProps) {
  const { t } = useTranslation()
  return (
    <ContextMenu open={open} anchor={anchorEl} onClose={onClose}>
      <div className="flex flex-col gap-y-3 p-2">
        <div className="flex items-center gap-x-3 text-sm">
          <HeaderControlCenterParallaxToggleBtn />
          <div>{t('header.parallax')}</div>
        </div>

        <div className="flex items-center gap-x-3 text-sm">
          <HeaderControlRainToggleBtn />
          <div>{t('header.rain')}</div>
        </div>
      </div>
    </ContextMenu>
  )
}
