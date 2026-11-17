"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
export type {
  WishlistItem,
  CartItem,
  UserProfile,
  OrderItem,
  RfqItem,
  SavedAddress,
} from "./storefront-store";
import {
  WishlistItem,
  CartItem,
  UserProfile,
  OrderItem,
  RfqItem,
  SavedAddress,
  INITIAL_WISHLIST,
  INITIAL_CART,
  DEFAULT_COLLECTOR_USER,
  DEFAULT_ENTERPRISE_USER,
  INITIAL_ORDERS,
  INITIAL_RFQS,
  INITIAL_ADDRESSES,
} from "./storefront-store";

interface StorefrontContextType {
  wishlist: WishlistItem[];
  cart: CartItem[];
  user: UserProfile | null;
  orders: OrderItem[];
  rfqs: RfqItem[];
  addresses: SavedAddress[];
  deliveryMethod: "white-glove" | "atelier";
  isTaxExempt: boolean;
  promoCode: string;
  promoDiscountPct: number;
  promoError: string;
  specialInstructions: string;
  // Calculations
  cartSubtotal: number;
  cartShipping: number;
  cartTax: number;
  cartDiscount: number;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
  // Actions
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  restoreWishlist: () => void;
  moveWishlistItemToCart: (id: string) => void;
  moveAllWishlistToCart: () => void;
  updateCartQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  restoreCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  setDeliveryMethod: (method: "white-glove" | "atelier") => void;
  toggleTaxExempt: () => void;
  setSpecialInstructions: (text: string) => void;
  loginAsCollector: () => void;
  loginAsEnterprise: () => void;
  loginCustom: (email: string, role: "collector" | "enterprise", name?: string, company?: string) => void;
  logoutUser: () => void;
  addAddress: (address: Omit<SavedAddress, "id">) => void;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

const STORAGE_KEYS = {
  WISHLIST: "fc_wishlist_items_v1",
  CART: "fc_cart_items_v1",
  USER: "fc_user_profile_v1",
  DELIVERY: "fc_cart_delivery_v1",
  TAX_EXEMPT: "fc_cart_tax_exempt_v1",
  PROMO: "fc_cart_promo_v1",
  INSTRUCTIONS: "fc_cart_instructions_v1",
  ADDRESSES: "fc_user_addresses_v1",
};

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_COLLECTOR_USER);
  const [orders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [rfqs] = useState<RfqItem[]>(INITIAL_RFQS);
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [deliveryMethod, setDeliveryMethodState] = useState<"white-glove" | "atelier">("white-glove");
  const [isTaxExempt, setIsTaxExempt] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscountPct, setPromoDiscountPct] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [specialInstructions, setSpecialInstructionsState] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedDelivery = localStorage.getItem(STORAGE_KEYS.DELIVERY);
      if (savedDelivery === "atelier" || savedDelivery === "white-glove") {
        setDeliveryMethodState(savedDelivery);
      }

      const savedTaxExempt = localStorage.getItem(STORAGE_KEYS.TAX_EXEMPT);
      if (savedTaxExempt !== null) {
        setIsTaxExempt(JSON.parse(savedTaxExempt));
      }

      const savedPromo = localStorage.getItem(STORAGE_KEYS.PROMO);
      if (savedPromo) {
        const parsed = JSON.parse(savedPromo);
        setPromoCode(parsed.code || "");
        setPromoDiscountPct(parsed.pct || 0);
      }

      const savedInstructions = localStorage.getItem(STORAGE_KEYS.INSTRUCTIONS);
      if (savedInstructions) {
        setSpecialInstructionsState(savedInstructions);
      }

      const savedAddresses = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
    } catch (e) {
      console.warn("Could not access localStorage for Storefront state:", e);
    }
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  }, [cart, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {}
  }, [user, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEYS.DELIVERY, deliveryMethod);
    } catch {}
  }, [deliveryMethod, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TAX_EXEMPT, JSON.stringify(isTaxExempt));
    } catch {}
  }, [isTaxExempt, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(
        STORAGE_KEYS.PROMO,
        JSON.stringify({ code: promoCode, pct: promoDiscountPct })
      );
    } catch {}
  }, [promoCode, promoDiscountPct, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEYS.INSTRUCTIONS, specialInstructions);
    } catch {}
  }, [specialInstructions, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
    } catch {}
  }, [addresses, isMounted]);

  // Wishlist Actions
  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const restoreWishlist = useCallback(() => {
    setWishlist(INITIAL_WISHLIST);
  }, []);

  const moveWishlistItemToCart = useCallback((id: string) => {
    setWishlist((prevWish) => {
      const target = prevWish.find((w) => w.id === id);
      if (!target) return prevWish;

      setCart((prevCart) => {
        const existing = prevCart.find((c) => c.title === target.title);
        if (existing) {
          return prevCart.map((c) =>
            c.id === existing.id ? { ...c, quantity: c.quantity + 1 } : c
          );
        }
        const newCartItem: CartItem = {
          id: `cart-${target.id}-${Date.now()}`,
          title: target.title,
          category: target.category,
          dimensions: target.dimensions,
          specs: `${target.material} • ${target.glazing}`,
          unitPrice: target.price,
          quantity: 1,
          vertical: target.vertical,
        };
        return [...prevCart, newCartItem];
      });

      return prevWish.filter((w) => w.id !== id);
    });
  }, []);

  const moveAllWishlistToCart = useCallback(() => {
    setWishlist((prevWish) => {
      if (prevWish.length === 0) return prevWish;

      setCart((prevCart) => {
        const updated = [...prevCart];
        prevWish.forEach((item) => {
          const existing = updated.find((c) => c.title === item.title);
          if (existing) {
            existing.quantity += 1;
          } else {
            updated.push({
              id: `cart-${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              title: item.title,
              category: item.category,
              dimensions: item.dimensions,
              specs: `${item.material} • ${item.glazing}`,
              unitPrice: item.price,
              quantity: 1,
              vertical: item.vertical,
            });
          }
        });
        return updated;
      });

      return [];
    });
  }, []);

  // Cart Actions
  const updateCartQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const restoreCart = useCallback(() => {
    setCart(INITIAL_CART);
  }, []);

  const applyPromo = useCallback((code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "ARCHITECT10") {
      setPromoCode(clean);
      setPromoDiscountPct(10);
      setPromoError("");
      return true;
    } else if (clean === "TRADE15") {
      setPromoCode(clean);
      setPromoDiscountPct(15);
      setPromoError("");
      return true;
    } else if (clean === "STUDIO20") {
      setPromoCode(clean);
      setPromoDiscountPct(20);
      setPromoError("");
      return true;
    } else {
      setPromoError("Invalid trade or designer code. Try TRADE15 or ARCHITECT10.");
      return false;
    }
  }, []);

  const removePromo = useCallback(() => {
    setPromoCode("");
    setPromoDiscountPct(0);
    setPromoError("");
  }, []);

  const setDeliveryMethod = useCallback((method: "white-glove" | "atelier") => {
    setDeliveryMethodState(method);
  }, []);

  const toggleTaxExempt = useCallback(() => {
    setIsTaxExempt((prev) => !prev);
  }, []);

  const setSpecialInstructions = useCallback((text: string) => {
    setSpecialInstructionsState(text);
  }, []);

  // User Actions
  const loginAsCollector = useCallback(() => {
    setUser(DEFAULT_COLLECTOR_USER);
  }, []);

  const loginAsEnterprise = useCallback(() => {
    setUser(DEFAULT_ENTERPRISE_USER);
  }, []);

  const loginCustom = useCallback(
    (email: string, role: "collector" | "enterprise", name?: string, company?: string) => {
      const derivedName = name || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const newUser: UserProfile = {
        name: derivedName,
        email,
        role,
        tier: role === "enterprise" ? "Corporate Enterprise Partner • GeM L1" : "Atelier Collector • Tier II",
        company: role === "enterprise" ? company || "Architectural Fabrications Corp" : undefined,
        memberSince: "February 2026",
      };
      setUser(newUser);
    },
    []
  );

  const logoutUser = useCallback(() => {
    setUser(null);
  }, []);

  const addAddress = useCallback((newAddr: Omit<SavedAddress, "id">) => {
    const item: SavedAddress = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [item, ...prev]);
  }, []);

  // Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const cartShipping = useMemo(() => {
    if (cart.length === 0) return 0;
    if (deliveryMethod === "atelier") return 0;
    // Complimentary white-glove above ₹2,500, otherwise ₹120
    return cartSubtotal >= 2500 ? 0 : 120;
  }, [cart.length, deliveryMethod, cartSubtotal]);

  const cartDiscount = useMemo(() => {
    if (promoDiscountPct === 0) return 0;
    return Math.round((cartSubtotal * promoDiscountPct) / 100);
  }, [cartSubtotal, promoDiscountPct]);

  const cartTax = useMemo(() => {
    if (isTaxExempt || cart.length === 0) return 0;
    // Standard estimated tax of 8.25%
    const taxableBase = Math.max(0, cartSubtotal - cartDiscount);
    return Math.round(taxableBase * 0.0825);
  }, [isTaxExempt, cart.length, cartSubtotal, cartDiscount]);

  const cartTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    return Math.max(0, cartSubtotal - cartDiscount) + cartShipping + cartTax;
  }, [cart.length, cartSubtotal, cartDiscount, cartShipping, cartTax]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  const value = useMemo(
    () => ({
      wishlist,
      cart,
      user,
      orders,
      rfqs,
      addresses,
      deliveryMethod,
      isTaxExempt,
      promoCode,
      promoDiscountPct,
      promoError,
      specialInstructions,
      cartSubtotal,
      cartShipping,
      cartTax,
      cartDiscount,
      cartTotal,
      cartCount,
      wishlistCount,
      removeFromWishlist,
      clearWishlist,
      restoreWishlist,
      moveWishlistItemToCart,
      moveAllWishlistToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      restoreCart,
      applyPromo,
      removePromo,
      setDeliveryMethod,
      toggleTaxExempt,
      setSpecialInstructions,
      loginAsCollector,
      loginAsEnterprise,
      loginCustom,
      logoutUser,
      addAddress,
    }),
    [
      wishlist,
      cart,
      user,
      orders,
      rfqs,
      addresses,
      deliveryMethod,
      isTaxExempt,
      promoCode,
      promoDiscountPct,
      promoError,
      specialInstructions,
      cartSubtotal,
      cartShipping,
      cartTax,
      cartDiscount,
      cartTotal,
      cartCount,
      wishlistCount,
      removeFromWishlist,
      clearWishlist,
      restoreWishlist,
      moveWishlistItemToCart,
      moveAllWishlistToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      restoreCart,
      applyPromo,
      removePromo,
      setDeliveryMethod,
      toggleTaxExempt,
      setSpecialInstructions,
      loginAsCollector,
      loginAsEnterprise,
      loginCustom,
      logoutUser,
      addAddress,
    ]
  );

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error("useStorefront must be used within a StorefrontProvider");
  }
  return context;
}
