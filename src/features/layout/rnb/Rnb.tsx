import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useRnbStore } from '@/stores/rnbStore'
import { useOnClickOutside } from '@/hooks/common/useOnClickOutside'
import RnbParallaxToggleBtn from './RnbParallaxToggleBtn'
import GlassLayeredBox from '@/features/commons/GlassLayeredBox'
import RnbWeatherWidget from './RnbWeatherWidget'
import RnbRainToggleBtn from './RnbRainToggleBtn'

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
  const [isVisible, setIsVisible] = useState(open)

  useOnClickOutside({
    ref: asideRef,
    handler: () => setOpen(false),
    deps: [open],
    idIgnoreList: ['header-time'],
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if (open) {
      setIsVisible(true)
    } else {
      timeout = setTimeout(() => setIsVisible(false), 280)
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [open])

  useEffect(() => {
    return () => {
      setOpen(false)
    }
  }, [setOpen])

  return (
    <motion.aside
      ref={asideRef}
      initial={{ x: '100%', opacity: 0 }}
      animate={{
        x: open ? 0 : '100%',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
      }}
      style={{ display: isVisible ? undefined : 'none' }}
      className="fixed top-[28px] right-0 h-[calc(100%-28px)] w-[440px] z-50 p-5 h-fit"
    >
      <GlassLayeredBox radius={10}>
        <div className="w-full h-full relative flex flex-col p-5 gap-5">
          <div className="flex gap-x-3">
            <RnbParallaxToggleBtn />
            <RnbRainToggleBtn />
          </div>
          <div className="flex gap-x-5">
            <RnbWeatherWidget countryCode="kr" />
            <RnbWeatherWidget countryCode="us" />
          </div>
        </div>
      </GlassLayeredBox>
    </motion.aside>
  )
}
