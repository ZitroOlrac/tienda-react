import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatPrice } from '../lib/format';
import type { Order } from '../types';

export function OrderConfirmed() {
  const order = useLocation().state as Order | null;
  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="confirmed">
      <div className="confirmed__icon" aria-hidden="true">✓</div>
      <h1>¡Pedido confirmado!</h1>
      <p>
        Gracias, {order.customer.name.split(' ')[0]}. Hemos enviado el resumen a <strong>{order.customer.email}</strong>.
      </p>
      <p className="confirmed__id">Número de pedido: {order.id}</p>

      <ul className="confirmed__lines">
        {order.lines.map(({ product, quantity }) => (
          <li key={product.id}>
            <span>
              {quantity} × {product.name}
            </span>
            <span>{formatPrice(product.price * quantity)}</span>
          </li>
        ))}
        <li>
          <span>Envío</span>
          <span>{order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}</span>
        </li>
        <li className="confirmed__total">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </li>
      </ul>
      <p className="note">
        Envío a {order.customer.address}, {order.customer.postalCode} {order.customer.city}.
      </p>
      <Link to="/" className="btn btn--primary">
        Seguir comprando
      </Link>
    </div>
  );
}
