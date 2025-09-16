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
export default function CContentsBox({ children, className, ...props }: CContentsBoxProps) {
  return (
    <div
      className={clsx(
        'bg-white',
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
      {...props}
    >
      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}
