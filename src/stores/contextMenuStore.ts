import { create } from 'zustand'

interface ContextMenuState {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible }),
}))
