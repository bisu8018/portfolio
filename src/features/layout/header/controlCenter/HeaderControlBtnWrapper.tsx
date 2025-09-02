import clsx from 'clsx'

/**
 * 공통 버튼 스타일을 적용하는 래퍼 컴포넌트의 props
 * @property child 버튼 내부에 렌더링할 React 노드
 * @property enabled 버튼 활성화 여부(스타일 분기)
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 */
interface HeaderControlBtnWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  enabled: boolean
}

/**
 * 공통 버튼 스타일을 적용하는 래퍼 컴포넌트
 * @param {HeaderControlBtnWrapperProps} props - 버튼 스타일 및 렌더링할 자식 노드, 활성화 여부 등
 */
export default function HeaderControlBtnWrapper({
  children,
  enabled,
  className,
  title,
  ...props
}: HeaderControlBtnWrapperProps) {
  const bg = enabled ? 'bg-white/80 hover:bg-white/90' : 'bg-black/60 hover:bg-black/70'

  return (
    <button
      type="button"
      className={clsx(
        'w-12 h-12 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer shadow transition',
        bg,
        enabled ? '' : 'opacity-90',
        className,
      )}
      aria-pressed={enabled}
      title={title}
      {...props}
    >
      <span className="w-7 h-7 flex items-center justify-center">{children}</span>
    </button>
  )
}
