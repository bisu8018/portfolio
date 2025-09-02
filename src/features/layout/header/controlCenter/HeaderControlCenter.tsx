import { useRef, useState } from 'react'
import HeaderControlCenterIcon from './HeaderControlCenterIcon'
import HeaderControlCenterContextMenu from './HeaderControlCenterContextMenu'

/**
 * 헤더 우측 macOS 스타일 컨트롤센터 트리거 및 컨텍스트 메뉴
 */
export default function HeaderControlCenter({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const ref = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen((prev) => !prev)
  }

  return (
    <>
      <span ref={ref} onMouseDown={handleMouseDown} className={className} {...props}>
        <HeaderControlCenterIcon />
      </span>
      <HeaderControlCenterContextMenu
        anchorEl={ref.current}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
