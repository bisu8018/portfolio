import { useRef, useState } from 'react'
import HeaderControlCenterIcon from './HeaderControlCenterIcon'
import HeaderControlCenterContextMenu from './HeaderControlCenterContextMenu'

/**
 * 헤더 우측 macOS 스타일 컨트롤센터 트리거 및 컨텍스트 메뉴
 */
export default function HeaderControlCenter({
  className = '',
  menuOpen,
  setMenuOpen,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  menuOpen?: boolean
  setMenuOpen?: (v: boolean) => void
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const isOpen = typeof menuOpen === 'boolean' ? menuOpen : open

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen((prev) => {
      const next = !prev
      if (typeof setMenuOpen === 'function') setMenuOpen(next)
      return next
    })
  }

  return (
    <>
      <span ref={ref} onMouseDown={handleMouseDown} className={className} {...props}>
        <HeaderControlCenterIcon />
      </span>
      <HeaderControlCenterContextMenu
        anchorEl={ref.current}
        open={isOpen}
        onClose={() => {
          setOpen(false)
          if (typeof setMenuOpen === 'function') setMenuOpen(false)
        }}
      />
    </>
  )
}
