import { useRef } from 'react'

export default function BgWallpaper() {
  const imgRef = useRef<HTMLImageElement>(null)

  return (
    <div
      className="relative w-full h-full overflow-hidden z-[-9999]"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <img
        ref={imgRef}
        src="/src/assets/lo_fi_wallpaper.jpg"
        alt="lofi background"
        className="absolute w-screen h-screen object-cover object-center opacity-85 block"
        draggable={false}
      />
    </div>
  )
}
