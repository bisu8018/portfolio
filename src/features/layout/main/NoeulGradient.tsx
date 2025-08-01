import { useRef, useEffect, useState } from 'react'

export default function NoeulGradient() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
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
  }, [])

  // 그라데이션 opacity 계산 (핑크: 좌상단 가까울수록, 보라: 우하단 가까울수록)
  const pinkOpacity = 0.18 + (1 - mouse.x) * (1 - mouse.y) * 0.22 // 최대 0.4
  const purpleOpacity = 0.22 + mouse.x * mouse.y * 0.22 // 최대 0.4

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
