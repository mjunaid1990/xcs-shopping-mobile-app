# xcs-shopping-mobile-app

A complete shopping app built with React Native (Expo SDK 58) and Expo Router.
Everything runs on local dummy data — no backend, no API keys.

## Features

- **Home** — greeting, search, promo banners, category shortcuts, best sellers, full product grid
- **Category / browse page** — category chips, sorting (popular, price, rating), responsive grid
- **Product detail** — image hero, colour + size pickers, quantity, highlights, related products, sticky add-to-cart bar
- **Cart** — quantity editing, remove, free-shipping progress, promo codes, live totals (subtotal, discount, shipping, 8% tax)
- **Checkout** — shipping form with inline validation, delivery method, payment method (card / cash on delivery / wallet), order summary
- **Success page** — animated confirmation, order number, delivery estimate, payment summary
- **Error page** — friendly failure state with retry, wired to a declined-card path
- **Global** — bottom tab navigation with cart badge, favourites toggle, add-to-cart toasts, empty states, custom 404

## Getting started

```bash
npm install
npx expo start          # then press a / i for a device, or w for the browser
```

Other useful commands:

```bash
npm run android
npm run ios             # macOS only
npm run web
npx expo lint
```

## Demo data

All catalogue content lives in `src/data/products.js` — 12 products across 4 categories,
with names, brands, prices, ratings, stock, colours, sizes and features. Replace that file
with an API response when you wire up a real backend.

### Test values

| What | Value |
| --- | --- |
| Coupons | `SAVE10` (10% off), `WELCOME15` (15% off), `FREESHIP` (free express shipping) |
| Free shipping | automatic over $149 |
| Card that declines | any 16-digit card starting with `0000` (e.g. `0000 0000 0000 0000`) |
| Working card | `4242 4242 4242 4242`, expiry `12/28`, CVV `123` |

## Project structure

```
src/
├─ app/                    # Expo Router routes
│  ├─ _layout.js           # providers, stack, toast host
│  ├─ (tabs)/              # home, categories, cart tabs
│  ├─ product/[id].js      # product detail
│  ├─ checkout.js
│  ├─ order-success.js
│  ├─ error.js
│  └─ +not-found.js
├─ components/             # buttons, fields, product card, stepper, rating, toast, header
├─ context/CartContext.js  # cart, favourites, coupon, delivery, totals, toasts
├─ data/products.js        # dummy catalogue + helpers
└─ theme.js                # colours, spacing, radii, shadows
assets/products/           # generated product photography
```

## Notes

- Prices are formatted as USD via `formatPrice` in `src/data/products.js`.
- Checkout is a simulation: `setTimeout` + local state, nothing is charged or sent anywhere.
- Cart contents live in memory, so a full reload starts with an empty cart.
