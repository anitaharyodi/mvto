import { create } from 'zustand'

interface ModelState {
  index_selected: number
  onSelect: (index: number) => void
}

const useModelStore = create<ModelState>(set => ({
  index_selected: 0,
  onSelect: index => set(state => ({ index_selected: index })),
}))

export default useModelStore
