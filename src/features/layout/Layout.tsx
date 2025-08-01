import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div
      className="min-h-screen w-screen h-screen flex flex-col relative overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden"
        aria-hidden="true"
        style={{ zIndex: -9999 }}
      >
        <img
          src="/src/assets/lo_fi_wallpaper.jpg"
          alt="lofi background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            imageRendering: 'pixelated',
            opacity: 0.85,
            display: 'block',
            zIndex: -9999,
            position: 'absolute',
            left: 0,
            top: 0,
            background: '#000',
          }}
        />
      </div>
      <Header />
      <main className="flex-1 flex justify-center items-start p-4 relative z-10">
        <div className="w-full max-w-4xl bg-white rounded shadow p-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
