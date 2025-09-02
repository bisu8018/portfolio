/**
 * Header 컴포넌트
 * 상단 헤더 영역을 담당합니다.
 * @component
 * @returns {JSX.Element} 헤더 영역
 */
import { useWindowStore } from '@/stores/windowStore'
import { useShowOnMouseTop } from '@/hooks/useShowOnMouseTop'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import CWindowToolBtns from '../../commons/CWindowToolBtns'
import HeaderTime from './HeaderTime'
import HeaderLang from './lang/HeaderLang'
import HeaderItemWrapper from './HeaderItemWrapper'
import { useContextMenuStore } from '@/stores/contextMenuStore'
import HeaderNetStatus from './netStatus/HeaderNetStatus'
import HeaderControlCenter from './controlCenter/HeaderControlCenter'

type HeaderProps = React.HTMLAttributes<HTMLDivElement>

export default function Header({ className, style, ...props }: HeaderProps) {
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const mouseTopShow = useShowOnMouseTop(32, true)
  const contextMenuVisible = useContextMenuStore((s) => s.visible)

  let show: boolean
  if (isMaximized) {
    if (contextMenuVisible) {
      show = true
    } else {
      show = mouseTopShow
    }
  } else {
    show = true
  }

  const [transitionEnabled, setTransitionEnabled] = useState(!isMaximized)
  useEffect(() => {
    if (isMaximized) {
      const timer = setTimeout(() => setTransitionEnabled(true), 100)
      return () => clearTimeout(timer)
    } else {
      setTransitionEnabled(false)
    }
  }, [isMaximized])

  return (
    <header
      className={clsx(
        'fixed w-full h-7 flex items-center z-10',
        show ? '' : 'top-0 left-0 ',
        isMaximized ? 'bg-white shadow-sm' : '',
        className,
      )}
      style={{
        transition:
          isMaximized && transitionEnabled ? 'transform 0.8s cubic-bezier(0.22,1,0.36,1)' : '',
        transform: show ? 'translateY(0)' : 'translateY(-60px)',
        ...style,
      }}
      {...props}
    >
      {isMaximized && (
        <div className="absolute left-4 top-2 z-20 pointer-events-auto">
          <CWindowToolBtns />
        </div>
      )}

      <HeaderItemWrapper>
        <HeaderLang />
        <HeaderNetStatus />
        <HeaderControlCenter />
        <HeaderTime />
      </HeaderItemWrapper>
    </header>
  )
}
