import type { CustomerData } from '../types';

export type Errors = Partial<Record<keyof CustomerData, string>>;

/** Valida los datos de envío. Devuelve un objeto vacío si todo es correcto. */
export function validateCustomer(data: CustomerData): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 3) errors.name = 'Escribe tu nombre completo.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = 'Escribe un correo válido.';
  if (data.address.trim().length < 5) errors.address = 'Escribe la dirección de envío.';
  if (data.city.trim().length < 2) errors.city = 'Escribe la ciudad.';
  if (!/^\d{5}$/.test(data.postalCode.trim())) errors.postalCode = 'El código postal debe tener 5 dígitos.';
  return errors;
}
