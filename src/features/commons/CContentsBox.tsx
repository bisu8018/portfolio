import React from 'react'
import clsx from 'clsx'
import ContentGlassBox from './ContentGlassBox'

export type CContentsBoxProps = React.HTMLAttributes<HTMLDivElement>

/**
 * CContentsBox 컴포넌트
 * iOS 26 스타일의 깨끗한 유리 효과 콘텐츠 박스를 제공합니다.
 * @component
 * @param {CContentsBoxProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 콘텐츠 박스
 */
export default function CContentsBox({ children, className, style, ...props }: CContentsBoxProps) {
  return (
    <ContentGlassBox
      className={clsx('md:max-h-[calc(100%-60px)]', className)}
      style={style}
      {...props}
    >
      {children}
    </ContentGlassBox>
  )
}
