import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../cart/useCart';

export function Layout() {
  const { count } = useCart();
  const { pathname } = useLocation();

  // Al cambiar de página, vuelve arriba.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="brand" aria-label="Pixel Market, inicio">
            <span className="brand__mark" aria-hidden="true">▲</span>
            Pixel Market
          </Link>
          <nav className="header__nav" aria-label="Principal">
            <NavLink to="/" end>Catálogo</NavLink>
            <NavLink to="/carrito" className="cart-link">
              Carrito
              <span className="cart-link__count" aria-label={`${count} productos en el carrito`}>{count}</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>Pixel Market · Proyecto de demostración: no se realizan cobros ni envíos reales.</p>
          <p>Hecho con React, TypeScript y Vite.</p>
        </div>
      </footer>
    </div>
  );
}
