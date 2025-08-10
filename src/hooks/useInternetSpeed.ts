import { useEffect, useRef, useState } from 'react'

/**
 * 1분 간격으로 인터넷 다운로드 속도를 측정하는 hook (이미지 로딩 방식)
 * @param testImgUrl 측정에 사용할 이미지 URL (기본값: 1MB 이미지)
 * @returns { speed: number | null, lastUpdated: Date | null }
 */
export default function useInternetSpeed(testImgUrl = 'https://www.gstatic.com/webp/gallery/1.jpg') {
  const [speed, setSpeed] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const measureSpeed = useRef<() => void>(() => {})
  measureSpeed.current = () => {
    const img = new window.Image()
    const start = performance.now()
    img.onload = () => {
      const end = performance.now()
      // 1MB 이미지 기준
      const sizeMB = 1
      const seconds = (end - start) / 1000
      const mbps = (sizeMB * 8) / seconds
      setSpeed(mbps)
      setLastUpdated(new Date())
    }
    img.onerror = () => {
      setSpeed(null)
      setLastUpdated(new Date())
    }
    // 캐시 방지 쿼리 추가
    img.src = `${testImgUrl}?cacheBust=${Date.now()}`
  }

  useEffect(() => {
    if (measureSpeed.current) measureSpeed.current()
    timerRef.current = setInterval(() => {
      if (measureSpeed.current) measureSpeed.current()
    }, 60000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [testImgUrl])

  return { speed, lastUpdated }
}
