"use client";

import { create } from "zustand";
import { CartItem } from "./useCartStore";
import { UserAddress } from "./useAuthStore";

export type OrderStatus =
  | "confirmed"
  | "casting"
  | "packing"
  | "dispatched"
  | "delivered"
  | "cancelled";

export interface OrderMilestone {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string; // "#NAS-XXXXXX"
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode?: string;
  shippingAddress: UserAddress;
  estimatedDelivery: string;
  carrier: string;
  trackingMilestones: OrderMilestone[];
}

interface OrderStore {
  orders: Order[];
  isLoading: boolean;
  
  // Actions
  fetchUserOrders: () => Promise<void>;
  createOrder: (data: {
    email: string;
    items: CartItem[];
    shippingAddress: UserAddress;
    shippingMethod?: "standard" | "express";
    paymentType?: "card" | "upi" | "cod";
    promoCode?: string | null;
  }) => Promise<Order>;
  cancelOrder: (orderId: string) => Promise<{ success: boolean; error?: string }>;
  getOrderById: (trackingId: string) => Order | undefined;
  fetchOrderById: (trackingId: string) => Promise<Order | null>;
}

const ORDERS_STORAGE_KEY = "naaz_orders_history";

export function generateTrackingId(): string {
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  return `#NAS-${randomSixDigits}`;
}

const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: "#NAS-749102",
    createdAt: "August 14, 2026",
    status: "casting",
    items: [
      {
        id: "prod-1",
        product: {
          id: "prod-1",
          slug: "marble-tray-sage",
          name: "Marble tray — sage",
          category: "Premium trays",
          price: "$28",
          priceValue: 28,
          swatch: "var(--tone-1)",
          badge: "new",
          image: "https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780",
          description: "An organically contoured concrete accent tray, hand-marbled with soft mineral sage tones.",
          details: ["Hand-cast", "Sealed with beeswax"],
          dimensions: '8.25" x 4.5"',
          weight: "420g",
          inStock: true,
          leadTime: "2-3 days",
        },
        quantity: 1,
        selectedColor: "Sage Mist",
      },
      {
        id: "prod-12",
        product: {
          id: "prod-12",
          slug: "earth-tone-coaster-set",
          name: "Earth-tone coaster set",
          category: "Coasters",
          price: "$16",
          priceValue: 16,
          swatch: "var(--tone-5)",
          image: "https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780",
          description: "Set of 4 stackable ribbed coasters in gradient earth tones.",
          details: ["Set of 4", "Cork bottom"],
          dimensions: '4.0" Diameter',
          weight: "520g",
          inStock: true,
          leadTime: "Ready to ship",
        },
        quantity: 1,
      },
    ],
    subtotal: 44,
    discount: 4.4,
    shipping: 6,
    total: 45.6,
    shippingAddress: {
      fullName: "Maya Lin",
      street: "248 Hawthorne Blvd, Suite 2",
      city: "Portland",
      state: "OR",
      zipCode: "97214",
      country: "United States",
      phone: "+1 (503) 914-2849",
    },
    estimatedDelivery: "August 20 - 22, 2026",
    carrier: "Artisan Courier Direct",
    trackingMilestones: [
      {
        title: "Order Confirmed & Logged",
        description: "Studio order registered in batch #84",
        timestamp: "Aug 14, 09:30 AM",
        completed: true,
      },
      {
        title: "Hand-Casting & Curing",
        description: "Mineral pigment mixed and cast in silicone mold (48h cure cycle)",
        timestamp: "Aug 15, 11:00 AM",
        completed: true,
      },
      {
        title: "Fine Sanding & Studio Packing",
        description: "Edge-smoothing, 3-coat organic wax penetration, and packaging",
        timestamp: "In Progress (Estimated Aug 17)",
        completed: false,
      },
      {
        title: "Dispatched from Studio",
        description: "Wrapped in plastic-free recycled paper packaging",
        timestamp: "Estimated Aug 18",
        completed: false,
      },
      {
        title: "Delivered to Doorstep",
        description: "Safe arrival at destination",
        timestamp: "Estimated Aug 21",
        completed: false,
      },
    ],
  },
  {
    id: "#NAS-382910",
    createdAt: "August 10, 2026",
    status: "delivered",
    items: [
      {
        id: "prod-9",
        product: {
          id: "prod-9",
          slug: "pastel-vase",
          name: "Pastel vase",
          category: "Vases",
          price: "$34",
          priceValue: 34,
          swatch: "var(--tone-2)",
          image: "https://ik.imagekit.io/naazartstudio/IMG_8148.png?updatedAt=1786806300638",
          description: "Sculptural fluted concrete bud vase.",
          details: ["Removable glass reservoir"],
          dimensions: '3.2" x 6.8"',
          weight: "680g",
          inStock: true,
          leadTime: "Ready to ship",
        },
        quantity: 1,
      },
    ],
    subtotal: 34,
    discount: 0,
    shipping: 6,
    total: 40,
    shippingAddress: {
      fullName: "Maya Lin",
      street: "248 Hawthorne Blvd, Suite 2",
      city: "Portland",
      state: "OR",
      zipCode: "97214",
      country: "United States",
      phone: "+1 (503) 914-2849",
    },
    estimatedDelivery: "August 14, 2026",
    carrier: "Artisan Courier Direct",
    trackingMilestones: [
      {
        title: "Order Confirmed & Logged",
        description: "Studio order registered in batch #81",
        timestamp: "Aug 10, 02:15 PM",
        completed: true,
      },
      {
        title: "Hand-Casting & Curing",
        description: "Cast & slow cured",
        timestamp: "Aug 11, 10:00 AM",
        completed: true,
      },
      {
        title: "Fine Sanding & Studio Packing",
        description: "Sealed for water protection and carefully packed",
        timestamp: "Aug 12, 04:00 PM",
        completed: true,
      },
      {
        title: "Dispatched from Studio",
        description: "In transit with tracking #ACD-94821",
        timestamp: "Aug 13, 08:30 AM",
        completed: true,
      },
      {
        title: "Delivered to Doorstep",
        description: "Left at front porch, signed by recipient",
        timestamp: "Aug 14, 01:20 PM",
        completed: true,
      },
    ],
  },
];

const loadStoredOrders = (): Order[] => {
  if (typeof window === "undefined") return INITIAL_SAMPLE_ORDERS;
  try {
    const data = localStorage.getItem(ORDERS_STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_SAMPLE_ORDERS;
  } catch (e) {
    console.error("Failed to load orders from storage", e);
    return INITIAL_SAMPLE_ORDERS;
  }
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: loadStoredOrders(),
  isLoading: false,

  fetchUserOrders: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          if (typeof window !== "undefined") {
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(data.orders));
          }
          set({ orders: data.orders, isLoading: false });
          return;
        }
      }
    } catch (e) {
      console.error("Failed to fetch user orders:", e);
    }
    set({ isLoading: false });
  },

  createOrder: async ({ email, items, shippingAddress, shippingMethod = "standard", paymentType = "card", promoCode }) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items,
          shippingAddress,
          shippingMethod,
          paymentType,
          promoCode: promoCode || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const createdOrder: Order = data.order;
        set((state) => {
          const updated = [createdOrder, ...state.orders.filter((o) => o.id !== createdOrder.id)];
          if (typeof window !== "undefined") {
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
          }
          return { orders: updated, isLoading: false };
        });
        return createdOrder;
      }
    } catch (err) {
      console.error("API createOrder failed, using fallback:", err);
    }

    // Fallback local synthesis if offline
    const newId = generateTrackingId();
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const subtotal = items.reduce((acc, it) => acc + (it.product.priceValue || 0) * it.quantity, 0);
    const discount = promoCode === "DECOR10" && items.length >= 3 ? (subtotal * 10) / 100 : 0;
    const shipping = subtotal >= 60 ? 0 : 6;
    const total = subtotal - discount + shipping;

    const fallbackOrder: Order = {
      id: newId,
      createdAt: formattedDate,
      status: "confirmed",
      items,
      subtotal,
      discount,
      shipping,
      total,
      shippingAddress,
      estimatedDelivery: "In 5-7 business days",
      carrier: "Artisan Courier Direct",
      trackingMilestones: [
        {
          title: "Order Confirmed & Logged",
          description: "Studio order registered and queued for hand-casting",
          timestamp: "Just now",
          completed: true,
        },
        {
          title: "Hand-Casting & Curing",
          description: "Mixing mineral pigments and 48-hour slow cure in silicone molds",
          timestamp: "Scheduled for next studio cycle",
          completed: false,
        },
        {
          title: "Fine Sanding & Studio Packing",
          description: "Hand-sanding raw edges and penetrating organic beeswax coat",
          timestamp: "Scheduled",
          completed: false,
        },
        {
          title: "Dispatched from Studio",
          description: "Carefully wrapped in plastic-free corrugated protection",
          timestamp: "Pending completion",
          completed: false,
        },
        {
          title: "Delivered to Doorstep",
          description: "Arrival at customer address",
          timestamp: "Estimated in 5-7 days",
          completed: false,
        },
      ],
    };

    set((state) => {
      const updated = [fallbackOrder, ...state.orders];
      if (typeof window !== "undefined") {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      }
      return { orders: updated, isLoading: false };
    });

    return fallbackOrder;
  },

  cancelOrder: async (orderId: string) => {
    try {
      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        set((state) => {
          const updated = state.orders.map((o) =>
            o.id === orderId ? { ...o, status: "cancelled" as OrderStatus } : o
          );
          if (typeof window !== "undefined") {
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
          }
          return { orders: updated };
        });
        return { success: true };
      } else {
        return { success: false, error: data.error || "Failed to cancel order" };
      }
    } catch (e: any) {
      return { success: false, error: e?.message || "Network error" };
    }
  },

  getOrderById: (trackingId: string) => {
    const cleanId = trackingId.trim().toUpperCase();
    return get().orders.find((o) => o.id.toUpperCase() === cleanId);
  },

  fetchOrderById: async (trackingId: string) => {
    const cleanId = trackingId.trim().toUpperCase();
    try {
      const res = await fetch(`/api/orders/track/${encodeURIComponent(cleanId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          return data.order as Order;
        }
      }
    } catch (e) {
      console.error("fetchOrderById error:", e);
    }
    return get().getOrderById(cleanId) || null;
  },
}));
