import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContextMenuVisible } from '@/hooks/common/useContextMenuVisible'
import { useOnClickOutside } from '@/hooks/common/useOnClickOutside'
import { useAnchorPosition } from '@/hooks/common/useAnchorPosition'
import GlassLayeredBox from './GlassLayeredBox'
import clsx from 'clsx'

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
  const visible = useContextMenuVisible(open, 0)
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          tabIndex={-1}
          onMouseDown={(e) => e.stopPropagation()}
          style={{ ...style, background: 'none', boxShadow: 'none' }}
        >
          <GlassLayeredBox radius={10} className={clsx('pointer-events-auto p-2', className)}>
            {children}
          </GlassLayeredBox>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
