import { create } from 'zustand'
import Cookies from 'js-cookie'
import { COOKIE_KEYS } from '@/constants/cookieKeys'

interface RainControlState {
  enabled: boolean
  setEnabled: (v: boolean) => void
  syncEnabledFromCookie: () => void
}

export const useRainControlStore = create<RainControlState>((set) => ({
  enabled: (() => {
    const cookie = Cookies.get(COOKIE_KEYS.RAIN_ENABLED)
    return cookie === undefined ? false : cookie === 'true'
  })(),
  setEnabled: (v: boolean) => {
    Cookies.set(COOKIE_KEYS.RAIN_ENABLED, String(v), { expires: 365 })
    set({ enabled: v })
  },
  syncEnabledFromCookie: () => {
    const cookie = Cookies.get(COOKIE_KEYS.RAIN_ENABLED)
    set({ enabled: cookie === undefined ? false : cookie === 'true' })
  },
}))
