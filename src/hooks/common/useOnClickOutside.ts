import { useEffect } from 'react'

interface UseOnClickOutsideProps {
  ref: React.RefObject<HTMLElement | null>
  handler: (e: MouseEvent) => void
  deps?: unknown[]
  extraIgnore?: (target: Node) => boolean
  idIgnoreList?: string[]
}

/**
 * ref 외부 클릭 시 handler를 호출하는 커스텀 훅
 * @param props UseOnClickOutsideProps 객체
 */
export function useOnClickOutside(props: UseOnClickOutsideProps) {
  const { ref, handler, deps = [], extraIgnore, idIgnoreList } = props
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      if (extraIgnore && extraIgnore(e.target as Node)) return
      if (idIgnoreList && idIgnoreList.length > 0) {
        let node = e.target as Node | null
        while (node) {
          if (
            node instanceof HTMLElement &&
            node.id &&
            idIgnoreList.includes(node.id)
          ) {
            return
          }
          node = node.parentNode
        }
      }
      handler(e)
    }

    document.addEventListener('mousedown', handle)
    
    return () => document.removeEventListener('mousedown', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, handler, ...deps, idIgnoreList])
}
