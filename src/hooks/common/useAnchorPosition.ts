
/**
 * anchor HTMLElement의 기준 위치(팝오버, 메뉴 등)를 계산하는 커스텀 훅
 * @param anchor 기준이 되는 HTMLElement (null 가능)
 * @returns React.CSSProperties로 바로 쓸 수 있는 위치 스타일 객체
 */
import { useMemo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function useAnchorPosition(anchor: HTMLElement | null) {
  const { i18n } = useTranslation()
  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (!anchor) {
      setRect(null)
      return
    }
    // 언어 변경 시 DOM 업데이트 후 위치 계산을 위해 약간의 딜레이
    const updateRect = () => setRect(anchor.getBoundingClientRect())
    updateRect()
    const handleLang = () => setTimeout(updateRect, 30)
    i18n.on('languageChanged', handleLang)
    return () => {
      i18n.off('languageChanged', handleLang)
    }
  }, [anchor, i18n])

  return useMemo(() => {
    if (!rect) return {}
    return {
      top: rect.bottom + 8,
      left: rect.left,
      minWidth: rect.width,
      position: 'fixed' as const,
      zIndex: 1000,
    }
  }, [rect])
}
