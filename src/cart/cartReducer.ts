import type { CartLine } from '../types';

export type CartAction =
  | { type: 'add'; productId: string; quantity?: number; maxStock: number }
  | { type: 'setQuantity'; productId: string; quantity: number; maxStock: number }
  | { type: 'remove'; productId: string }
  | { type: 'clear' };

const clamp = (value: number, max: number) => Math.max(0, Math.min(value, max));

/**
 * Reductor puro del carrito: recibe el estado y una acción y devuelve un estado nuevo.
 * Nunca deja cantidades por encima del stock ni líneas con cantidad 0.
 */
export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'add': {
      const amount = action.quantity ?? 1;
      const existing = state.find((l) => l.productId === action.productId);
      if (!existing) {
        const quantity = clamp(amount, action.maxStock);
        return quantity > 0 ? [...state, { productId: action.productId, quantity }] : state;
      }
      return state.map((l) =>
        l.productId === action.productId
          ? { ...l, quantity: clamp(l.quantity + amount, action.maxStock) }
          : l,
      );
    }
    case 'setQuantity': {
      const quantity = clamp(action.quantity, action.maxStock);
      if (quantity === 0) return state.filter((l) => l.productId !== action.productId);
      return state.map((l) => (l.productId === action.productId ? { ...l, quantity } : l));
    }
    case 'remove':
      return state.filter((l) => l.productId !== action.productId);
    case 'clear':
      return [];
  }
}
