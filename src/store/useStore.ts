import { create } from 'zustand';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: string;
  isB2BBulk: boolean;
  unitPrice: number;
  customNotes?: string;
}

export interface B2BInquiryData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  productType: string;
  estimatedQuantity: string;
  customizationDetails: string;
  targetTimeline: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, selectedFinish?: string, isB2BBulk?: boolean, customNotes?: string) => void;
  removeFromCart: (productId: string, selectedFinish: string) => void;
  updateQuantity: (productId: string, selectedFinish: string, quantity: number) => void;
  clearCart: () => void;
  
  // Quick View Product Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Search Modal
  isSearchOpen: boolean;
  toggleSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Active Category Filter
  activeCategory: string;
  setActiveCategory: (cat: string) => void;

  // B2B Quote Inquiry Modal
  isInquiryOpen: boolean;
  openInquiry: (defaultProduct?: string) => void;
  closeInquiry: () => void;
  inquiryForm: B2BInquiryData;
  setInquiryForm: (data: Partial<B2BInquiryData>) => void;
  resetInquiryForm: () => void;
}

const initialInquiryState: B2BInquiryData = {
  name: '',
  companyName: '',
  email: '',
  phone: '',
  productType: 'Candle Jars & Vessels',
  estimatedQuantity: '50-100 units',
  customizationDetails: '',
  targetTimeline: 'Within 2-3 weeks'
};

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addToCart: (product, quantity = 1, selectedFinish, isB2BBulk = false, customNotes = '') => {
    const finish = selectedFinish || product.finishes[0];
    const unitPrice = isB2BBulk && product.b2bBulkPrice ? product.b2bBulkPrice : product.price;

    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.product.id === product.id && item.selectedFinish === finish && item.isB2BBulk === isB2BBulk
      );

      if (existingIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += quantity;
        return { cart: newCart, isCartOpen: true };
      } else {
        return {
          cart: [...state.cart, { product, quantity, selectedFinish: finish, isB2BBulk, unitPrice, customNotes }],
          isCartOpen: true
        };
      }
    });
  },

  removeFromCart: (productId, selectedFinish) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.product.id === productId && item.selectedFinish === selectedFinish)
      )
    }));
  },

  updateQuantity: (productId, selectedFinish, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, selectedFinish);
      return;
    }
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.product.id === productId && item.selectedFinish === selectedFinish) {
          return { ...item, quantity };
        }
        return item;
      })
    }));
  },

  clearCart: () => set({ cart: [] }),

  // Quick View
  quickViewProduct: null,
  setQuickViewProduct: (product) => set({ quickViewProduct: product }),

  // Search
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Filter
  activeCategory: 'all',
  setActiveCategory: (cat) => set({ activeCategory: cat }),

  // B2B Quote Inquiry
  isInquiryOpen: false,
  openInquiry: (defaultProduct) => {
    set((state) => ({
      isInquiryOpen: true,
      inquiryForm: defaultProduct
        ? { ...state.inquiryForm, productType: defaultProduct }
        : state.inquiryForm
    }));
  },
  closeInquiry: () => set({ isInquiryOpen: false }),
  inquiryForm: initialInquiryState,
  setInquiryForm: (data) =>
    set((state) => ({ inquiryForm: { ...state.inquiryForm, ...data } })),
  resetInquiryForm: () => set({ inquiryForm: initialInquiryState })
}));
