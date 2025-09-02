import { useRef } from 'react'
import React from 'react'
import { motion } from 'framer-motion'
import { useWindowStore } from '@/stores/windowStore'
import { useMobileStore } from '@/stores/mobileStore'
import { useRainControlStore } from '@/stores/rainControlStore'
import clsx from 'clsx'

export interface RainDrop {
  left: number
  duration: number
  delay: number
  height: number
}

export interface RainProps extends React.HTMLAttributes<HTMLDivElement> {
  dropCount?: number
}

/**
 * RainEffect: 배경에 비 내리는 효과를 렌더링하는 컴포넌트 (framer-motion + tailwind)
 */
const RainEffect = React.memo(function RainEffect({
  dropCount = 40,
  className,
  ...props
}: RainProps) {
  const isMinimized = useWindowStore((s) => s.isMinimized)
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const isMobile = useMobileStore((s) => s.isMobile)
  const rainEnabled = useRainControlStore((s) => s.enabled)
  // drops 배열을 useRef로 한 번만 생성 (조건문보다 위에서 호출)
  const dropsRef = useRef<RainDrop[]>([])

  // 조건: 최소화, 최대화, 모바일, rainEnabled === false 중 하나라도 true면 렌더링 X
  if (isMinimized || isMaximized || isMobile || !rainEnabled) return null

  if (dropsRef.current.length !== dropCount) {
    dropsRef.current = Array.from({ length: dropCount }).map(() => {
      const left = Math.random() * 100
      const duration = 0.7 + Math.random() * 0.8
      const delay = Math.random() * 1.2
      const height = 16 + Math.random() * 16
      return { left, duration, delay, height }
    })
  }
  const drops = dropsRef.current
  return (
    <div
      className={clsx('pointer-events-none absolute inset-0 z-10', className)}
      aria-hidden="true"
      {...props}
    >
      {drops.map((drop, i) => (
        <motion.div
          key={i}
          initial={{ top: -24, opacity: 0.7 }}
          animate={{ top: '100%', opacity: [0.7, 0.7, 0] }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          className="absolute w-[2px] rounded-full bg-gradient-to-b from-white/80 to-white/30"
          style={{ left: `${drop.left}%`, height: drop.height }}
        />
      ))}
    </div>
  )
})

export { RainEffect }
