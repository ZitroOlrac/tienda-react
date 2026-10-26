export type Category = 'perifericos' | 'audio' | 'consolas' | 'realidad-virtual' | 'monitores';

export type ProductArtKind = 'keyboard' | 'mouse' | 'headset' | 'controller' | 'vr' | 'monitor' | 'speaker' | 'console';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  /** Precio anterior, si el producto está en oferta. */
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  features: string[];
  art: { kind: ProductArtKind; from: string; to: string };
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CustomerData {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  lines: { product: Product; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CustomerData;
  createdAt: string;
}
