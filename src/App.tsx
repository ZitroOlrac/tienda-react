import { HashRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './cart/CartContext';
import { Layout } from './components/Layout';
import { Cart } from './pages/Cart';
import { Catalog } from './pages/Catalog';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';
import { OrderConfirmed } from './pages/OrderConfirmed';
import { ProductDetail } from './pages/ProductDetail';

// HashRouter para que las rutas funcionen en GitHub Pages sin configurar el servidor.
export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Catalog />} />
            <Route path="producto/:id" element={<ProductDetail />} />
            <Route path="carrito" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="pedido" element={<OrderConfirmed />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}
