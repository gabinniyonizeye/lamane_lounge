# Homepage & Hero Section - Setup Guide

## Components Created

### Layout Components
- **Navigation.vue** - Sticky navigation with logo, menu, search, cart, and user dropdown
- **HeroSection.vue** - Full-screen hero with parallax effect and CTAs
- **Footer.vue** - Footer with contact info, links, and newsletter signup

### Section Components
- **FeaturedProducts.vue** - Displays 8 featured products from database
- **TodaysSpecials.vue** - Shows special offers with countdown timer
- **StatsSection.vue** - Displays company stats (years, customers, products sold)

### UI Components
- **ProductCard.vue** - Reusable product card with image, rating, price, and add to cart

### Pages
- **Home.vue** - Main homepage combining all sections
- Placeholder pages for Shop, CustomCake, Specials, About, Contact, Login, Register, Cart, Account, Orders

## Features Implemented

### Hero Section
✅ High-quality background image with overlay
✅ Slogan: "Freshly Baked Every Day. Brewed to Perfection."
✅ Two CTAs: "🛒 Order Now" and "📍 Visit Our Store"
✅ Parallax scrolling effect
✅ Smooth animations

### Navigation
✅ Logo with branding
✅ Menu links: Home, Shop, Custom Cake, Specials, About, Contact
✅ Search bar (desktop)
✅ Cart icon with item count badge
✅ User dropdown (Login/Register or My Account/Logout)
✅ Mobile responsive menu

### Featured Products
✅ Fetches products from MongoDB
✅ Displays 8 items with image, name, price, rating
✅ "View All Products" button
✅ Loading state

### Today's Specials
✅ Countdown timer (24 hours)
✅ Discount badges
✅ Special offers (e.g., "Buy 2 Croissants, Get 1 Free")
✅ More offers section

### Stats Section
✅ Years of experience (15+)
✅ Happy customers (50K+)
✅ Products sold (500K+)

### Footer
✅ Contact information (email, phone, address)
✅ Quick links
✅ Social media links
✅ Newsletter signup
✅ Privacy/Terms links

## Styling

### Tailwind CSS Configuration
- Custom colors: primary (#8B4513), secondary (#D2691E), accent (#FFD700), dark (#2C1810)
- Custom animations: fade-in, slide-up, pulse-slow
- Responsive design with mobile-first approach
- Custom utility classes: btn-primary, btn-secondary, btn-outline, section-title, card

## Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Servers
```bash
# Both frontend and backend
npm run dev:all

# Or separately:
npm run dev          # Frontend on http://localhost:5173
npm run dev:server   # Backend on http://localhost:5000
```

### 3. Ensure MongoDB is Running
Make sure MongoDB is running locally on port 27017

## File Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navigation.vue
│   │   ├── HeroSection.vue
│   │   └── Footer.vue
│   ├── sections/
│   │   ├── FeaturedProducts.vue
│   │   ├── TodaysSpecials.vue
│   │   └── StatsSection.vue
│   └── ui/
│       └── ProductCard.vue
├── pages/
│   ├── Home.vue
│   ├── Shop.vue
│   ├── CustomCake.vue
│   ├── Specials.vue
│   ├── About.vue
│   ├── Contact.vue
│   ├── Login.vue
│   ├── Register.vue
│   ├── Cart.vue
│   ├── Account.vue
│   └── Orders.vue
├── router/
│   └── index.js
├── stores/
│   ├── auth.js
│   └── products.js
├── utils/
│   └── api.js
├── App.vue
├── main.js
└── style.css
```

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Navigation adapts for mobile with hamburger menu
- All sections stack properly on smaller screens

### Performance
- Lazy loading of route components
- Image optimization with placeholder
- Efficient state management with Pinia
- Axios interceptors for API calls

### User Experience
- Smooth animations and transitions
- Loading states for async operations
- Countdown timer updates every second
- Parallax scrolling effect
- Hover effects on interactive elements

## Next Steps

1. Implement Login/Register pages with form validation
2. Build Shopping Cart functionality
3. Create Product Detail page
4. Implement Order checkout flow
5. Add Admin Dashboard
6. Set up payment integration
7. Add image upload for products
8. Implement search functionality
9. Add product filtering and sorting
10. Create user review system

## API Integration

The frontend is already configured to communicate with the backend:
- Base URL: `http://localhost:5000/api`
- Axios interceptor automatically adds JWT token to requests
- Auth store manages user authentication state
- Products store fetches and manages product data

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: '#8B4513',      // Brown
  secondary: '#D2691E',    // Chocolate
  accent: '#FFD700',       // Gold
  dark: '#2C1810',         // Dark Brown
}
```

### Animations
Add or modify animations in `tailwind.config.js` keyframes section

### Content
Update text, images, and links directly in component files
