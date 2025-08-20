import { useEffect, useState } from 'react'

export function useShowOnMouseBottom(threshold: number = 100) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setShow(window.innerHeight - e.clientY <= threshold)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [threshold])
  return show
}
