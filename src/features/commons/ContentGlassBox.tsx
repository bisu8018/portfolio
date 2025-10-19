import React, { useRef } from 'react'
import clsx from 'clsx'
import VirtualScrollbar from './VirtualScrollbar'

interface ContentGlassBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  /** 가상 스크롤바 사용 여부 (기본값: true) */
  enableVirtualScrollbar?: boolean
  /** 스크롤바 위치 조정 - right */
  scrollbarRight?: number | string
  /** 스크롤바 위치 조정 - top */
  scrollbarTop?: number | string
  /** 스크롤바 위치 조정 - bottom */
  scrollbarBottom?: number | string
  /** 스크롤바 너비 */
  scrollbarWidth?: number
  /** 스크롤바 트랙 표시 여부 */
  showScrollbarTrack?: boolean
  /** 스크롤바 thumb 클래스명 */
  scrollbarThumbClassName?: string
  /** 스크롤바 트랙 클래스명 */
  scrollbarTrackClassName?: string
}

/**
 * ContentGlassBox 컴포넌트
 * iOS 26 스타일의 깨끗한 frosted glass 효과를 제공하는 메인 컨텐츠 컨테이너
 * 기본적으로 좌측 정렬되며, 미니멀한 디자인을 가집니다.
 */
export default function ContentGlassBox({
  width,
  height,
  className = '',
  children,
  style,
  enableVirtualScrollbar = true,
  scrollbarRight = -10,
  scrollbarTop = 4,
  scrollbarBottom = 4,
  scrollbarWidth = 5,
  showScrollbarTrack = false,
  scrollbarThumbClassName,
  scrollbarTrackClassName,
  ...props
}: ContentGlassBoxProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const sizeStyle = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  }

  return (
    <div
      className={clsx(
        'relative',
        'rounded-3xl',
        'flex flex-col items-start',
        'bg-white/80',
        'backdrop-blur-xl',
        'border border-white/40',
        'shadow-[0_8px_32px_0_rgba(31,38,135,0.08)]',
        'transition-all duration-300 ease-[cubic-bezier(0,0,.5,1)]',
        width ? undefined : 'w-auto',
        height ? undefined : 'h-auto',
        className,
      )}
      style={{
        ...sizeStyle,
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        ...style,
      }}
      {...props}
    >
      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
          opacity: 0.6,
        }}
      />

      {/* Content with hidden scrollbar */}
      <div
        ref={contentRef}
        className="relative w-full h-full text-left overflow-y-auto overflow-x-hidden px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 xl:px-10 xl:py-8"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {/* Webkit 브라우저용 스크롤바 숨김 */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {children}
      </div>

      {/* Virtual Scrollbar */}
      {enableVirtualScrollbar && (
        <VirtualScrollbar
          targetRef={contentRef}
          right={scrollbarRight}
          top={scrollbarTop}
          bottom={scrollbarBottom}
          width={scrollbarWidth}
          showTrack={showScrollbarTrack}
          thumbClassName={scrollbarThumbClassName}
          trackClassName={scrollbarTrackClassName}
        />
      )}
    </div>
  )
}
