import { create } from 'zustand'

interface ParallaxControlState {
  enabled: boolean
  setEnabled: (v: boolean) => void
}

export const useParallaxControlStore = create<ParallaxControlState>((set) => ({
  enabled: true,
  setEnabled: (v: boolean) => set({ enabled: v }),
}))
