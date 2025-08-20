/**
 * Main 컴포넌트
 * 메인 컨텐츠 영역을 담당합니다.
 * @component
 * @returns {JSX.Element} 메인 영역
 */
import { Outlet } from 'react-router-dom'
import useDynamicBlur from '@/hooks/useDynamicBlur'
import useParallaxTilt from '@/hooks/useParallaxTilt'
import Lnb from '../lnb/Lnb'
import NoeulGradient from './NoeulGradient'
import { useWindowStore } from '@/stores/windowStore'

import useForceMaximizeOnMobile from '@/hooks/useForceMaximizeOnMobile'
import useDetectMobile from '@/hooks/useDetectMobile'
import useMainDynamicMaxWidth from '@/hooks/main/useMainDynamicMaxWidth'
import Menu from './Menu'

export default function Main() {
  useForceMaximizeOnMobile()
  const isMobile = useDetectMobile()
  const dynamicMaxWidth = useMainDynamicMaxWidth()
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const { ref } = useParallaxTilt({
    max: 2,
    speed: 200,
    enabled: !isMaximized,
  })
  const blur = useDynamicBlur(5, 14)

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
        <NoeulGradient />
        {isMobile ? <Menu /> : <Lnb />}

        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
