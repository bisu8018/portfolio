import { useRef, useEffect } from 'react'
import { useMobileStore } from '@/stores/mobileStore'
import { useParallaxControlStore } from '@/stores/parallaxControlStore'

interface ParallaxTiltOptions {
  max?: number
  speed?: number 
  enabled?: boolean
  global?: boolean 
}

function useParallaxTilt({ max = 10, speed = 300, enabled, global = true }: ParallaxTiltOptions = {}) {
  const isMobile = useMobileStore((s) => s.isMobile)
  const ref = useRef<HTMLElement>(null)
  const frame = useRef<number | null>(null)
  const controlEnabled = useParallaxControlStore((s) => s.enabled)
  const isEnabled = controlEnabled ? enabled : false

  // clamp 함수
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  useEffect(() => {
    if (!isEnabled) return
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
    if (global) {
      window.addEventListener('mousemove', handle)
      window.addEventListener('mouseleave', handleLeave)
      return () => {
        mounted = false
        if (frame.current !== null) cancelAnimationFrame(frame.current)
        window.removeEventListener('mousemove', handle)
        window.removeEventListener('mouseleave', handleLeave)
      }
    } else {
      const node = ref.current
      if (!node) return
      node.addEventListener('mousemove', handle)
      node.addEventListener('mouseleave', handleLeave)
      return () => {
        mounted = false
        if (frame.current !== null) cancelAnimationFrame(frame.current)
        node.removeEventListener('mousemove', handle)
        node.removeEventListener('mouseleave', handleLeave)
        // global false일 때 화면 벗어나면 초기화
        if (node) {
          node.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
          node.style.transition = `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`
        }
      }
    }
  }, [max, speed, isEnabled, global, isMobile])

  // enabled가 false로 바뀌거나 모바일이면 transform/transition 초기화
  useEffect(() => {
    if (isEnabled && !isMobile) return

    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      ref.current.style.transition = `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`
    }
  }, [isEnabled, speed, isMobile])

  return { ref }
}

export default useParallaxTilt