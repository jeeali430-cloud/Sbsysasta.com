"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";
import {
  STORAGE_KEY,
  count,
  subtotal,
  toCartItem,
  type CartItem,
  type CartState,
  type Coupon,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  coupon: Coupon | null;
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartState {
  if (typeof window === "undefined") return { items: [], coupon: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], coupon: null };
    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.items)) return { items: [], coupon: null };
    return parsed;
  } catch {
    return { items: [], coupon: null };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [], coupon: null });
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setState(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* quota or private-mode — non-fatal */
    }
  }, [state, hydrated]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((product: Product, qty = 1) => {
    setState((prev) => {
      const existing = prev.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
          ),
        };
      }
      return { ...prev, items: [...prev.items, toCartItem(product, qty)] };
    });
    setDrawerOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
    }));
  }, []);

  const setQuantity = useCallback((id: string, qty: number) => {
    setState((prev) => {
      if (qty <= 0) {
        return { ...prev, items: prev.items.filter((i) => i.id !== id) };
      }
      return {
        ...prev,
        items: prev.items.map((i) =>
          i.id === id ? { ...i, quantity: Math.min(qty, 99) } : i
        ),
      };
    });
  }, []);

  const clear = useCallback(() => {
    setState({ items: [], coupon: null });
  }, []);

  const applyCoupon = useCallback((coupon: Coupon) => {
    setState((prev) => ({ ...prev, coupon }));
  }, []);

  const removeCoupon = useCallback(() => {
    setState((prev) => ({ ...prev, coupon: null }));
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      coupon: state.coupon,
      count: count(state.items),
      subtotal: subtotal(state.items),
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      add,
      remove,
      setQuantity,
      clear,
      applyCoupon,
      removeCoupon,
    }),
    [state, drawerOpen, add, remove, setQuantity, clear, applyCoupon, removeCoupon]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
