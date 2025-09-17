import React from 'react'
import clsx from 'clsx'

export type CContentsBoxProps = React.HTMLAttributes<HTMLDivElement>

/**
 * CContentsBox 컴포넌트
 * 흰색 배경의 콘텐츠 박스 스타일을 제공합니다.
 * @component
 * @param {CContentsBoxProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 콘텐츠 박스
 */
export default function CContentsBox({ children, className, style, ...props }: CContentsBoxProps) {
  const mergedStyle: React.CSSProperties = {
    background:
      'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%)',
    ...style,
  }

  return (
    <div
      className={clsx(
        'bg-gradient-to-tr from-white to-transparent',
        'flex',
        'flex-col',
        'overflow-hidden',
        'p-6',
        'relative',
        'transition-all',
        'duration-300',
        'ease-[cubic-bezier(0,0,.5,1)]',
        'whitespace-normal',
        'rounded-lg',
        className,
      )}
      style={mergedStyle}
      {...props}
    >
      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}
