/**
 * LnbMenu 컴포넌트
 * 내비게이션 바의 메뉴 영역을 렌더링합니다.
 * @component
 * @returns {JSX.Element} 메뉴 영역
 */
import { createContext, useContext } from 'react'
import clsx from 'clsx'

type LnbMenuProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const LnbMenuContext = createContext(false)

function Root({ children, className, ...props }: LnbMenuProps) {
  const items = Array.isArray(children) ? children : [children]
  return (
    <LnbMenuContext.Provider value={true}>
      <div className={clsx('rounded-lg w-full', className)} {...props}>
        {items.map((child, idx) => {
          const isLast = idx === items.length - 1
          if (child && typeof child === 'object') {
            return {
              ...child,
              props: {
                ...child.props,
                isLast,
                idx,
                itemCount: items.length,
              },
            }
          }
          return child
        })}
      </div>
    </LnbMenuContext.Provider>
  )
}

function Item({
  icon,
  children,
  isLast = false,
  idx = 0,
  itemCount = 1,
  onClick,
  selected = false,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  isLast?: boolean
  idx?: number
  itemCount?: number
  onClick?: () => void
  selected?: boolean
}) {
  const inRoot = useContext(LnbMenuContext)
  if (!inRoot) {
    throw new Error('LnbMenu.Item must be used within LnbMenu.Root.')
  }

  const radiusClass =
    itemCount === 1 ? 'rounded-lg' : idx === 0 ? 'rounded-t-lg' : isLast ? 'rounded-b-lg' : ''

  return (
    <div
      className={clsx(
        'flex items-center px-4 relative cursor-pointer',
        radiusClass,
        selected ? 'bg-white' : 'bg-white/50 hover:bg-white/70',
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          'py-2',
          !isLast &&
            (selected ? 'border-b border-gray-500/50 w-full' : 'border-b border-gray-300 w-full'),
        )}
      >
        <span className="mr-4 text-md">{icon}</span>
        <span className="flex-1 text-sm font-medium">{children}</span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-light pointer-events-none">
          &#8250;
        </span>
      </div>
    </div>
  )
}

const LnbMenu = {
  Root,
  Item,
}

export default LnbMenu
