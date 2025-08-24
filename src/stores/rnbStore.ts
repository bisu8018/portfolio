import { create } from 'zustand'

interface RnbState {
  open: boolean
  setOpen: (v: boolean) => void
  clickIgnoreIdList: string[]
  setClickIgnoreIdList: (ids: string[]) => void
}

export const useRnbStore = create<RnbState>((set) => ({
  open: false,
  setOpen: (v: boolean) => set({ open: v }),
  clickIgnoreIdList: [],
  setClickIgnoreIdList: (ids: string[]) =>
    set((state) => ({
      clickIgnoreIdList: Array.from(new Set([...state.clickIgnoreIdList, ...ids]))
    })),
}))
