import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useWindowStore } from '@/stores/windowStore'

interface FooterIconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string // tailwind 색상 클래스 또는 hex/rgb 등
  selected?: boolean
  tooltipText?: string
  routePath?: string
}

/**
 * FooterIconWrapper - 아이콘용 배경 컴포넌트 (rounded-md, 배경색 지정)
 */
export default function FooterIconWrapper({
  bgColor = 'bg-white',
  className = '',
  selected = true,
  tooltipText,
  children,
  routePath,
  ...props
}: FooterIconWrapperProps) {
  const navigate = useNavigate()
  const setMinimized = useWindowStore((s) => s.setMinimized)
  const location = useLocation()
  const handleClick = () => {
    if (!routePath) return
    setMinimized(false)

    const getFirstDepth = (path: string) => {
      const seg = path.split('/').filter(Boolean)
      return seg.length > 0 ? seg[0] : ''
    }
    const currentFirst = getFirstDepth(location.pathname)
    const targetFirst = getFirstDepth(routePath)
    if (currentFirst !== targetFirst) {
      navigate(routePath)
    }
  }
  const content = (
    <>
      {tooltipText && (
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-12 z-20 whitespace-nowrap px-4 py-1 text-xs rounded-md text-gray-900 border border-white/30 bg-white opacity-0 group-hover:opacity-100 duration-0 delay-0"
          style={{ overflow: 'visible', transitionDelay: '0s', transitionDuration: '0s' }}
        >
          {tooltipText}
          <span
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 opacity-100"
            style={{
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid #fff',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              marginTop: '-1px',
              borderTopColor: '#fff',
              borderBottom: 'none',
              zIndex: 2,
            }}
          />
        </span>
      )}
      {children}
      {selected && (
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-1.5 h-1.5 rounded-full bg-white/50 shadow" />
      )}
    </>
  )

  if (routePath) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={`group relative inline-flex items-center justify-center rounded-xl p-1 size-13 cursor-pointer ${bgColor} ${className}`}
        onClick={handleClick}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick()
        }}
        {...props}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      className={`group relative inline-flex items-center justify-center rounded-xl p-1 size-13 cursor-pointer ${bgColor} ${className}`}
      {...props}
    >
      {content}
    </div>
  )
}
