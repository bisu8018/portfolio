import { useEffect, useState } from 'react'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import LnbButtons from './LnbButtons'

export default function Lnb() {
  const [maxWidth, setMaxWidth] = useState(466) // 1400/3 = 466

  useEffect(() => {
    const updateMaxWidth = () => {
      const main = document.getElementById('main-layout')
      if (main) {
        setMaxWidth(Math.floor(main.offsetWidth / 3))
      }
    }
    updateMaxWidth()
    window.addEventListener('resize', updateMaxWidth)
    return () => window.removeEventListener('resize', updateMaxWidth)
  }, [])

  return (
    <ResizableBox
      width={320}
      height={'100%'}
      axis="x"
      minConstraints={[220, 0]}
      maxConstraints={[maxWidth, 0]}
      handle={
        <span className="absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-transparent group z-10 flex items-center justify-center">
          <span className="w-1 h-16 bg-gray-300 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
        </span>
      }
      className="relative h-full"
      resizeHandles={['e']}
      handleSize={[16, 9999]}
    >
      <aside className="h-full min-h-[100%] pt-15 pb-6 px-5 flex flex-col items-center bg-[rgba(255,255,255,0.18)] [backdrop-filter:blur(16px)_saturate(180%)] relative border-r border-gray-200">
        <LnbButtons />
        <div className="w-24 h-24 rounded-full bg-pink-200 mb-4 flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
          <span role="img" aria-label="profile">
            😊
          </span>
        </div>
        <div className="text-lg font-bold mb-2">싸이좋은 사람들</div>
        <div className="text-xs text-gray-500 mb-6">
          TODAY IS... <span className="font-semibold text-blue-700">즐거움</span>
        </div>
        <div className="text-sm text-gray-700 mb-2">사이좋은 사람을 싸이월드~^_^</div>
        <div className="mt-auto text-xs text-gray-400">★나의 1촌</div>
      </aside>
    </ResizableBox>
  )
}
