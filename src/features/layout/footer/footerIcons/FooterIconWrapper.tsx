import React from 'react'

interface FooterIconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string // tailwind 색상 클래스 또는 hex/rgb 등
  selected?: boolean
  children: React.ReactNode
  tooltipText?: string
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
  ...props
}: FooterIconWrapperProps) {
  return (
    <div
      className={`group relative inline-flex items-center justify-center rounded-xl p-1 size-13 ${bgColor} ${className}`}
      {...props}
    >
      {tooltipText && (
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-12 z-20 whitespace-nowrap px-4 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-full after:w-0 after:h-0 after:border-x-8 after:border-x-transparent after:border-t-8 after:border-t-gray-800">
          {tooltipText}
        </span>
      )}
      {children}
      {selected && (
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-1.5 h-1.5 rounded-full bg-white/50 shadow" />
      )}
    </div>
  )
}
