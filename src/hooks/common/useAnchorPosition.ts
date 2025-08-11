
/**
 * anchor HTMLElement의 기준 위치(팝오버, 메뉴 등)를 계산하는 커스텀 훅
 * @param anchor 기준이 되는 HTMLElement (null 가능)
 * @returns React.CSSProperties로 바로 쓸 수 있는 위치 스타일 객체
 */
import { useMemo } from 'react'

export function useAnchorPosition(anchor: HTMLElement | null) {
  return useMemo(() => {
    if (!anchor) return {}
    
    const rect = anchor.getBoundingClientRect()

    return {
      top: rect.bottom + 8,
      left: rect.left,
      minWidth: rect.width,
      position: 'fixed' as const,
      zIndex: 1000,
    }
  }, [anchor])
}
