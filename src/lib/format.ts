const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

export const formatPrice = (value: number) => currency.format(value);

/** Envío gratis a partir de este importe. */
export const FREE_SHIPPING_FROM = 50;
export const SHIPPING_COST = 4.99;

export const shippingFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
