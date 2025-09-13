import React from 'react'
import clsx from 'clsx'

export type CContentsBoxProps = React.HTMLAttributes<HTMLDivElement>

export default function CContentsBox({ children, className, style, ...props }: CContentsBoxProps) {
  const classes = clsx(
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
    'rounded-2xl',
    className,
  )

  return (
    <div className={classes} style={style} {...props}>
      {children}
    </div>
  )
}
