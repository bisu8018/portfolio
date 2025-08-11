import React, { useState } from 'react'
import { useWindowStore } from '@/stores/windowStore'
import clsx from 'clsx'

type HeaderItemWrapperProps = {
  children: React.ReactNode
  className?: string
}

/**
 * HeaderItemWrapper 컴포넌트
 * 헤더 아이템들을 감싸고 클릭 시 배경 효과를 제공합니다.
 * @component
 * @returns {JSX.Element} 헤더 아이템 래퍼
 */
function HeaderItemChildWrapper({
  child,
  className,
  isMaximized,
}: {
  child: React.ReactNode
  className?: string
  isMaximized?: boolean
}) {
  const [isActive, setIsActive] = useState(false)
  return (
    <div
      className={clsx(
        'transition-colors px-2 py-0.5 rounded-md flex items-center justify-center',
        isActive ? (isMaximized ? 'bg-gray-400/20' : 'bg-white/20') : '',
        className,
      )}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      {child}
    </div>
  )
}

/** * HeaderItemWrapper 컴포넌트
 * 헤더 아이템들을 감싸고 클릭 시 배경 효과를 제공합니다.
 * @component
 * @returns {JSX.Element} 헤더 아이템 래퍼
 */
export default function HeaderItemWrapper({ children, className }: HeaderItemWrapperProps) {
  const isMaximized = useWindowStore((s) => s.isMaximized)
  return (
    <div className="absolute right-4 flex items-center">
      {React.Children.map(children, (child, idx) => (
        <HeaderItemChildWrapper
          key={idx}
          child={child}
          className={className}
          isMaximized={isMaximized}
        />
      ))}
    </div>
  )
}
