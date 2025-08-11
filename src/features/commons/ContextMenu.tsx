import { useRef } from 'react'
import { useContextMenuVisible } from '@/hooks/common/useContextMenuVisible'
import { useOnClickOutside } from '@/hooks/common/useOnClickOutside'
import { useAnchorPosition } from '@/hooks/common/useAnchorPosition'

interface ContextMenuProps {
  open: boolean
  anchor: HTMLElement | null
  onClose: () => void
  children: React.ReactNode
  className?: string
}

/**
 * 맥 스타일 Popover/ContextMenu 컴포넌트
 * @param open 메뉴 표시 여부
 * @param anchor 기준이 되는 엘리먼트 (화면 위치 계산)
 * @param onClose 바깥 클릭/포커스 아웃 시 닫기 콜백
 * @param children 메뉴 내용
 * @param className 추가 클래스
 */
export default function ContextMenu(props: ContextMenuProps) {
  const { open, anchor, onClose, children, className } = props
  const visible = useContextMenuVisible(open, 180)
  const ref = useRef<HTMLDivElement>(null)

  // 바깥 클릭 시 닫기 (anchor, wrapper 내부 클릭은 무시)
  useOnClickOutside(
    ref,
    () => {
      if (open) onClose()
    },
    [open, onClose, anchor],
    (target) => {
      const isInAnchor = anchor && anchor.contains(target)
      const isInWrapper = anchor && anchor.parentElement && anchor.parentElement.contains(target)
      return Boolean(isInAnchor || isInWrapper)
    },
  )

  // anchor 기준 위치 계산
  const style = useAnchorPosition(anchor)

  if (!visible) return null

  return (
    <div
      ref={ref}
      style={style}
      className={[
        'rounded-md',
        'bg-[rgba(255,255,255,0.10)]',
        'backdrop-blur-xl',
        'border border-white/30',
        'relative overflow-hidden',
        'p-1 select-none',
        'before:absolute before:inset-0 before:rounded-md before:pointer-events-none before:z-10',
        'before:bg-gradient-to-br before:from-white/30 before:to-white/0',
        'after:absolute after:inset-0 after:rounded-md after:pointer-events-none after:z-20',
        'after:animate-glass-sparkle',
        open ? 'animate-fade-in' : 'animate-fade-out',
        className || '',
      ].join(' ')}
      tabIndex={-1}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}
