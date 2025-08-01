import Header from './Header'
import Footer from './Footer'
import MainLayout from './MainLayout'

export default function Layout() {
  return (
    <div className="min-h-screen w-screen h-screen flex flex-col relative overflow-hidden z-[1]">
      <div
        className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-[-9999]"
        aria-hidden="true"
      >
        <img
          src="/src/assets/lo_fi_wallpaper.jpg"
          alt="lofi background"
          className="w-full h-full object-cover [image-rendering:pixelated] opacity-85 block z-[-9999] absolute left-0 top-0 bg-black"
        />
      </div>

      <Header />

      <MainLayout />

      <Footer />
    </div>
  )
}
