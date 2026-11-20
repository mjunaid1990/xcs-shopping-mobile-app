/**
 * Dummy catalogue for the demo store.
 * Everything the app renders comes from this file, so it is the only place to
 * edit when you want to swap in real products or an API response.
 */

export const categories = [
  {
    id: 'audio',
    name: 'Audio',
    icon: 'headset',
    tint: '#EEF0FF',
    accent: '#5B4CFF',
  },
  {
    id: 'footwear',
    name: 'Footwear',
    icon: 'footsteps',
    tint: '#FFF1EB',
    accent: '#F2542D',
  },
  {
    id: 'wearables',
    name: 'Watches',
    icon: 'watch',
    tint: '#E7F8F0',
    accent: '#0E9E74',
  },
  {
    id: 'accessories',
    name: 'Bags',
    icon: 'bag-handle',
    tint: '#FDF2FA',
    accent: '#C11574',
  },
];

const APPAREL_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'];
const WATCH_SIZES = ['40mm', '44mm'];

export const products = [
  {
    id: 'p1',
    name: 'Aurora Wireless Headphones',
    brand: 'Sonix Audio',
    category: 'audio',
    price: 249,
    oldPrice: 329,
    rating: 4.8,
    reviews: 1284,
    badge: 'Best seller',
    stock: 12,
    image: require('../../assets/products/headphones.jpg'),
    colors: [
      { name: 'Midnight', hex: '#22252D' },
      { name: 'Sand', hex: '#D8C7B0' },
      { name: 'Lilac', hex: '#B9AEF7' },
    ],
    sizes: [],
    description:
      'Studio-grade sound in a feather-light frame. Adaptive noise cancelling reads the room 240 times a second so your playlist stays centre stage, while the memory-foam cushions keep long sessions comfortable.',
    features: [
      '40h battery with fast charge',
      'Hybrid active noise cancelling',
      'Bluetooth 5.4 multipoint pairing',
      'Foldable travel case included',
    ],
  },
  {
    id: 'p2',
    name: 'Pulse Buds Pro',
    brand: 'Sonix Audio',
    category: 'audio',
    price: 129,
    oldPrice: 159,
    rating: 4.6,
    reviews: 862,
    badge: 'New',
    stock: 24,
    image: require('../../assets/products/buds.jpg'),
    colors: [
      { name: 'Pearl', hex: '#F2F1ED' },
      { name: 'Graphite', hex: '#3A3D45' },
    ],
    sizes: [],
    description:
      'Tiny buds, huge presence. Dual drivers deliver deep bass without masking vocals, and the pocket-sized case tops them up three times over.',
    features: [
      '8h + 24h with charging case',
      'IPX5 sweat and splash resistant',
      'Touch controls with voice assistant',
      'USB-C and wireless charging',
    ],
  },
  {
    id: 'p3',
    name: 'Echo Room Speaker',
    brand: 'Sonix Audio',
    category: 'audio',
    price: 89,
    oldPrice: null,
    rating: 4.4,
    reviews: 431,
    badge: null,
    stock: 30,
    image: require('../../assets/products/speaker.jpg'),
    colors: [
      { name: 'Clay', hex: '#C98873' },
      { name: 'Slate', hex: '#5B6068' },
    ],
    sizes: [],
    description:
      'A 360° speaker that fills the room from a shelf corner. Warm low end, crisp highs and a fabric finish that looks as good as it sounds.',
    features: [
      '360° room-filling sound',
      '16h playtime',
      'Stereo pairing for two speakers',
      'Recycled fabric shell',
    ],
  },
  {
    id: 'p4',
    name: 'Cloudstep Runner',
    brand: 'Northpeak',
    category: 'footwear',
    price: 149,
    oldPrice: 189,
    rating: 4.7,
    reviews: 2140,
    badge: 'Best seller',
    stock: 9,
    image: require('../../assets/products/runner.jpg'),
    colors: [
      { name: 'Cloud', hex: '#EDEDED' },
      { name: 'Cobalt', hex: '#2F5BD8' },
    ],
    sizes: APPAREL_SIZES,
    description:
      'Daily miles made easy. A compressed-foam midsole absorbs impact while the knit upper breathes through the warmest commutes.',
    features: [
      'Responsive foam midsole',
      'Breathable recycled knit upper',
      'Grippy all-surface outsole',
      'Only 240g per shoe',
    ],
  },
  {
    id: 'p5',
    name: 'Urban Court Sneaker',
    brand: 'Northpeak',
    category: 'footwear',
    price: 119,
    oldPrice: null,
    rating: 4.5,
    reviews: 764,
    badge: null,
    stock: 18,
    image: require('../../assets/products/sneaker.jpg'),
    colors: [
      { name: 'Ivory', hex: '#EFE7DA' },
      { name: 'Forest', hex: '#2C4A3B' },
    ],
    sizes: APPAREL_SIZES,
    description:
      'A low-profile court silhouette with a soft leather upper and a cushioned collar. Dresses up with chinos, dresses down with denim.',
    features: [
      'Full-grain leather upper',
      'Padded ankle collar',
      'Vulcanised rubber sole',
      'Unisex sizing',
    ],
  },
  {
    id: 'p6',
    name: 'Trail Ridge Boot',
    brand: 'Northpeak',
    category: 'footwear',
    price: 189,
    oldPrice: 229,
    rating: 4.6,
    reviews: 388,
    badge: 'Sale',
    stock: 6,
    image: require('../../assets/products/boot.jpg'),
    colors: [
      { name: 'Tobacco', hex: '#8A5A3B' },
      { name: 'Charcoal', hex: '#3B3B3B' },
    ],
    sizes: APPAREL_SIZES,
    description:
      'Built for wet mornings and loose gravel. A waterproof membrane keeps feet dry and the lugged outsole bites into any trail.',
    features: [
      'Waterproof membrane',
      'Oil-resistant lugging',
      'Reinforced toe cap',
      'Shock-absorbing heel',
    ],
  },
  {
    id: 'p7',
    name: 'Vertex Smartwatch',
    brand: 'Kairos',
    category: 'wearables',
    price: 279,
    oldPrice: 349,
    rating: 4.9,
    reviews: 1573,
    badge: 'Best seller',
    stock: 15,
    image: require('../../assets/products/smartwatch.jpg'),
    colors: [
      { name: 'Graphite', hex: '#2B2E33' },
      { name: 'Rose', hex: '#E4B4AE' },
    ],
    sizes: WATCH_SIZES,
    description:
      'Your training, sleep and stress on one always-on display. Ten-day battery, dual-band GPS and more than 120 workout modes.',
    features: [
      'AMOLED always-on display',
      '10-day battery life',
      'Dual-band GPS + heart rate',
      '5ATM water resistance',
    ],
  },
  {
    id: 'p8',
    name: 'Classic Chrono 38',
    brand: 'Kairos',
    category: 'wearables',
    price: 199,
    oldPrice: null,
    rating: 4.7,
    reviews: 512,
    badge: null,
    stock: 20,
    image: require('../../assets/products/chrono.jpg'),
    colors: [
      { name: 'Gold / Tan', hex: '#C7A46A' },
      { name: 'Steel / Black', hex: '#8E9298' },
    ],
    sizes: [],
    description:
      'A slim dress chronograph with a sapphire crystal and a genuine leather strap. Understated enough for the office, sharp enough for dinner.',
    features: [
      'Sapphire crystal glass',
      'Japanese quartz movement',
      'Genuine leather strap',
      '3ATM water resistance',
    ],
  },
  {
    id: 'p9',
    name: 'Fit Band Mini',
    brand: 'Kairos',
    category: 'wearables',
    price: 69,
    oldPrice: 89,
    rating: 4.3,
    reviews: 923,
    badge: 'Sale',
    stock: 40,
    image: require('../../assets/products/fitband.jpg'),
    colors: [
      { name: 'Coral', hex: '#F27B6C' },
      { name: 'Onyx', hex: '#24262B' },
    ],
    sizes: [],
    description:
      'The essentials, done well. Steps, sleep, heart rate and notifications on a bright colour display that lasts two weeks.',
    features: [
      '14-day battery',
      'Sleep and SpO2 tracking',
      'Smart notifications',
      'Interchangeable straps',
    ],
  },
  {
    id: 'p10',
    name: 'Nomad Canvas Backpack',
    brand: 'Roam Supply',
    category: 'accessories',
    price: 109,
    oldPrice: 139,
    rating: 4.6,
    reviews: 640,
    badge: 'New',
    stock: 22,
    image: require('../../assets/products/backpack.jpg'),
    colors: [
      { name: 'Olive', hex: '#6C7353' },
      { name: 'Ink', hex: '#2A2E38' },
    ],
    sizes: [],
    description:
      'A 24L daypack with a padded laptop sleeve, water-bottle pockets and a waxed canvas shell that ages beautifully.',
    features: [
      'Fits a 16" laptop',
      'Water-resistant waxed canvas',
      'Hidden anti-theft pocket',
      'Lifetime repairs',
    ],
  },
  {
    id: 'p11',
    name: 'Halo Sunglasses',
    brand: 'Roam Supply',
    category: 'accessories',
    price: 79,
    oldPrice: null,
    rating: 4.4,
    reviews: 287,
    badge: null,
    stock: 35,
    image: require('../../assets/products/sunglasses.jpg'),
    colors: [
      { name: 'Amber', hex: '#B98246' },
      { name: 'Black', hex: '#1D1D1D' },
    ],
    sizes: [],
    description:
      'Rounded acetate frames with polarised lenses that cut glare without dulling colour. Comes with a hard case and cloth.',
    features: [
      'Polarised UV400 lenses',
      'Hand-polished acetate frame',
      'Spring hinges',
      'Hard case included',
    ],
  },
  {
    id: 'p12',
    name: 'Carry Crossbody Bag',
    brand: 'Roam Supply',
    category: 'accessories',
    price: 89,
    oldPrice: 119,
    rating: 4.5,
    reviews: 401,
    badge: 'Sale',
    stock: 16,
    image: require('../../assets/products/crossbody.jpg'),
    colors: [
      { name: 'Mocha', hex: '#7A5A45' },
      { name: 'Cream', hex: '#E8DFD1' },
    ],
    sizes: [],
    description:
      'Compact, structured and hands-free. Fits a phone, cardholder and keys with a little room to spare.',
    features: [
      'Adjustable webbing strap',
      'Magnetic flap closure',
      'Vegan leather body',
      'Interior card slots',
    ],
  },
];

export const featuredProduct = products[0];

export function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

export function getCategory(id) {
  return categories.find((category) => category.id === id);
}

export function getProduct(id) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return products;
  return products.filter((product) => product.category === categoryId);
}

export function searchProducts(query) {
  const term = (query || '').trim().toLowerCase();
  if (!term) return products;
  return products.filter((product) =>
    `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(term),
  );
}

export function getRelatedProducts(product, limit = 6) {
  if (!product) return products.slice(0, limit);
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const others = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const sortOptions = [
  { id: 'popular', label: 'Popular' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'rating', label: 'Top rated' },
];

export function sortProducts(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted.sort((a, b) => b.reviews - a.reviews);
  }
}

export const coupons = {
  SAVE10: { code: 'SAVE10', type: 'percent', value: 0.1, label: '10% off your order' },
  WELCOME15: { code: 'WELCOME15', type: 'percent', value: 0.15, label: '15% off your order' },
  FREESHIP: { code: 'FREESHIP', type: 'shipping', value: 0, label: 'Free express shipping' },
};
