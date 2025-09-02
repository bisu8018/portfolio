/**
 * HeaderTime 컴포넌트
 * 현재 시간을 표시합니다.
 * @component
 * @returns {JSX.Element} 시간 표시
 */
import clsx from 'clsx'
import { useClock } from '@/hooks/useClock'
import { useWindowStore } from '@/stores/windowStore'
import { useRnbStore } from '@/stores/rnbStore'

type HeaderTimeProps = React.HTMLAttributes<HTMLTimeElement>

export default function HeaderTime({ className, ...props }: HeaderTimeProps) {
  const { now, formatDate } = useClock()
  const setOpen = useRnbStore((s) => s.setOpen)
  const open = useRnbStore((s) => s.open)
  const isMaximized = useWindowStore((s) => s.isMaximized)

  const timeString = formatDate(now)

  const onClick = () => {
    setOpen(!open)
  }

  return (
    <time
      id="header-time"
      onClick={onClick}
      className={clsx(
        'text-sm select-none tracking-tighter',
        isMaximized ? 'text-[#1a1a1a]' : 'text-white',
        className,
      )}
      dateTime={now.toISOString()}
      aria-label={timeString}
      title={timeString}
      role="timer"
      {...props}
    >
      {timeString}
    </time>
  )
}
