import type { ReactNode } from 'react';
import { useCart } from '../cart/useCart';
import { FREE_SHIPPING_FROM, formatPrice } from '../lib/format';

export function OrderSummary({ children }: { children?: ReactNode }) {
  const { count, subtotal, shipping, total } = useCart();
  const missing = FREE_SHIPPING_FROM - subtotal;

  return (
    <aside className="summary" aria-label="Resumen del pedido">
      <h2>Resumen</h2>
      <dl>
        <div>
          <dt>Productos ({count})</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Envío</dt>
          <dd>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</dd>
        </div>
        <div className="summary__total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {missing > 0 && (
        <p className="note">Te faltan {formatPrice(missing)} para tener envío gratis.</p>
      )}
      {children && <div className="summary__actions">{children}</div>}
    </aside>
  );
}
