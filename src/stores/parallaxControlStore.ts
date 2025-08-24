import { create } from 'zustand'
import Cookies from 'js-cookie'
import { COOKIE_KEYS } from '@/constants/cookieKeys'

interface ParallaxControlState {
  enabled: boolean
  setEnabled: (v: boolean) => void
  syncEnabledFromCookie: () => void
}

export const useParallaxControlStore = create<ParallaxControlState>((set) => ({
  enabled: (() => {
    const cookie = Cookies.get(COOKIE_KEYS.PARALLAX_ENABLED)
    return cookie === undefined ? true : cookie === 'true'
  })(),
  setEnabled: (v: boolean) => {
    Cookies.set(COOKIE_KEYS.PARALLAX_ENABLED, String(v), { expires: 365 })
    set({ enabled: v })
  },
  syncEnabledFromCookie: () => {
    const cookie = Cookies.get(COOKIE_KEYS.PARALLAX_ENABLED)
    set({ enabled: cookie === undefined ? true : cookie === 'true' })
  },
}))
