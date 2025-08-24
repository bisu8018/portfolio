import { useParallaxControlStore } from '@/stores/parallaxControlStore'
import { useWindowStore } from '@/stores/windowStore'
import { useState, useEffect } from 'react'

/**
 * 화면 중앙에서 마우스가 멀어질수록 blur 값이 증가하는 hook
 * @param minBlur 최소 blur 값 (기본값 6)
 * @param maxBlur 최대 blur 값 (기본값 32)
 * @returns blur 값 (number)
 */
export default function useDynamicBlur(minBlur: number = 6, maxBlur: number = 32) {
  const [blur, setBlur] = useState(minBlur)
  const controlEnabled = useParallaxControlStore((s) => s.enabled)
  const isMaximized = useWindowStore((s: { isMaximized: boolean }) => s.isMaximized)
  const enabled = controlEnabled && !isMaximized

  useEffect(() => {
    if (!enabled) {
      setBlur(minBlur)
      return
    }
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = e.clientX
      const y = e.clientY
      // 가운데에서의 거리 계산
      const dx = Math.abs(x - innerWidth / 2)
      const dy = Math.abs(y - innerHeight / 2)
      const dist = Math.sqrt(dx * dx + dy * dy)
      // 최대 거리 기준 blur 계산
      const maxDist = Math.sqrt((innerWidth / 2) ** 2 + (innerHeight / 2) ** 2)
      const blurValue =
        minBlur + Math.min(maxBlur - minBlur, (dist / maxDist) * (maxBlur - minBlur))
      setBlur(blurValue)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [minBlur, maxBlur, enabled])

  return blur
}
