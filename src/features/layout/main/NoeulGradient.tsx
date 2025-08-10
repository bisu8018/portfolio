/**
 * NoeulGradient 컴포넌트
 * 메인 영역의 그라데이션 배경을 렌더링합니다.
 * @component
 * @returns {JSX.Element} 그라데이션 배경
 */
import { useRef, useEffect, useState } from 'react'
import { useWindowStore } from '@/stores/windowStore'

export default function NoeulGradient() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const isMaximized = useWindowStore((s: { isMaximized: boolean }) => s.isMaximized)

  useEffect(() => {
    if (isMaximized) {
      setMouse({ x: 0.5, y: 0.5 })
      return
    }
    const handleMouseMove = (e: MouseEvent) => {
      const main = mainRef.current
      if (!main) return
      const { width, height, left, top } = main.getBoundingClientRect()
      const x = Math.min(Math.max((e.clientX - left) / width, 0), 1)
      const y = Math.min(Math.max((e.clientY - top) / height, 0), 1)
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMaximized])

  useEffect(() => {
    if (isMaximized) return
    const handleMouseMove = (e: MouseEvent) => {
      const main = mainRef.current
      if (!main) return
      const { width, height, left, top } = main.getBoundingClientRect()
      const x = Math.min(Math.max((e.clientX - left) / width, 0), 1)
      const y = Math.min(Math.max((e.clientY - top) / height, 0), 1)
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMaximized])

  // 최대화 상태면 opacity 0으로 처리
  const pinkOpacity = isMaximized ? 0 : (1 - mouse.x) * (1 - mouse.y) * 0.4
  const purpleOpacity = isMaximized ? 0 : mouse.x * mouse.y * 0.4

  return (
    <>
      {/* 핑크빛 노을 (좌상단) */}
      <div
        ref={mainRef}
        className="pointer-events-none absolute left-0 top-0 w-full h-full z-[-1]"
        style={{
          background: 'radial-gradient(circle at 0% 0%, #ffb6d5 0%, #ffd6e8 60%, transparent 100%)',
          opacity: pinkOpacity,
          transition: 'opacity 0.2s',
        }}
      />
      {/* 보라빛 노을 (우하단) */}
      <div
        className="pointer-events-none absolute left-0 top-0 w-full h-full z-[-1]"
        style={{
          background:
            'radial-gradient(circle at 100% 100%, #b6aaff 0%, #e0d6ff 60%, transparent 100%)',
          opacity: purpleOpacity,
          transition: 'opacity 0.2s',
        }}
      />
    </>
  )
}
