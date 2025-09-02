/**
 * Wallpaper 컴포넌트
 * 배경 이미지를 렌더링합니다.
 * @component
 * @returns {JSX.Element} 배경 이미지
 */
import { useRef } from 'react'
import { RainEffect } from './RainEffect'

export default function Wallpaper() {
  const imgRef = useRef<HTMLImageElement>(null)

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-[-9999]"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <img
        ref={imgRef}
        src="/src/assets/lo_fi_wallpaper.jpg"
        alt="lofi background"
        className="w-full h-full object-cover object-center opacity-85 block"
        draggable={false}
      />
      <RainEffect dropCount={40} />
    </div>
  )
}
