# Marketplace - Multi-Seller E-Commerce Platform

A production-ready, mobile-first marketplace application built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui. Features include product browsing, advanced filtering, real-time chat with sellers, and mock authentication.

![Marketplace](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop)

## Features

### Buyer Features
- **🔍 Advanced Search** - Real-time product search with autocomplete
- **📂 Category Browsing** - Organized product categories with icon navigation
- **🎛️ Smart Filters** - Price range sliders, brand/model dropdowns with dependency
- **💬 Chat System** - Direct messaging with sellers for negotiations
- **🔐 Authentication** - Mock login system with persistent sessions
- **📱 Responsive Design** - Mobile-first, works on all screen sizes
- **🎨 Modern UI** - Clean, minimal design with blue primary theme

### Seller Features
- **📊 Dashboard Overview** - Stats cards showing total products, revenue, low stock alerts
- **📦 Product Management** - Full CRUD operations (Create, Read, Update, Delete)
- **📝 Product Form** - Comprehensive form with validation for all product details
- **📉 Stock Management** - Real-time stock tracking with low stock warnings
- **⚙️ Profile Settings** - Update seller info, store name, and view store metrics
- **🔔 Smart Alerts** - Automatic notifications for products running low on stock
- **🎯 Role-Based Access** - Separate dashboard accessible only to seller accounts

### Technical Features
- **⚡ Next.js 15 App Router** - Latest Next.js with server components
- **🎯 TypeScript** - Full type safety throughout the application
- **🎨 Tailwind CSS** - Utility-first CSS with custom theme
- **🧩 shadcn/ui** - Beautiful, accessible UI components
- **💾 Zustand** - Lightweight state management for auth
- **🔗 Shareable URLs** - Filter state persisted in query parameters
- **♿ Accessibility** - ARIA labels, keyboard navigation, semantic HTML

## Project Structure

```
hometech/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Home page (search, categories, products)
│   │   ├── layout.tsx                # Root layout with metadata
│   │   ├── products/
│   │   │   ├── page.tsx              # Products list with filters
│   │   │   └── [id]/page.tsx         # Product detail page
│   │   ├── login/page.tsx            # Login page
│   │   ├── chat/[conversationId]/    # Chat page
│   │   └── api/                      # API routes
│   │       ├── products/route.ts     # Products API
│   │       ├── categories/route.ts   # Categories API
│   │       └── conversations/route.ts # Chat API
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── avatar.tsx
│   │   │   └── dialog.tsx
│   │   └── marketplace/              # Custom marketplace components
│   │       ├── product-card.tsx      # Product card with seller info
│   │       ├── category-item.tsx     # Category icon grid item
│   │       ├── search-bar.tsx        # Search input with clear
│   │       ├── filter-panel.tsx      # Sidebar filter controls
│   │       ├── rating-stars.tsx      # Star rating display
│   │       └── chat-bubble.tsx       # Chat message bubble
│   ├── data/                         # Dummy data files
│   │   ├── products.ts               # 20 sample products
│   │   ├── categories.ts             # 8 categories
│   │   ├── sellers.ts                # 5 verified sellers
│   │   └── conversations.ts          # Sample chat data
│   ├── store/
│   │   └── auth-store.ts             # Zustand auth store
│   ├── lib/
│   │   ├── types.ts                  # TypeScript interfaces
│   │   └── utils.ts                  # Utility functions
│   └── styles/
│       └── globals.css               # Global styles & theme
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies

```

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone or download the project**
   ```bash
   cd hometech
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Demo Credentials

### Buyer Accounts
To test buyer features (shopping, chat):

- **Email:** `demo@marketplace.com`
- **Password:** `password123`

Alternative buyer:
- **Email:** `john@example.com`
- **Password:** `john123`

### Seller Accounts
To test seller dashboard (product management, settings):

- **Email:** `seller@marketplace.com`
- **Password:** `seller123`
- **Store:** TechHub Store

Alternative seller:
- **Email:** `seller2@marketplace.com`
- **Password:** `seller123`
- **Store:** Global Electronics

## Theme Customization

The marketplace uses a blue primary color scheme. To change the theme:

### Option 1: CSS Variables (Recommended)

Edit [src/styles/globals.css](src/styles/globals.css):

```css
@layer base {
  :root {
    /* Change the primary color (currently blue) */
    --primary: 217 91% 60%;           /* HSL format: Hue Saturation Lightness */
    --primary-foreground: 0 0% 100%;

    /* Border radius for rounded corners */
    --radius: 0.75rem;                /* Change to 0.5rem for less rounded */
  }
}
```

**Color Examples:**
- Blue (current): `217 91% 60%`
- Red: `0 84% 60%`
- Green: `142 76% 36%`
- Purple: `271 91% 65%`
- Orange: `25 95% 53%`

### Option 2: Tailwind Config

Edit [tailwind.config.ts](tailwind.config.ts) for additional customization.

## API Routes

All API routes return JSON and are located in `/app/api/`:

- `GET /api/products` - List products with optional filters
  - Query params: `q`, `categoryId`, `brand`, `model`, `priceMin`, `priceMax`

- `GET /api/products/:id` - Get single product with seller info

- `GET /api/categories` - List all categories

- `GET /api/conversations` - List user conversations
  - Query params: `userId`

- `GET /api/conversations/:id` - Get conversation with messages

## Key Components

### ProductCard
Displays product image, title, price, rating, seller info, and chat CTA.
```tsx
<ProductCard product={product} seller={seller} />
```

### FilterPanel
Price slider, brand dropdown, and model dropdown (dependent on brand).
```tsx
<FilterPanel filters={filters} onFilterChange={setFilters} />
```

### SearchBar
Real-time search input with clear button.
```tsx
<SearchBar value={query} onChange={setQuery} />
```

### ChatBubble
Message bubble with timestamp, aligned by sender type.
```tsx
<ChatBubble message={message} />
```

## Seller Dashboard

The seller dashboard is a complete product management system accessible at `/seller` for authenticated seller accounts.

### Dashboard Pages:

1. **Overview (`/seller`)** - Main dashboard with:
   - Total products, revenue, low stock stats
   - Low stock alert cards
   - Recent products list
   - Quick actions

2. **Products (`/seller/products`)** - Product management:
   - List all seller products
   - Search and filter products
   - Add new product button
   - Edit/Delete actions per product
   - Stock status indicators

3. **Add Product (`/seller/products/new`)** - Create new listings:
   - Basic information (title, description, brand, model)
   - Pricing & stock
   - Multiple image URLs
   - Shipping options
   - Category selection
   - Form validation

4. **Edit Product (`/seller/products/:id/edit`)** - Update existing products:
   - Pre-filled form with current data
   - Update any product field
   - Stock management
   - Delete product option

5. **Settings (`/seller/settings`)** - Profile management:
   - Update seller profile (name, email, avatar)
   - View store metrics (sales, rating, response rate)
   - Verified seller badge display

### Accessing the Seller Dashboard:

1. Sign in with a seller account (see Demo Credentials above)
2. Click your avatar in the navbar
3. Select "Seller Dashboard" from the dropdown
4. Or navigate directly to `/seller`

### Key Components:

- **StatCard** - Reusable statistics display with icons and trends
- **SidebarNav** - Dashboard navigation sidebar
- **PageHeader** - Consistent page headers with actions
- **ProductForm** - Comprehensive product creation/editing form

## Extending to a Real Backend

### Database (Prisma + PostgreSQL)

1. **Install Prisma**
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

2. **Initialize Prisma**
   ```bash
   npx prisma init
   ```

3. **Update schema**
   Use the types from [src/lib/types.ts](src/lib/types.ts) as reference for your Prisma schema:
   ```prisma
   model Product {
     id          String   @id @default(cuid())
     title       String
     description String
     price       Float
     currency    String   @default("USD")
     images      String[]
     rating      Float
     reviewCount Int
     categoryId  String
     brand       String
     model       String
     sellerId    String
     stock       Int
     createdAt   DateTime @default(now())

     category    Category @relation(fields: [categoryId], references: [id])
     seller      Seller   @relation(fields: [sellerId], references: [id])
   }
   ```

4. **Run migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Update API routes** to use Prisma Client instead of importing from `/data`

### Real-Time Chat (Pusher or Socket.io)

**Option 1: Pusher (Easiest)**

1. Sign up at [pusher.com](https://pusher.com)
2. Install SDK:
   ```bash
   npm install pusher pusher-js
   ```

3. Add server-side trigger in `/app/api/messages/route.ts`:
   ```typescript
   import Pusher from 'pusher'

   const pusher = new Pusher({
     appId: process.env.PUSHER_APP_ID!,
     key: process.env.PUSHER_KEY!,
     secret: process.env.PUSHER_SECRET!,
     cluster: process.env.PUSHER_CLUSTER!,
   })

   export async function POST(request: Request) {
     const message = await request.json()
     await pusher.trigger(`conversation-${message.conversationId}`, 'new-message', message)
     return NextResponse.json({ success: true })
   }
   ```

4. Subscribe client-side in chat page:
   ```typescript
   import Pusher from 'pusher-js'

   const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
   })

   const channel = pusher.subscribe(`conversation-${conversationId}`)
   channel.bind('new-message', (message) => {
     setMessages(prev => [...prev, message])
   })
   ```

**Option 2: Socket.io**

For self-hosted real-time, use Socket.io with a custom Next.js API route handler.

### Authentication (NextAuth.js)

Replace the mock auth in [src/store/auth-store.ts](src/store/auth-store.ts):

```bash
npm install next-auth
```

Create `/app/api/auth/[...nextauth]/route.ts` with providers (Google, Email, etc.).

## Design Decisions

1. **Client Components for Interactivity**
   - Home, Products, Chat pages use `"use client"` for filters, search, and real-time updates
   - Leverages React hooks for state management (useState, useMemo, useEffect)
   - Product detail page is client-side to enable dynamic image selection and chat redirect

2. **Zustand for Auth State**
   - Lightweight alternative to Redux/Context for auth
   - Persistent storage using localStorage middleware
   - Simple API: `const { user, login, logout } = useAuthStore()`

3. **URL Query Params for Filters**
   - Filters persist in URL (`?priceMin=100&brand=Apple`) for shareable links
   - `useSearchParams` + `router.replace` for shallow routing
   - No page refresh when filters change

4. **Accessibility First**
   - All interactive elements have `aria-label`
   - Semantic HTML (`<nav>`, `<main>`, `<section>`)
   - Keyboard navigation support (focus states on all buttons/links)
   - Screen reader friendly (loading states, error messages with `role="alert"`)

5. **Mobile-First Responsive**
   - Tailwind breakpoints: `sm:`, `md:`, `lg:`
   - Touch-friendly tap targets (min 44x44px)
   - Sheet component for mobile filters
   - Sticky chat input at bottom on mobile

6. **Tradeoffs**
   - **No SSR for filtered products** - Client-side filtering for simplicity; in production, use server components with Suspense
   - **Mock backend** - Real apps need database + API; current structure makes migration easy
   - **No image optimization config** - Using Unsplash URLs; in production, use Next.js `<Image>` with proper `remotePatterns` in `next.config.js`
   - **Simple chat** - No read receipts, typing indicators, or file uploads (add with Pusher/Socket.io)

## Testing

### Manual Testing Checklist

- [x] Home page loads with search and categories
- [x] Search filters products in real-time
- [x] Category click navigates to filtered products page
- [x] Price slider updates product list
- [x] Brand dropdown populates model dropdown
- [x] Product card "Chat with seller" requires login
- [x] Login form validates credentials
- [x] Chat page displays messages and allows sending
- [x] Mobile responsive (test with DevTools)

### Unit Testing (Optional)

To add Jest/Vitest for component testing:

```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

Example test for `ProductCard`:
```typescript
import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/marketplace/product-card'

test('displays product title and price', () => {
  const product = { id: '1', title: 'Test Product', price: 99.99, ... }
  render(<ProductCard product={product} />)

  expect(screen.getByText('Test Product')).toBeInTheDocument()
  expect(screen.getByText('$99.99')).toBeInTheDocument()
})
```

## Troubleshooting

### Build Errors

If you encounter peer dependency issues:
```bash
npm install --legacy-peer-deps
```

### Images Not Loading

Unsplash images require network access. For local development, replace image URLs in [src/data/products.ts](src/data/products.ts) with placeholder services like `https://placehold.co/600x600`.

### Fonts Not Loading

The app uses Geist fonts from Google Fonts. If fonts fail to load, check your network connection or replace with system fonts in [src/app/layout.tsx](src/app/layout.tsx).

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** lucide-react
- **State Management:** Zustand
- **Date Formatting:** date-fns
- **Linting:** ESLint + Prettier

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For questions or issues:
- Open a GitHub issue
- Check existing issues for solutions
- Review the code comments for implementation details

---

**Built with ❤️ using Next.js and TypeScript - By Afrisinc**
