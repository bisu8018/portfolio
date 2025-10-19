import React, { useEffect, useRef, useState, useCallback } from 'react'
import clsx from 'clsx'
import useDetectMobile from '../../hooks/useDetectMobile'

interface VirtualScrollbarProps {
  /** 스크롤 대상 요소 ref */
  targetRef: React.RefObject<HTMLDivElement | null>
  /** 스크롤바 너비 (기본값: 6px) */
  width?: number
  /** 스크롤바 위치 조정 - right (기본값: 8px) */
  right?: number | string
  /** 스크롤바 위치 조정 - top (기본값: 8px) */
  top?: number | string
  /** 스크롤바 위치 조정 - bottom (기본값: 8px) */
  bottom?: number | string
  /** 스크롤바 트랙 배경색 */
  trackClassName?: string
  /** 스크롤바 thumb 클래스명 */
  thumbClassName?: string
  /** 스크롤바 트랙 표시 여부 (기본값: false) */
  showTrack?: boolean
}

/**
 * VirtualScrollbar 컴포넌트
 * 실제 스크롤을 숨기고 커스텀 가상 스크롤바를 제공합니다.
 * 위치와 스타일을 자유롭게 커스터마이징할 수 있습니다.
 */
export default function VirtualScrollbar({
  targetRef,
  width = 6,
  right = 8,
  top = 8,
  bottom = 8,
  trackClassName,
  thumbClassName,
  showTrack = false,
}: VirtualScrollbarProps) {
  const isMobile = useDetectMobile()
  const [scrollHeight, setScrollHeight] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const thumbRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef(0)
  const dragStartScrollTop = useRef(0)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 스크롤 가능 여부
  const isScrollable = scrollHeight > clientHeight

  // Thumb 높이와 위치 계산
  const thumbHeight = isScrollable ? (clientHeight / scrollHeight) * clientHeight : 0
  const thumbTop = isScrollable ? (scrollTop / scrollHeight) * clientHeight : 0

  // 스크롤바 보이기 및 자동 숨김 타이머 설정
  const showScrollbar = useCallback(() => {
    setIsVisible(true)

    // 기존 타이머 클리어
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }

    // 1.5초 후 숨김 (드래그 중이거나 호버 중이 아닐 때만)
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 1500)
  }, [])

  // 스크롤 업데이트
  const updateScrollInfo = useCallback(() => {
    const target = targetRef.current
    if (!target) return

    setScrollHeight(target.scrollHeight)
    setClientHeight(target.clientHeight)
    setScrollTop(target.scrollTop)

    // 스크롤 발생 시 스크롤바 보이기
    showScrollbar()
  }, [targetRef, showScrollbar])

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    updateScrollInfo()

    const handleScroll = () => {
      updateScrollInfo()
    }

    const handleResize = () => {
      updateScrollInfo()
    }

    target.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // MutationObserver로 컨텐츠 변경 감지
    const observer = new MutationObserver(() => {
      const target = targetRef.current
      if (!target) return
      setScrollHeight(target.scrollHeight)
      setClientHeight(target.clientHeight)
      setScrollTop(target.scrollTop)
    })
    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    })

    return () => {
      target.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [targetRef, updateScrollInfo])

  // 호버 상태 변경 시 타이머 관리
  useEffect(() => {
    if (isHovered || isDragging) {
      setIsVisible(true)
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    } else if (!isDragging && !isHovered) {
      // 호버가 끝나면 1.5초 후 숨김
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 1500)
    }
  }, [isHovered, isDragging])

  // Thumb 드래그 시작
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    dragStartY.current = e.clientY
    dragStartScrollTop.current = scrollTop
  }

  // 트랙 클릭 핸들러
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!targetRef.current) return

    const track = e.currentTarget
    const rect = track.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const clickRatio = clickY / rect.height
    const newScrollTop = clickRatio * scrollHeight

    targetRef.current.scrollTop = newScrollTop
  }

  // 마우스 무브 핸들러
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!targetRef.current) return

      const deltaY = e.clientY - dragStartY.current
      const deltaScrollTop = (deltaY / clientHeight) * scrollHeight

      targetRef.current.scrollTop = dragStartScrollTop.current + deltaScrollTop
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, targetRef, clientHeight, scrollHeight])

  // 모바일이거나 스크롤 불가능하면 렌더링하지 않음
  if (isMobile || !isScrollable) return null

  return (
    <div
      className={clsx(
        'absolute z-10 cursor-pointer transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
      style={{
        right: typeof right === 'number' ? `${right}px` : right,
        top: typeof top === 'number' ? `${top}px` : top,
        bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
        width: `${width}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTrackClick}
    >
      {/* Scrollbar Track */}
      {showTrack && (
        <div
          className={clsx(
            'absolute inset-0 rounded-full transition-colors',
            trackClassName || 'bg-black/5',
          )}
        />
      )}

      {/* Scrollbar Thumb */}
      <div
        ref={thumbRef}
        className={clsx(
          'absolute rounded-full transition-all duration-200',
          isDragging ? 'opacity-100' : isHovered ? 'opacity-90' : 'opacity-70',
          thumbClassName || 'bg-white/80 shadow-sm',
        )}
        style={{
          width: `${width}px`,
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  )
}
