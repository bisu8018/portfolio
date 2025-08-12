/**
 * HeaderNetStatus 컴포넌트
 * 네트워크 상태를 아이콘으로 표시합니다.
 * @component
 * @returns {JSX.Element} 네트워크 상태 아이콘
 */
import useInternetSpeed from '@/hooks/useInternetSpeed'
import { useWindowStore } from '@/stores/windowStore'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import HeaderNetStatusContextMenu from './HeaderNetStatusContextMenu'
import HeaderNetSignalIcon from './HeaderNetSignalIcon'

type SignalLevel = 0 | 1 | 2 | 3 | 4

type SignalColor = '#fff' | '#d1d5db' | '#1a1a1a'

type HeaderNetStatusProps = React.HTMLAttributes<HTMLSpanElement>

function getSignalLevel(speed: number | null): SignalLevel {
  if (speed === null) return 0
  if (speed > 50) return 4
  if (speed > 10) return 3
  if (speed > 2) return 2
  return 1
}

function getSignalColor(speed: number | null, isMaximized: boolean): SignalColor {
  if (speed === null) return '#d1d5db' // gray-400
  if (speed > 2) return isMaximized ? '#1a1a1a' : '#fff' // 최대화 시 검정, 아니면 흰색
  return '#d1d5db' // 회색(느림/끊김)
}

const HeaderNetStatus: React.FC<HeaderNetStatusProps> = ({ className, ...props }) => {
  const { speed } = useInternetSpeed()
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const level = getSignalLevel(speed)
  const color = getSignalColor(speed, isMaximized)
  let statusLabel = ''
  if (speed === null) statusLabel = t('network.unknown')
  else if (speed > 2) statusLabel = t('network.good')
  else statusLabel = t('network.bad')

  return (
    <>
      <span
        className={clsx('inline-flex items-center select-none cursor-pointer', className)}
        role="img"
        aria-label={statusLabel}
        title={statusLabel}
        tabIndex={0}
        {...props}
        onClick={(e) => {
          setAnchorEl(e.currentTarget)
          setMenuOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setAnchorEl(e.currentTarget as HTMLElement)
            setMenuOpen(true)
          }
        }}
      >
        <HeaderNetSignalIcon level={level} color={color} />
      </span>
      <HeaderNetStatusContextMenu
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}

export default HeaderNetStatus
