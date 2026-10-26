import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="empty empty--page">
      <h1>Página no encontrada</h1>
      <p>El producto o la página que buscas no existe.</p>
      <Link to="/" className="btn btn--primary">
        Volver al catálogo
      </Link>
    </div>
  );
}
