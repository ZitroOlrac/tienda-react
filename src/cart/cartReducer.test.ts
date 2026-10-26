import { describe, expect, it } from 'vitest';
import { cartReducer } from './cartReducer';

describe('cartReducer', () => {
  it('añade un producto nuevo con cantidad 1', () => {
    const state = cartReducer([], { type: 'add', productId: 'a', maxStock: 5 });
    expect(state).toEqual([{ productId: 'a', quantity: 1 }]);
  });

  it('suma la cantidad si el producto ya está en el carrito', () => {
    const state = cartReducer([{ productId: 'a', quantity: 2 }], {
      type: 'add',
      productId: 'a',
      quantity: 2,
      maxStock: 10,
    });
    expect(state).toEqual([{ productId: 'a', quantity: 4 }]);
  });

  it('no supera el stock disponible', () => {
    const state = cartReducer([{ productId: 'a', quantity: 3 }], {
      type: 'add',
      productId: 'a',
      quantity: 5,
      maxStock: 4,
    });
    expect(state[0].quantity).toBe(4);
  });

  it('no añade productos sin stock', () => {
    const state = cartReducer([], { type: 'add', productId: 'a', maxStock: 0 });
    expect(state).toEqual([]);
  });

  it('elimina la línea al poner la cantidad a 0', () => {
    const state = cartReducer([{ productId: 'a', quantity: 3 }], {
      type: 'setQuantity',
      productId: 'a',
      quantity: 0,
      maxStock: 5,
    });
    expect(state).toEqual([]);
  });

  it('vacía el carrito', () => {
    const state = cartReducer([{ productId: 'a', quantity: 1 }], { type: 'clear' });
    expect(state).toEqual([]);
  });
});
