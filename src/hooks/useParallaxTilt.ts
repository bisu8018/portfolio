import { useRef, useEffect } from 'react'

interface ParallaxTiltOptions {
  max?: number
  speed?: number // ms 단위, transition-duration
  enabled?: boolean
}

function useParallaxTilt({ max = 10, speed = 300, enabled = true }: ParallaxTiltOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const frame = useRef<number | null>(null)

  // clamp 함수
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  useEffect(() => {
    if (!enabled) return
    if (!ref.current) return
    let mounted = true
    const handle = (e: MouseEvent) => {
      if (!mounted || !ref.current) return
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        if (!mounted || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const normX = clamp((x - centerX) / centerX, -1, 1)
        const normY = clamp((y - centerY) / centerY, -1, 1)
        const rotateY = normX * max
        const rotateX = -normY * max
        ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        ref.current.style.transition = `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`
      })
    }
    const handleLeave = () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      if (ref.current) {
        ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
        ref.current.style.transition = `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`
      }
    }
    window.addEventListener('mousemove', handle)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      mounted = false
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      window.removeEventListener('mousemove', handle)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [max, speed, enabled])

  // enabled가 false로 바뀌면 transform/transition 초기화
  useEffect(() => {
    if (enabled) return
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      ref.current.style.transition = `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`
    }
  }, [enabled, speed])

  return { ref }
}

export default useParallaxTilt