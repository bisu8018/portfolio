import { create } from 'zustand'

interface MobileState {
  isMobile: boolean
  setIsMobile: (v: boolean) => void
}

export const useMobileStore = create<MobileState>((set) => ({
  isMobile: false,
  setIsMobile: (v) => set({ isMobile: v }),
}))
