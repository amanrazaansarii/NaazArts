"use client";

import { create } from "zustand";

export interface UserAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
  memberSince: string;
  defaultAddress?: UserAddress;
  avatarText?: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => void;
  updateAddress: (address: UserAddress) => Promise<boolean>;
}

const AUTH_STORAGE_KEY = "naaz_auth_user";

const loadStoredUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Failed to load auth user from storage", e);
    return null;
  }
};

const initialUser = loadStoredUser();

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: !!initialUser,
  user: initialUser,
  isLoading: false,

  checkSession: async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
          }
          set({ isAuthenticated: true, user: data.user });
          return;
        }
      }
    } catch (e) {
      console.error("Session check error:", e);
    }
  },

  login: async (email: string, password = "StudioPatron2026!") => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
        }
        set({ isAuthenticated: true, user: data.user, isLoading: false });
        return { success: true };
      }

      // If server returned error but it's the demo patron login, use fallback
      if (email.toLowerCase().trim() === "patron@naazarts.com") {
        const demoUser: UserProfile = {
          id: "usr-demo-patron",
          name: "Maya Lin",
          email: "patron@naazarts.com",
          memberSince: "August 2026",
          avatarText: "ML",
          defaultAddress: {
            fullName: "Maya Lin",
            street: "248 Hawthorne Blvd, Suite 2",
            city: "Portland",
            state: "OR",
            zipCode: "97214",
            country: "United States",
            phone: "+1 (503) 914-2849",
          },
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
        }
        set({ isAuthenticated: true, user: demoUser, isLoading: false });
        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: data.error || "Login failed" };
    } catch (err: any) {
      // Offline / network fallback for demo user
      if (email.toLowerCase().trim() === "patron@naazarts.com") {
        const demoUser: UserProfile = {
          id: "usr-demo-patron",
          name: "Maya Lin",
          email: "patron@naazarts.com",
          memberSince: "August 2026",
          avatarText: "ML",
          defaultAddress: {
            fullName: "Maya Lin",
            street: "248 Hawthorne Blvd, Suite 2",
            city: "Portland",
            state: "OR",
            zipCode: "97214",
            country: "United States",
            phone: "+1 (503) 914-2849",
          },
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
        }
        set({ isAuthenticated: true, user: demoUser, isLoading: false });
        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: err?.message || "Network error. Please try again." };
    }
  },

  signup: async (name: string, email: string, password = "StudioPatron2026!") => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        set({ isLoading: false });
        return { success: false, error: data.error || "Signup failed" };
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
      }
      set({ isAuthenticated: true, user: data.user, isLoading: false });
      return { success: true };
    } catch (err: any) {
      set({ isLoading: false });
      return { success: false, error: err?.message || "Network error. Please try again." };
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout API call error:", e);
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    set({ isAuthenticated: false, user: null });
  },

  updateProfile: (updated: Partial<UserProfile>) => {
    set((state) => {
      if (!state.user) return state;
      const newUser = { ...state.user, ...updated };
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      }
      return { user: newUser };
    });
  },

  updateAddress: async (address: UserAddress) => {
    try {
      const res = await fetch("/api/user/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });

      if (res.ok) {
        const data = await res.json();
        set((state) => {
          if (!state.user) return state;
          const newUser = { ...state.user, defaultAddress: data.address || address };
          if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
          }
          return { user: newUser };
        });
        return true;
      }
    } catch (e) {
      console.error("Failed to update address via API:", e);
    }

    // Local fallback
    set((state) => {
      if (!state.user) return state;
      const newUser = { ...state.user, defaultAddress: address };
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      }
      return { user: newUser };
    });
    return true;
  },
}));
