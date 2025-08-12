import { useContextMenuStore } from '@/stores/contextMenuStore'
import { useEffect, useState } from 'react'
/**
 * ContextMenu 등에서 fade-out 애니메이션 후 언마운트 처리를 위한 visible 상태 관리 훅
 * @param open 메뉴 open 여부
 * @param duration fade-out 후 언마운트까지 대기 시간(ms)
 * @returns visible: 실제로 렌더링할지 여부
 */
export function useContextMenuVisible(open: boolean, duration: number = 180) {
  const [visible, setVisible] = useState(open)
  const setVisibleStore = useContextMenuStore((s) => s.setVisible)

  useEffect(() => {
    if (open) {
      setVisible(true)
      setVisibleStore(true)
    }
  }, [open, setVisibleStore])

  useEffect(() => {
    if (!open && visible) {
      const timeout = setTimeout(() => {
        setVisible(false)
        setVisibleStore(false)
      }, duration)
      return () => clearTimeout(timeout)
    }
  }, [open, visible, duration, setVisibleStore])

  return visible
}
