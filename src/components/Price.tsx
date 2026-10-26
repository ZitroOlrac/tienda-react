import { formatPrice } from '../lib/format';
import type { Product } from '../types';

export function Price({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <p className={`price${large ? ' price--large' : ''}`}>
      <span className="price__now">{formatPrice(product.price)}</span>
      {product.oldPrice && <s className="price__old">{formatPrice(product.oldPrice)}</s>}
    </p>
  );
}
