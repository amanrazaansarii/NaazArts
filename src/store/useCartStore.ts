"use client";

import { create } from "zustand";
import { Product } from "@/data/products";

export interface CartItem {
  id: string; // unique item id (e.g. prodId-color)
  product: Product;
  quantity: number;
  selectedColor?: string;
}

interface CartStore {
  items: CartItem[];
  promoCode: string | null;
  discountPercent: number;
  promoMessage: string | null;
  
  // Actions
  addItem: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => Promise<{ success: boolean; message: string }>;
  removePromoCode: () => void;
  
  // Computed getters (helpers)
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getGrandTotal: () => number;
}

const STORAGE_KEY = "naaz_cart_items";

// Helper to safely load initial state from localStorage
const loadInitialItems = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load cart from storage", e);
    return [];
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadInitialItems(),
  promoCode: null,
  discountPercent: 0,
  promoMessage: null,

  addItem: (product: Product, quantity = 1, selectedColor) => {
    if (quantity <= 0) return;
    const itemId = selectedColor ? `${product.id}-${selectedColor}` : product.id;
    
    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.id === itemId);
      let newItems: CartItem[];
      
      if (existingIndex > -1) {
        newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems = [
          ...state.items,
          {
            id: itemId,
            product,
            quantity,
            selectedColor,
          },
        ];
      }
      
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      }
      return { items: newItems };
    });
  },

  removeItem: (itemId: string) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== itemId);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      }
      return { items: newItems };
    });
  },

  updateQuantity: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      }
      return { items: newItems };
    });
  },

  clearCart: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    set({ items: [], promoCode: null, discountPercent: 0, promoMessage: null });
  },

  applyPromoCode: async (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const totalItems = get().getTotalItems();
    const subtotal = get().getSubtotal();

    try {
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: cleanCode,
          itemsCount: totalItems,
          subtotal,
        }),
      });

      const data = await res.json();
      if (res.ok && data.valid) {
        set({
          promoCode: cleanCode,
          discountPercent: data.discountPercent || 10,
          promoMessage: data.message,
        });
        return { success: true, message: data.message };
      } else {
        return {
          success: false,
          message: data.message || "Invalid or ineligible promo code.",
        };
      }
    } catch {
      // Fallback local rules if offline
      if (cleanCode === "DECOR10") {
        if (totalItems >= 3) {
          set({
            promoCode: cleanCode,
            discountPercent: 10,
            promoMessage: "10% Studio volume discount applied (3+ items)!",
          });
          return { success: true, message: "10% Studio discount applied!" };
        } else {
          return {
            success: false,
            message: "DECOR10 requires 3 or more pieces in your bag.",
          };
        }
      } else if (cleanCode === "FIRST10") {
        return {
          success: false,
          message: "FIRST10 requires a registered Studio Patron account on your first order.",
        };
      } else {
        return { success: false, message: "Invalid or expired coupon code." };
      }
    }
  },

  removePromoCode: () => {
    set({ promoCode: null, discountPercent: 0, promoMessage: null });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce(
      (total, item) => total + (item.product.priceValue || 0) * item.quantity,
      0
    );
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const { discountPercent } = get();
    return discountPercent > 0 ? (subtotal * discountPercent) / 100 : 0;
  },

  getShippingCost: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    // Free shipping threshold over $60
    return subtotal >= 60 ? 0 : 6;
  },

  getGrandTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingCost();
    return Math.max(0, subtotal - discount + shipping);
  },
}));
