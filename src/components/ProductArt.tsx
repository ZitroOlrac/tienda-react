import type { Product } from '../types';

/**
 * Ilustración vectorial del producto. Evita depender de imágenes externas:
 * cada producto se dibuja con SVG a partir de su tipo y sus colores.
 */
export function ProductArt({ product, size = 'card' }: { product: Product; size?: 'card' | 'large' | 'thumb' }) {
  const { kind, from, to } = product.art;
  const gid = `g-${product.id}`;

  return (
    <svg className={`art art--${size}`} viewBox="0 0 400 300" role="img" aria-label={product.name}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      <circle cx="330" cy="40" r="90" fill="#fff" opacity="0.08" />
      <circle cx="60" cy="280" r="70" fill="#fff" opacity="0.06" />
      <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {shape(kind)}
      </g>
    </svg>
  );
}

function shape(kind: Product['art']['kind']) {
  switch (kind) {
    case 'keyboard':
      return (
        <>
          <rect x="70" y="105" width="260" height="100" rx="14" fill="#fff" fillOpacity="0.12" />
          {[0, 1, 2].map((row) =>
            Array.from({ length: 9 - row }, (_, i) => (
              <rect key={`${row}-${i}`} x={88 + row * 12 + i * 26} y={120 + row * 24} width="18" height="16" rx="3" strokeWidth="3" />
            )),
          )}
          <rect x="140" y="184" width="120" height="12" rx="3" strokeWidth="3" />
        </>
      );
    case 'mouse':
      return (
        <>
          <path d="M200 70c-42 0-62 34-62 74v40c0 40 26 62 62 62s62-22 62-62v-40c0-40-20-74-62-74z" fill="#fff" fillOpacity="0.12" />
          <path d="M200 70v62M138 132h124" strokeWidth="4" />
          <rect x="193" y="92" width="14" height="26" rx="7" fill="#fff" />
        </>
      );
    case 'headset':
      return (
        <>
          <path d="M120 175v-30c0-48 36-84 80-84s80 36 80 84v30" />
          <rect x="98" y="160" width="46" height="74" rx="18" fill="#fff" fillOpacity="0.15" />
          <rect x="256" y="160" width="46" height="74" rx="18" fill="#fff" fillOpacity="0.15" />
          <path d="M121 234c0 22 22 30 52 30" strokeWidth="4" />
          <circle cx="178" cy="264" r="7" fill="#fff" />
        </>
      );
    case 'speaker':
      return (
        <>
          <rect x="110" y="95" width="180" height="120" rx="56" fill="#fff" fillOpacity="0.14" />
          <circle cx="160" cy="155" r="32" />
          <circle cx="160" cy="155" r="12" fill="#fff" />
          <circle cx="240" cy="155" r="32" />
          <circle cx="240" cy="155" r="12" fill="#fff" />
        </>
      );
    case 'controller':
      return (
        <>
          <path d="M120 120h160c30 0 48 24 54 60l8 42c4 24-20 38-38 20l-30-30H126l-30 30c-18 18-42 4-38-20l8-42c6-36 24-60 54-60z" fill="#fff" fillOpacity="0.14" />
          <path d="M140 150v36M122 168h36" />
          <circle cx="258" cy="158" r="8" fill="#fff" />
          <circle cx="282" cy="178" r="8" fill="#fff" />
          <circle cx="182" cy="196" r="12" strokeWidth="4" />
          <circle cx="226" cy="196" r="12" strokeWidth="4" />
        </>
      );
    case 'console':
      return (
        <>
          <rect x="60" y="105" width="280" height="110" rx="40" fill="#fff" fillOpacity="0.14" />
          <rect x="125" y="120" width="150" height="80" rx="8" fill="#000" fillOpacity="0.25" />
          <path d="M88 150v24M76 162h24" strokeWidth="4" />
          <circle cx="306" cy="152" r="6" fill="#fff" />
          <circle cx="318" cy="170" r="6" fill="#fff" />
          <path d="M150 182l20-26 18 18 14-12 22 20" strokeWidth="4" />
        </>
      );
    case 'vr':
      return (
        <>
          <path d="M90 130c0-18 14-30 32-30h156c18 0 32 12 32 30v52c0 18-14 30-32 30h-48l-18-26h-24l-18 26h-48c-18 0-32-12-32-30z" fill="#fff" fillOpacity="0.14" />
          <circle cx="152" cy="156" r="26" />
          <circle cx="248" cy="156" r="26" />
          <path d="M90 140H60M310 140h30" strokeWidth="8" />
        </>
      );
    case 'monitor':
      return (
        <>
          <path d="M70 90q130-22 260 0v130q-130-22-260 0z" fill="#fff" fillOpacity="0.14" />
          <path d="M100 196l40-46 30 28 40-50 56 64" strokeWidth="4" />
          <path d="M200 214v36M160 256h80" />
        </>
      );
  }
}
