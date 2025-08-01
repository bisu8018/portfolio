import { Outlet } from 'react-router-dom'
import useParallaxTilt from '@/hooks/useParallaxTilt'
import Lnb from '../lnb/Lnb'
import NoeulGradient from './NoeulGradient'
import { useLnbStore } from '@/stores/lnbStore'

import useForceMaximizeOnMobile from '@/hooks/useForceMaximizeOnMobile'
import useDetectMobile from '@/hooks/useDetectMobile'
import useDynamicMaxWidth from '@/hooks/useDynamicMaxWidth'

export default function MainLayout() {
  useForceMaximizeOnMobile()
  useDetectMobile()
  const dynamicMaxWidth = useDynamicMaxWidth()

  const isMaximized = useLnbStore((s) => s.isMaximized)
  const { ref } = useParallaxTilt({
    max: 2,
    speed: 100,
    enabled: !isMaximized,
  })

  return (
    <main ref={ref} className="absolute inset-0 flex items-center justify-center">
      <div
        id="main-layout"
        className={[
          'relative flex overflow-hidden bg-[rgba(255,255,255,0.25)] [backdrop-filter:blur(16px)_saturate(180%)] [box-shadow:0_8px_32px_0_rgba(31,38,135,0.18)]',
          isMaximized
            ? 'w-full h-full max-size-none rounded-none shadow-none'
            : 'w-full max-h-[720px] h-full rounded-2xl shadow-2xl',
        ].join(' ')}
        style={!isMaximized ? { maxWidth: dynamicMaxWidth } : undefined}
      >
        <NoeulGradient />
        <Lnb />
        <Outlet />
      </div>
    </main>
  )
}
