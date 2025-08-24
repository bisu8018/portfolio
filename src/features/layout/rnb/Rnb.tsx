import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useRnbStore } from '@/stores/rnbStore'
import { useOnClickOutside } from '@/hooks/common/useOnClickOutside'
import RnbParallaxToggleBtn from './RnbParallaxToggleBtn'
import RnbGradient from './RnbGradient'

/**
 * macOS 스타일 우측 내비게이션(RNB) 패널 컴포넌트
 *
 * - 외부 클릭 시 자동 닫힘
 * - 반투명/그라디언트 SVG 배경
 * - Parallax 토글 등 위젯 배치
 * - 언마운트 시 open 상태 초기화
 */
export default function Rnb() {
  const open = useRnbStore((s) => s.open)
  const setOpen = useRnbStore((s) => s.setOpen)
  const asideRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside({
    ref: asideRef,
    handler: () => setOpen(false),
    deps: [open],
    idIgnoreList: ['header-time'],
  })

  useEffect(() => {
    return () => {
      setOpen(false)
    }
  }, [setOpen])

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          ref={asideRef}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-[28px] right-0 h-[calc(100%-28px)] w-[300px] z-50 flex flex-col py-3 px-5"
        >
          <RnbGradient />

          <div className="relative z-10 flex flex-col h-full">
            <RnbParallaxToggleBtn />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
