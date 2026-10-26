import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AddToCartButton } from '../components/AddToCartButton';
import { Price } from '../components/Price';
import { ProductArt } from '../components/ProductArt';
import { ProductCard } from '../components/ProductCard';
import { QuantityControl } from '../components/QuantityControl';
import { Rating } from '../components/Rating';
import { useCart } from '../cart/useCart';
import { categoryLabel, findProduct, products } from '../data/products';
import { NotFound } from './NotFound';

export function ProductDetail() {
  const { id = '' } = useParams();
  // La key reinicia el estado (cantidad elegida) al cambiar de producto.
  return <ProductDetailView key={id} id={id} />;
}

function ProductDetailView({ id }: { id: string }) {
  const product = findProduct(id);
  const { quantityOf } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return <NotFound />;

  const available = product.stock - quantityOf(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <>
      <nav className="breadcrumb" aria-label="Ruta">
        <Link to="/">Catálogo</Link> / <Link to={`/?categoria=${product.category}`}>{categoryLabel(product.category)}</Link> /{' '}
        <span>{product.name}</span>
      </nav>

      <article className="detail">
        <div className="detail__media">
          <ProductArt product={product} size="large" />
        </div>
        <div className="detail__info">
          <p className="card__category">{categoryLabel(product.category)}</p>
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} />
          <Price product={product} large />
          <p className="detail__description">{product.description}</p>
          <ul className="features">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className={`stock${product.stock === 0 ? ' stock--out' : product.stock < 5 ? ' stock--low' : ''}`}>
            {product.stock === 0
              ? 'Sin stock por ahora'
              : product.stock < 5
                ? `¡Solo quedan ${product.stock}!`
                : 'En stock · envío en 24/48 h'}
          </p>
          {available > 0 && (
            <div className="detail__buy">
              <QuantityControl
                value={Math.min(quantity, available)}
                max={available}
                label={product.name}
                onChange={setQuantity}
              />
              <AddToCartButton product={product} quantity={Math.min(quantity, available)} />
            </div>
          )}
          {available === 0 && product.stock > 0 && (
            <p className="note">Ya tienes en el carrito todas las unidades disponibles.</p>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="related">
          <h2>También te puede interesar</h2>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
