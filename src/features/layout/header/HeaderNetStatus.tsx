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

type SignalLevel = 0 | 1 | 2 | 3 | 4

type SignalColor = '#fff' | '#d1d5db' | '#1a1a1a'

type SignalIconProps = {
  level: SignalLevel
  color: SignalColor
}

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

function SignalIcon({ level, color }: SignalIconProps) {
  // 4단계 막대
  return (
    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="13" width="3" height="4" rx="1" fill={level >= 1 ? color : '#d1d5db'} />
      <rect x="7" y="9" width="3" height="8" rx="1" fill={level >= 2 ? color : '#d1d5db'} />
      <rect x="12" y="5" width="3" height="12" rx="1" fill={level >= 3 ? color : '#d1d5db'} />
      <rect x="17" y="1" width="3" height="16" rx="1" fill={level >= 4 ? color : '#d1d5db'} />
    </svg>
  )
}

export default function HeaderNetStatus({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { speed } = useInternetSpeed()
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const { t } = useTranslation()
  const level = getSignalLevel(speed)
  const color = getSignalColor(speed, isMaximized)
  let statusLabel = ''
  if (speed === null) statusLabel = t('network.unknown')
  else if (speed > 2) statusLabel = t('network.good')
  else statusLabel = t('network.bad')

  return (
    <span
      className={clsx('inline-flex items-center select-none', className)}
      role="img"
      aria-label={statusLabel}
      title={statusLabel}
      {...props}
    >
      <SignalIcon level={level} color={color} />
    </span>
  )
}
