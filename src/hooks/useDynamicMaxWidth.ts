import { useEffect, useState } from 'react'

export default function useDynamicMaxWidth() {
  const [dynamicMaxWidth, setDynamicMaxWidth] = useState('1280px')

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1300) {
        setDynamicMaxWidth(`${window.innerWidth - 60}px`)
      } else {
        setDynamicMaxWidth('1280px')
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dynamicMaxWidth
}