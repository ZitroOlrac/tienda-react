import { Link } from 'react-router-dom';
import { categoryLabel } from '../data/products';
import type { Product } from '../types';
import { AddToCartButton } from './AddToCartButton';
import { Price } from './Price';
import { ProductArt } from './ProductArt';
import { Rating } from './Rating';

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <article className="card">
      <Link to={`/producto/${product.id}`} className="card__media">
        <ProductArt product={product} />
        {discount > 0 && <span className="badge badge--sale">-{discount} %</span>}
        {product.stock === 0 && <span className="badge badge--out">Agotado</span>}
      </Link>
      <div className="card__body">
        <p className="card__category">{categoryLabel(product.category)}</p>
        <h3 className="card__title">
          <Link to={`/producto/${product.id}`}>{product.name}</Link>
        </h3>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="card__footer">
          <Price product={product} />
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </article>
  );
}
