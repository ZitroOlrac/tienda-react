import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { categories, products } from '../data/products';
import { FREE_SHIPPING_FROM, formatPrice } from '../lib/format';
import type { Category, Product } from '../types';

type Sort = 'relevancia' | 'precio-asc' | 'precio-desc' | 'valoracion';

const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  relevancia: (a, b) => b.reviews - a.reviews,
  'precio-asc': (a, b) => a.price - b.price,
  'precio-desc': (a, b) => b.price - a.price,
  valoracion: (a, b) => b.rating - a.rating,
};

export function Catalog() {
  // Los filtros viven en la URL: se pueden compartir y sobreviven a recargar la página.
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = (params.get('categoria') ?? '') as Category | '';
  const sort = (params.get('orden') ?? 'relevancia') as Sort;
  const onlyOffers = params.get('ofertas') === '1';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => !category || p.category === category)
      .filter((p) => !onlyOffers || p.oldPrice)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .sort(sorters[sort] ?? sorters.relevancia);
  }, [query, category, sort, onlyOffers]);

  return (
    <>
      <section className="hero">
        <div>
          <p className="hero__kicker">Tecnología para jugar y crear</p>
          <h1>Equipa tu setup sin complicaciones</h1>
          <p className="hero__lead">
            Periféricos, audio, consolas y realidad virtual. Envío gratis a partir de {formatPrice(FREE_SHIPPING_FROM)}.
          </p>
        </div>
      </section>

      <section aria-label="Filtros" className="filters">
        <label className="field field--search">
          <span className="sr-only">Buscar productos</span>
          <input
            type="search"
            placeholder="Buscar productos…"
            value={query}
            onChange={(e) => update('q', e.target.value)}
          />
        </label>
        <label className="field">
          <span className="sr-only">Ordenar por</span>
          <select value={sort} onChange={(e) => update('orden', e.target.value === 'relevancia' ? '' : e.target.value)}>
            <option value="relevancia">Más populares</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="valoracion">Mejor valorados</option>
          </select>
        </label>
        <label className="toggle">
          <input type="checkbox" checked={onlyOffers} onChange={(e) => update('ofertas', e.target.checked ? '1' : '')} />
          Solo ofertas
        </label>
      </section>

      <nav className="chips" aria-label="Categorías">
        <button type="button" className={!category ? 'chip chip--active' : 'chip'} onClick={() => update('categoria', '')}>
          Todo
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={category === c.id ? 'chip chip--active' : 'chip'}
            onClick={() => update('categoria', c.id)}
          >
            {c.label}
          </button>
        ))}
      </nav>

      <p className="results" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
      </p>

      {visible.length > 0 ? (
        <div className="grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No hay productos que coincidan con tu búsqueda.</p>
          <button type="button" className="btn btn--ghost" onClick={() => setParams({}, { replace: true })}>
            Quitar filtros
          </button>
        </div>
      )}
    </>
  );
}
