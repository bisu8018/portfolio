import { create } from 'zustand'

interface LnbState {
  isClosed: boolean
  isMinimized: boolean
  isMaximized: boolean
  setClosed: (v: boolean) => void
  setMinimized: (v: boolean) => void
  setMaximized: (v: boolean | ((prev: boolean) => boolean)) => void
}

export const useLnbStore = create<LnbState>((set) => ({
  isClosed: false,
  isMinimized: false,
  isMaximized: false,
  setClosed: (v: boolean) => set({ isClosed: v }),
  setMinimized: (v: boolean) => set({ isMinimized: v }),
  setMaximized: (v: boolean | ((prev: boolean) => boolean)) =>
    set((state) => ({
      isMaximized: typeof v === 'function' ? v(state.isMaximized) : v,
    })),
}))
