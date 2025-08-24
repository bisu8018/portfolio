import { create } from 'zustand'
import Cookies from 'js-cookie'
import { COOKIE_KEYS } from '@/constants/cookieKeys'

interface WindowState {
  isClosed: boolean
  isMinimized: boolean
  isMaximized: boolean
  setClosed: (v: boolean) => void
  setMinimized: (v: boolean) => void
  setMaximized: (v: boolean | ((prev: boolean) => boolean)) => void
  setMaximizedState: (v: boolean | ((prev: boolean) => boolean)) => void
  syncMaximizedFromCookie: () => void
}

export const useWindowStore = create<WindowState>((set) => ({
  isClosed: false,
  isMinimized: false,
  isMaximized: (() => {
    const cookie = Cookies.get(COOKIE_KEYS.LNB_MAXIMIZED)
    return cookie === undefined ? false : cookie === 'true'
  })(),
  setClosed: (v: boolean) => set({ isClosed: v }),
  setMinimized: (v: boolean) => set({ isMinimized: v }),
  setMaximized: (v: boolean | ((prev: boolean) => boolean)) =>
    set((state) => {
      const next = typeof v === 'function' ? v(state.isMaximized) : v
      Cookies.set(COOKIE_KEYS.LNB_MAXIMIZED, String(next), { expires: 365 })
      return { isMaximized: next }
    }),
  setMaximizedState: (v: boolean | ((prev: boolean) => boolean)) =>
    set((state) => {
      const next = typeof v === 'function' ? v(state.isMaximized) : v
      return { isMaximized: next }
    }),
  syncMaximizedFromCookie: () => {
    const cookie = Cookies.get(COOKIE_KEYS.LNB_MAXIMIZED)
    set({ isMaximized: cookie === undefined ? false : cookie === 'true' })
  },
}))
