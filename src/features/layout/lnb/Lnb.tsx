/**
 * Lnb 컴포넌트
 * 좌측 내비게이션 바를 렌더링합니다.
 * @component
 * @returns {JSX.Element} 내비게이션 바
 */
import { useLnbDynamicMaxWidth } from '@/hooks/lnb/useLnbDynamicMaxWidth'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import CWindowToolBtns from '../../commons/CWindowToolBtns'
import { useWindowStore } from '@/stores/windowStore'
import LnbProfile from './LnbProfile'
import LnbMenu from './LnbMenu'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '@/constants/routePaths'
import LnbFooter from './LnbFooter'

export default function Lnb() {
  const navigate = useNavigate()
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const [maxWidth] = useLnbDynamicMaxWidth(466)

  const currentPath = window.location.pathname

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
        <LnbProfile />

        <LnbMenu.Root className="mt-4">
          <LnbMenu.Item
            icon={<span className="">🏠</span>}
            onClick={() => navigate(ROUTE_PATHS.MAIN_PAGE)}
            selected={currentPath === ROUTE_PATHS.MAIN_PAGE}
          >
            홈
          </LnbMenu.Item>
        </LnbMenu.Root>

        <LnbMenu.Root className="mt-2">
          <LnbMenu.Item
            icon={<span className="">👤</span>}
            onClick={() => navigate(ROUTE_PATHS.ABOUT)}
            selected={currentPath === ROUTE_PATHS.ABOUT}
          >
            소개
          </LnbMenu.Item>
          <LnbMenu.Item
            icon={<span className="">💼</span>}
            onClick={() => navigate(ROUTE_PATHS.CAREER)}
            selected={currentPath === ROUTE_PATHS.CAREER}
          >
            경력
          </LnbMenu.Item>
          <LnbMenu.Item
            icon={<span className="">✉️</span>}
            onClick={() => navigate(ROUTE_PATHS.CONTACT)}
            selected={currentPath === ROUTE_PATHS.CONTACT}
          >
            연락처
          </LnbMenu.Item>
        </LnbMenu.Root>

        <LnbFooter />
      </aside>
    </ResizableBox>
  )
}
