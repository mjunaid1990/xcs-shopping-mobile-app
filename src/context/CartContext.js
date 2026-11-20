import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { coupons as couponTable } from '../data/products';

const CartContext = createContext(null);

const SHIPPING_STANDARD = 9.99;
const SHIPPING_EXPRESS = 19.99;
const FREE_SHIPPING_THRESHOLD = 149;
const TAX_RATE = 0.08;

const lineKey = (productId, variant) =>
  `${productId}|${variant?.size || ''}|${variant?.color || ''}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [delivery, setDelivery] = useState('standard');
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message, tone = 'default') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, tone, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback(
    (product, quantity = 1, variant = {}) => {
      const key = lineKey(product.id, variant);
      setItems((current) => {
        const existing = current.find((line) => line.key === key);
        if (existing) {
          return current.map((line) =>
            line.key === key
              ? { ...line, quantity: Math.min(line.quantity + quantity, 10) }
              : line,
          );
        }
        return [
          ...current,
          {
            key,
            product,
            quantity,
            size: variant.size || null,
            color: variant.color || null,
          },
        ];
      });
      showToast(`${product.name} added to cart`, 'success');
    },
    [showToast],
  );

  const setQuantity = useCallback((key, quantity) => {
    setItems((current) => {
      if (quantity <= 0) return current.filter((line) => line.key !== key);
      return current.map((line) =>
        line.key === key ? { ...line, quantity: Math.min(quantity, 10) } : line,
      );
    });
  }, []);

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
    setDelivery('standard');
  }, []);

  const toggleFavorite = useCallback((productId) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const isFavorite = useCallback(
    (productId) => favorites.includes(productId),
    [favorites],
  );

  const applyCoupon = useCallback((rawCode) => {
    const code = (rawCode || '').trim().toUpperCase();
    if (!code) return { ok: false, message: 'Enter a coupon code first.' };
    const found = couponTable[code];
    if (!found) return { ok: false, message: 'That coupon is not valid.' };
    setCoupon(found);
    return { ok: true, message: `Coupon applied — ${found.label}.` };
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = items.reduce(
      (sum, line) => sum + line.product.price * line.quantity,
      0,
    );
    const discount = coupon?.type === 'percent' ? subtotal * coupon.value : 0;
    const qualifiesFreeShipping =
      subtotal - discount >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
    const shipping =
      qualifiesFreeShipping || coupon?.type === 'shipping'
        ? 0
        : delivery === 'express'
          ? SHIPPING_EXPRESS
          : SHIPPING_STANDARD;
    const tax = Math.max(0, subtotal - discount) * TAX_RATE;
    const total = Math.max(0, subtotal - discount) + shipping + tax;

    return {
      items,
      itemCount,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      delivery,
      setDelivery,
      coupon,
      applyCoupon,
      removeCoupon,
      addToCart,
      setQuantity,
      removeItem,
      clearCart,
      favorites,
      toggleFavorite,
      isFavorite,
      toast,
      showToast,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - (subtotal - discount)),
    };
  }, [
    items,
    coupon,
    delivery,
    applyCoupon,
    removeCoupon,
    addToCart,
    setQuantity,
    removeItem,
    clearCart,
    favorites,
    toggleFavorite,
    isFavorite,
    toast,
    showToast,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}
