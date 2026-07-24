"use client";

export type CartItem = {
id: string;
name: string;
slug: string;
price: number;
discount?: number| null;
imageUrl: string;
stock: number;
quantity: number;
};

type CartStore = {
   items: CartItem[];
   addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
   removeItem: (id: string) => void;
   increaseQty: (id: string) => void;
   decreaseQty: (id: string) => void;
   clearCart: () => void;
   totalIems: () => number;
   totalPrice: () => number;
};

export const useCartStore = create<CartSore>()(
   persist(
      (set,get)=> ({
         items: [],
         addItem: (item, qty=1)=>{
            const existing = get().items.find((i) => i.id === item.id);
            if(existing) {
               set({
                  items: get().items.map((i) => 
                  i.id === item.id
                  ? {...i, quantity: Math.min(i.quantity + qty, i.stock)}
                  : i
                  ),
               });
            } else {
               set({ items: [...get().items, {...item, quantity: qty }]});
            }
         },
      })
   )
)