import { createContext, useContext } from 'react';
import type { Product } from '../types';

export interface CartValue {
  lines: { product: Product; quantity: number }[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (product: Product, quantity?: number) => void;
  setQuantity: (product: Product, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  quantityOf: (productId: string) => number;
}

export const CartContext = createContext<CartValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
