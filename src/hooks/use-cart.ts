import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  image: string;
  price: number;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () =>
        set({
          items: [],
        }),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) return { ...item, quantity: item.quantity++ };
            return item;
          }),
        })),
      decreaseQuantity: (id) =>
        set((state) => {
          const item = state.items.find((item) => item.id === id);
          if (item?.quantity == 1)
            return {
              items: state.items.filter((item) => item.id !== id),
            };
          return {
            items: state.items.map((item) => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity-- };
              }
              return item;
            }),
          };
        }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
