# Fashion Store

A full-stack fashion e-commerce website built with **Next.js, TypeScript, React, and Supabase**.

## Features

### Customer
- Fashion storefront and featured products
- Product detail pages
- Add to Cart
- Quantity increase/decrease
- Remove items from cart
- Cart total calculation
- Checkout form
- Delivery area selection
- Payment method selection
- Order confirmation
- WhatsApp order notification
- Order ID generation
- Order tracking

### Admin
- Admin login
- Order dashboard
- Order statistics
- Customer and order details
- Order status updates
- Refresh orders
- Logout

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Supabase
- PostgreSQL via Supabase
- CSS
- WhatsApp `wa.me` order notification

## Project Structure

```text
fashion-store/
├── app/
│   ├── admin/
│   ├── admin-login/
│   ├── cart/
│   ├── checkout/
│   ├── components/
│   ├── context/
│   ├── product/
│   ├── track-order/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabase.ts
├── public/
│   └── products/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jubayerakash1/Fashion-store.git
cd Fashion-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root using `.env.example` as a reference.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_WHATSAPP_ORDER_NUMBER=your_whatsapp_number
NEXT_PUBLIC_DEMO_ADMIN_USERNAME=your_demo_admin_username
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=your_demo_admin_password
```

Never commit `.env.local` or real credentials.

### 4. Start development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase

The checkout flow uses an `orders` table with fields equivalent to:

```text
id
order_id
customer_name
phone
delivery_area
address
payment_method
items
subtotal
delivery_charge
total
status
created_at
```

The `items` field stores ordered products as JSON/JSONB.

## Development Commands

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Security Note

The current admin authentication is intended for development/portfolio demonstration. Before production deployment, replace the demo authentication flow with a production-grade solution such as Supabase Auth, server-side sessions, secure cookies, and appropriate database authorization policies.

## Project Status

### Completed
- Storefront
- Product details
- Cart system
- Quantity management
- Checkout
- Supabase order insertion
- WhatsApp order notification
- Order tracking
- Admin login flow
- Admin dashboard
- Order status management

### Planned
- Admin product management
- Product database
- Product image upload
- Inventory management
- Search and filtering
- Production-grade authentication
- Payment gateway integration

## License

This project is licensed under the **MIT License**. See the `LICENSE` file in the repository.
