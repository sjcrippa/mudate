import { create } from 'zustand'
import type { Database } from '@/types/database.types'

type Item = Database['public']['Tables']['items']['Row']

interface ItemsState {
  items: Item[]
  setItems: (items: Item[]) => void
  addItem: (item: Item) => void
  removeItem: (id: string) => void
  updateItem: (id: string, completed: boolean) => void
}

export const useItemsStore = create<ItemsState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  removeItem: (id) => set((state) => ({ 
    items: state.items.filter((item) => item.id !== id) 
  })),
  updateItem: (id, completed) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, completed } : item
    ),
  })),
})) 