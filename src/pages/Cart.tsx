import { Link } from 'react-router-dom';
import { OrderSummary } from '../components/OrderSummary';
import { ProductArt } from '../components/ProductArt';
import { QuantityControl } from '../components/QuantityControl';
import { useCart } from '../cart/useCart';
import { formatPrice } from '../lib/format';

export function Cart() {
  const { lines, setQuantity, remove, clear } = useCart();

  if (lines.length === 0) {
    return (
      <div className="empty empty--page">
        <h1>Tu carrito está vacío</h1>
        <p>Explora el catálogo y añade lo que más te guste.</p>
        <Link to="/" className="btn btn--primary">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <section>
        <div className="section-head">
          <h1>Carrito</h1>
          <button type="button" className="link-button" onClick={clear}>
            Vaciar carrito
          </button>
        </div>
        <ul className="cart-list">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="cart-item">
              <Link to={`/producto/${product.id}`} className="cart-item__media">
                <ProductArt product={product} size="thumb" />
              </Link>
              <div className="cart-item__info">
                <Link to={`/producto/${product.id}`} className="cart-item__name">
                  {product.name}
                </Link>
                <p className="cart-item__unit">{formatPrice(product.price)} / unidad</p>
                <button type="button" className="link-button" onClick={() => remove(product.id)}>
                  Eliminar
                </button>
              </div>
              <QuantityControl
                value={quantity}
                max={product.stock}
                label={product.name}
                onChange={(q) => setQuantity(product, q)}
              />
              <p className="cart-item__total">{formatPrice(product.price * quantity)}</p>
            </li>
          ))}
        </ul>
      </section>

      <OrderSummary>
        <Link to="/checkout" className="btn btn--primary btn--block">
          Tramitar pedido
        </Link>
        <Link to="/" className="btn btn--ghost btn--block">
          Seguir comprando
        </Link>
      </OrderSummary>
    </div>
  );
}
