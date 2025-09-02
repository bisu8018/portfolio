import React from 'react'
import clsx from 'clsx'

interface GlassLayeredBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  radius?: string | number
}
/**
 * Glassmorphism 레이어드 효과를 재사용할 수 있는 컴포넌트
 * width/height/radius 등은 px, rem, %, tailwind 등 자유롭게 지정 가능
 */
export default function GlassLayeredBox({
  width,
  height,
  radius = '1.5rem',
  className = '',
  children,
  style,
  ...props
}: GlassLayeredBoxProps) {
  const sizeStyle = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  }
  return (
    <div
      className={clsx(
        'relative flex items-center justify-center',
        'backdrop-blur-[3px]',
        width ? undefined : 'w-auto',
        height ? undefined : 'h-auto',
      )}
      style={{ ...sizeStyle, ...style }}
      {...props}
    >
      <div
        className={clsx('absolute w-full h-full rounded-[inherit]')}
        style={{
          opacity: 0.01,
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          borderRadius: radius,
        }}
      />
      <div
        className={clsx('absolute left-1/2 top-1/2 bg-white/70 rounded-[inherit]')}
        style={{
          width: '96%',
          height: '92%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(20px)',
          opacity: 0.18,
          borderRadius: radius,
        }}
      />
      <div
        className={clsx('absolute left-1/2 top-1/2 bg-white/70 rounded-[inherit]')}
        style={{
          width: '92%',
          height: '86%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(15px)',
          opacity: 0.16,
          borderRadius: radius,
        }}
      />
      <div
        className={clsx('absolute left-1/2 top-1/2 bg-white/70 rounded-[inherit]')}
        style={{
          width: '88%',
          height: '80%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(10px)',
          opacity: 0.14,
          borderRadius: radius,
        }}
      />
      <div
        className="absolute w-full h-full pointer-events-none rounded-[inherit]"
        style={{
          borderRadius: radius,
          boxShadow:
            'inset 0 2px 16px 0 rgba(31,38,135,0.10), inset 0 1.5px 0 0 rgba(255,255,255,0.25)',
          background: 'transparent',
        }}
      />
      <div
        className="absolute w-full h-full pointer-events-none rounded-[inherit]"
        style={{
          borderRadius: radius,
          boxShadow: 'inset 0 -2px 24px 0 rgba(31,38,135,0.13)',
          filter: 'blur(8px)',
          background: 'transparent',
          zIndex: -1,
        }}
      />
      <div
        className={clsx(
          'relative w-full h-full flex items-center justify-center select-none rounded-[inherit] pointer-events-auto',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
