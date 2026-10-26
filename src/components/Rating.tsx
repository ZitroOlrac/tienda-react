export function Rating({ value, reviews }: { value: number; reviews: number }) {
  const full = Math.round(value);
  return (
    <p className="rating" aria-label={`Valoración ${value} de 5, ${reviews} opiniones`}>
      <span className="rating__stars" aria-hidden="true">
        {'★'.repeat(full)}
        <span className="rating__empty">{'★'.repeat(5 - full)}</span>
      </span>
      <span className="rating__text">
        {value.toFixed(1)} ({reviews})
      </span>
    </p>
  );
}
