/**
 * WindowLnb 컴포넌트
 * 좌측 내비게이션 바를 렌더링합니다.
 * @component
 * @returns {JSX.Element} 내비게이션 바
 */
import { useLnbDynamicMaxWidth } from '@/hooks/lnb/useLnbDynamicMaxWidth'
import type { ReactNode } from 'react'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import { useWindowStore } from '@/stores/windowStore'
import WindowLnbProfile from './WindowLnbProfile'
import WindowLnbMenu from './WindowLnbMenu'

import { useNavigate, useLocation } from 'react-router-dom'
import WindowLnbFooter from './WindowLnbFooter'
import { useTranslation } from 'react-i18next'
import CWindowToolBtns from '@/features/commons/CWindowToolBtns'
import { getNavigationForPath } from '@/constants/navigation'

export default function WindowLnb() {
  const navigate = useNavigate()
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const [maxWidth] = useLnbDynamicMaxWidth(466)
  const { t } = useTranslation()

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <ResizableBox
      width={320}
      height={'100%'}
      axis="x"
      minConstraints={[250, 0]}
      maxConstraints={[maxWidth, 0]}
      handle={
        <span className="absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-transparent group z-10 flex items-center justify-center">
          <span className="w-[3px] h-20 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
        </span>
      }
      className="relative h-full"
      resizeHandles={['e']}
      handleSize={[16, 9999]}
    >
      <aside className="h-full min-h-[100%] pt-15 pb-6 px-5 flex flex-col items-center bg-[rgba(255,255,255,0.18)] [backdrop-filter:blur(16px)_saturate(180%)] relative border-r border-gray-200">
        {!isMaximized && <CWindowToolBtns className="left-6 top-6" />}
        <WindowLnbProfile />

        {getNavigationForPath(currentPath).map((section, si) => (
          <WindowLnbMenu.Root key={si} className={si === 0 ? 'mt-4' : 'mt-2'}>
            {section.items.map((it) => {
              let labelText: ReactNode = ''

              if (typeof it.label === 'object' && it.label !== null && 'id' in it.label) {
                const { id, default: def } = it.label as { id: string; default: string }
                labelText = t(id, def)
              } else if (typeof it.label === 'string') {
                labelText = it.label
              }

              return (
                <WindowLnbMenu.Item
                  key={it.key}
                  icon={<span>{it.icon}</span>}
                  onClick={() => navigate(it.path)}
                  selected={currentPath === it.path}
                >
                  {labelText}
                </WindowLnbMenu.Item>
              )
            })}
          </WindowLnbMenu.Root>
        ))}

        <WindowLnbFooter />
      </aside>
    </ResizableBox>
  )
}
