import { useEffect, useState } from 'react'

/**
 * main-layout의 width를 3으로 나눈 값을 maxWidth로 반환하는 hook
 * @param initial 초기 maxWidth 값 (기본값 466)
 * @returns [maxWidth, setMaxWidth]
 */
export function useLnbDynamicMaxWidth(initial: number = 466): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [maxWidth, setMaxWidth] = useState(initial)

  useEffect(() => {
    const updateMaxWidth = () => {
      const main = document.getElementById('main-layout')
      if (main) {
        setMaxWidth(Math.floor(main.offsetWidth / 3))
      }
    }
    updateMaxWidth()
    window.addEventListener('resize', updateMaxWidth)
    return () => window.removeEventListener('resize', updateMaxWidth)
  }, [])

  return [maxWidth, setMaxWidth]
}
