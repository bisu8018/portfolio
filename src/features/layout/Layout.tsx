import Header from './Header'
import Footer from './Footer'
import Main from './main/Main'
import BgWallpaper from './BgWallpaper'

export default function Layout() {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <BgWallpaper />

      <Header />

      <Main />

      <Footer />
    </div>
  )
}
