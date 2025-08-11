import { useEffect } from 'react'
/**
 * ref 외부 클릭 시 handler를 호출하는 커스텀 훅
 * @param ref 감지할 HTMLElement의 ref
 * @param handler 바깥 클릭 시 실행할 함수
 * @param deps 의존성 배열 (선택)
 * @param extraIgnore 특정 노드 클릭을 무시할 추가 조건 (선택)
 */
export function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (e: MouseEvent) => void,
  deps: unknown[] = [],
  extraIgnore?: (target: Node) => boolean
) {
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      if (extraIgnore && extraIgnore(e.target as Node)) return

      handler(e)
    }

    document.addEventListener('mousedown', handle)
    
    return () => document.removeEventListener('mousedown', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, handler, ...deps])
}
