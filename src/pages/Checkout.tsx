import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { OrderSummary } from '../components/OrderSummary';
import { useCart } from '../cart/useCart';
import { validateCustomer, type Errors } from '../lib/validation';
import type { CustomerData, Order } from '../types';

const fields: { key: keyof CustomerData; label: string; type?: string; autoComplete: string }[] = [
  { key: 'name', label: 'Nombre completo', autoComplete: 'name' },
  { key: 'email', label: 'Correo electrónico', type: 'email', autoComplete: 'email' },
  { key: 'address', label: 'Dirección', autoComplete: 'street-address' },
  { key: 'city', label: 'Ciudad', autoComplete: 'address-level2' },
  { key: 'postalCode', label: 'Código postal', autoComplete: 'postal-code' },
];

export function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const [data, setData] = useState<CustomerData>({ name: '', email: '', address: '', city: '', postalCode: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  if (cart.lines.length === 0 && !sending) return <Navigate to="/carrito" replace />;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateCustomer(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`campo-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setSending(true);
    // Simula la llamada a una API de pedidos.
    setTimeout(() => {
      const order: Order = {
        id: `PM-${Date.now().toString(36).toUpperCase()}`,
        lines: cart.lines,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        total: cart.total,
        customer: data,
        createdAt: new Date().toISOString(),
      };
      cart.clear();
      navigate('/pedido', { state: order, replace: true });
    }, 700);
  };

  return (
    <div className="checkout-layout">
      <section>
        <h1>Datos de envío</h1>
        <p className="note">Tienda de demostración: no se te cobrará nada.</p>
        <form className="form" onSubmit={onSubmit} noValidate>
          {fields.map((f) => (
            <label key={f.key} className={`form__field form__field--${f.key}`}>
              <span>{f.label}</span>
              <input
                id={`campo-${f.key}`}
                type={f.type ?? 'text'}
                autoComplete={f.autoComplete}
                inputMode={f.key === 'postalCode' ? 'numeric' : undefined}
                value={data[f.key]}
                aria-invalid={Boolean(errors[f.key])}
                aria-describedby={errors[f.key] ? `error-${f.key}` : undefined}
                onChange={(e) => {
                  setData({ ...data, [f.key]: e.target.value });
                  if (errors[f.key]) setErrors({ ...errors, [f.key]: undefined });
                }}
              />
              {errors[f.key] && (
                <small id={`error-${f.key}`} className="form__error">
                  {errors[f.key]}
                </small>
              )}
            </label>
          ))}
          <div className="form__actions">
            <Link to="/carrito" className="btn btn--ghost">
              Volver al carrito
            </Link>
            <button type="submit" className="btn btn--primary" disabled={sending}>
              {sending ? 'Procesando…' : 'Confirmar pedido'}
            </button>
          </div>
        </form>
      </section>
      <OrderSummary />
    </div>
  );
}
