import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { findProduct } from '../data/products';
import { shippingFor } from '../lib/format';
import type { CartLine } from '../types';
import { CartContext, type CartValue } from './useCart';
import { cartReducer } from './cartReducer';

const STORAGE_KEY = 'tienda-react:carrito';


function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    // Descarta productos que ya no existan en el catálogo.
    return parsed.filter((l) => findProduct(l.productId) && l.quantity > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Sin almacenamiento disponible: el carrito vive solo en memoria. */
    }
  }, [state]);

  const value = useMemo<CartValue>(() => {
    const lines = state.flatMap((l) => {
      const product = findProduct(l.productId);
      return product ? [{ product, quantity: l.quantity }] : [];
    });
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
    const shipping = shippingFor(subtotal);
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add: (product, quantity = 1) =>
        dispatch({ type: 'add', productId: product.id, quantity, maxStock: product.stock }),
      setQuantity: (product, quantity) =>
        dispatch({ type: 'setQuantity', productId: product.id, quantity, maxStock: product.stock }),
      remove: (productId) => dispatch({ type: 'remove', productId }),
      clear: () => dispatch({ type: 'clear' }),
      quantityOf: (productId) => state.find((l) => l.productId === productId)?.quantity ?? 0,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
