import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <main className="flex-1 flex justify-center items-center relative z-10">
      <Outlet />
    </main>
  )
}
