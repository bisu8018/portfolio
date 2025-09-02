import React, { useState } from 'react'
import { useWindowStore } from '@/stores/windowStore'
import clsx from 'clsx'

type HeaderItemWrapperProps = React.HTMLAttributes<HTMLDivElement>

/**
 * HeaderItemWrapper 컴포넌트
 * 헤더 아이템들을 감싸고 클릭 시 배경 효과를 제공합니다.
 * @component
 * @returns {JSX.Element} 헤더 아이템 래퍼
 */
function HeaderItemChildWrapper({ children, className }: HeaderItemWrapperProps) {
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const [isActive, setIsActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  type MenuControlProps = {
    menuOpen: boolean
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  }
  const childWithProps = React.isValidElement<MenuControlProps>(children)
    ? React.cloneElement(children, { menuOpen, setMenuOpen })
    : children

  return (
    <div
      className={clsx(
        'transition-colors px-2 py-0.5 rounded-md flex items-center justify-center',
        isActive || menuOpen
          ? isMaximized
            ? 'bg-gray-400/20'
            : 'bg-white/20'
          : isMaximized
            ? 'hover:bg-gray-400/20'
            : 'hover:bg-white/20',
        className,
      )}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      {childWithProps}
    </div>
  )
}

/**
 * HeaderItemWrapper 컴포넌트
 * 헤더 아이템들을 감싸고 클릭 시 배경 효과를 제공합니다.
 * @component
 * @returns {JSX.Element} 헤더 아이템 래퍼
 */
export default function HeaderItemWrapper({ children, className }: HeaderItemWrapperProps) {
  return (
    <div className={clsx('absolute right-4 gap-1 flex items-center', className)}>
      {React.Children.map(children, (child, idx) => (
        <HeaderItemChildWrapper key={idx}>{child}</HeaderItemChildWrapper>
      ))}
    </div>
  )
}
