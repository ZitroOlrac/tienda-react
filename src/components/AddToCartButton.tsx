import { useEffect, useState } from 'react';
import { useCart } from '../cart/useCart';
import type { Product } from '../types';

export function AddToCartButton({
  product,
  quantity = 1,
  compact = false,
}: {
  product: Product;
  quantity?: number;
  compact?: boolean;
}) {
  const { add, quantityOf } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = quantityOf(product.id);
  const soldOut = product.stock === 0;
  const maxed = inCart >= product.stock;

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  const label = soldOut ? 'Agotado' : maxed ? 'Máximo en carrito' : added ? 'Añadido ✓' : compact ? 'Añadir' : 'Añadir al carrito';

  return (
    <button
      type="button"
      className={`btn btn--primary${compact ? ' btn--small' : ''}${added ? ' btn--done' : ''}`}
      disabled={soldOut || maxed}
      onClick={() => {
        add(product, quantity);
        setAdded(true);
      }}
    >
      {label}
    </button>
  );
}
