import { describe, expect, it } from 'vitest';
import { validateCustomer } from './validation';

const valid = {
  name: 'Ana García',
  email: 'ana@example.com',
  address: 'Calle Mayor 1',
  city: 'Madrid',
  postalCode: '28013',
};

describe('validateCustomer', () => {
  it('acepta datos correctos', () => {
    expect(validateCustomer(valid)).toEqual({});
  });

  it('marca el correo y el código postal inválidos', () => {
    const errors = validateCustomer({ ...valid, email: 'ana@', postalCode: '280' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'postalCode']);
  });

  it('exige todos los campos', () => {
    const errors = validateCustomer({ name: '', email: '', address: '', city: '', postalCode: '' });
    expect(Object.keys(errors)).toHaveLength(5);
  });
});
