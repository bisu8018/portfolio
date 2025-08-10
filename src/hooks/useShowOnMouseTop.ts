import { useEffect, useState } from 'react'

export function useShowOnMouseTop(threshold: number = 32, onlyWhenMaximized?: boolean) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (onlyWhenMaximized === false) return
    const handleMouseMove = (e: MouseEvent) => {
      setShow(e.clientY <= threshold)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [threshold, onlyWhenMaximized])
  return show
}
