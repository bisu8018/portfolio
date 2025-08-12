import { useTranslation } from 'react-i18next'
import ContextMenu from '@/features/commons/ContextMenu'
import HeaderNetSignalIcon from './HeaderNetSignalIcon'
import useInternetSpeed from '@/hooks/useInternetSpeed'

interface HeaderNetStatusContextMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
}

export default function HeaderNetStatusContextMenu({
  anchorEl,
  open,
  onClose,
}: HeaderNetStatusContextMenuProps) {
  const { t } = useTranslation()
  const { speed } = useInternetSpeed()
  let statusLabel = ''
  if (speed === null) statusLabel = t('network.unknown')
  else if (speed > 2) statusLabel = t('network.good')
  else statusLabel = t('network.bad')

  return (
    <ContextMenu open={open} anchor={anchorEl} onClose={onClose}>
      <div className="flex flex-col items-center min-w-[120px] p-1">
        <HeaderNetSignalIcon
          level={speed === null ? 0 : speed > 50 ? 4 : speed > 10 ? 3 : speed > 2 ? 2 : 1}
          color="#1a1a1a"
          className="!scale-[2.2] mt-3"
        />
        <div className="text-sm mt-4 text-center whitespace-pre-line">{statusLabel}</div>
      </div>
    </ContextMenu>
  )
}
