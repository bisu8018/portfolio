/**
 * Window 컴포넌트
 * 메인 컨텐츠 영역을 담당합니다.
 * @component
 * @returns {JSX.Element} 메인 영역
 */
import { Outlet } from 'react-router-dom'
import useDynamicBlur from '@/hooks/useDynamicBlur'
import useParallaxTilt from '@/hooks/useParallaxTilt'
import WindowLnb from './windowLnb/WindowLnb'
import WindowNoeulGradient from './WindowNoeulGradient'
import { useWindowStore } from '@/stores/windowStore'

import useForceMaximizeOnMobile from '@/hooks/useForceMaximizeOnMobile'
import useDetectMobile from '@/hooks/useDetectMobile'
import useMainDynamicMaxWidth from '@/hooks/useMainDynamicMaxWidth'
import MobileMenu from './MobileMenu'
import WindowRoutePath from './WindowRoutePath'

export default function Window() {
  useForceMaximizeOnMobile()
  const isMobile = useDetectMobile()
  const dynamicMaxWidth = useMainDynamicMaxWidth()
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const isMinimized = useWindowStore((s) => s.isMinimized)
  const { ref } = useParallaxTilt({
    max: 2,
    speed: 200,
    enabled: true,
  })
  const blur = useDynamicBlur(5, 14)

  if (isMinimized) return <></>

  return (
    <main ref={ref} className="absolute inset-0 flex items-center justify-center">
      <div
        id="main-layout"
        className={[
          'relative flex overflow-hidden bg-[rgba(255,255,255,0.25)]',
          '[backdrop-filter:saturate(180%)]',
          isMaximized
            ? 'w-full h-full max-size-none rounded-none'
            : 'w-full max-h-[720px] h-full rounded-2xl',
        ].join(' ')}
        style={{
          ...(!isMaximized ? { maxWidth: dynamicMaxWidth } : {}),
          backdropFilter: `blur(${blur}px) saturate(180%)`,
        }}
      >
        <WindowNoeulGradient />
        {isMobile ? <MobileMenu /> : <WindowLnb />}

        <div className="flex-1 min-w-0 p-6 md:p-8 lg:p-10">
          <WindowRoutePath />
          <Outlet />
        </div>
      </div>
    </main>
  )
}
