# Route-Based Application Structure

The application has been restructured to use React Router with separate page components.

## 📁 File Structure

```
Frontend/src/
├── App.jsx                 # Main router configuration
├── App.css                 # Global styles
├── pages/                  # Page components
│   ├── Items.jsx          # Home page - Products listing
│   ├── Cart.jsx           # Cart page - Shopping cart
│   ├── Checkout.jsx       # Checkout page - Order form
│   └── Receipt.jsx        # Receipt page - Order confirmation
├── components/            # Reusable components
│   ├── Header.jsx         # Header with cart button
│   ├── ProductsGrid.jsx   # Products grid display
│   ├── CartView.jsx       # Cart items display
│   ├── CheckoutForm.jsx   # Checkout form
│   ├── Loading.jsx        # Loading state
│   └── Error.jsx          # Error state
└── services/              # API services
    └── api.js             # API functions
```

## 🛣️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Items.jsx` | Home page with products listing |
| `/cart` | `Cart.jsx` | Shopping cart page |
| `/checkout` | `Checkout.jsx` | Checkout form page |
| `/receipt` | `Receipt.jsx` | Order receipt page |

## 📄 Page Components

### 1. Items.jsx (`/`)
- **Purpose**: Home page showing all products
- **Features**:
  - Header with cart button
  - Products grid
  - Add to cart functionality
  - Loading and error states
- **Navigation**: 
  - Click cart button → `/cart`

### 2. Cart.jsx (`/cart`)
- **Purpose**: Shopping cart management
- **Features**:
  - Header with cart button
  - Cart items display
  - Quantity update controls
  - Remove item functionality
  - Proceed to checkout button
- **Navigation**:
  - Back button → `/`
  - Checkout button → `/checkout`

### 3. Checkout.jsx (`/checkout`)
- **Purpose**: Customer information and order submission
- **Features**:
  - Header with cart button
  - Order summary
  - Customer name and email form
  - Form validation
- **Navigation**:
  - Back button → `/cart`
  - Submit → `/receipt` (with receipt data)

### 4. Receipt.jsx (`/receipt`)
- **Purpose**: Order confirmation and receipt display
- **Features**:
  - Header with cart button
  - Order details
  - Customer information
  - Itemized receipt
  - Total amount
- **Navigation**:
  - Continue shopping → `/`
  - Redirects to `/` if no receipt data

## 🔄 Navigation Flow

```
Items (/)
  ↓ (Add to cart)
  ↓ (Click cart button)
Cart (/cart)
  ↓ (Proceed to checkout)
Checkout (/checkout)
  ↓ (Submit form)
Receipt (/receipt)
  ↓ (Continue shopping)
Items (/)
```

## ✅ Changes Made

1. **Created 4 page components** in `pages/` directory
2. **Updated App.jsx** to use React Router
3. **Deleted ReceiptModal.jsx** (replaced with Receipt page)
4. **Added receipt page styles** to App.css
5. **Each page includes Header** for consistent navigation

## 🎯 Benefits

- **Clear route structure** - Each page has its own route
- **Better navigation** - Browser back/forward buttons work
- **Shareable URLs** - Each page has a unique URL
- **Separation of concerns** - Each page manages its own state
- **Consistent header** - Header appears on all pages

## 🚀 Usage

The application now uses standard React Router navigation:
- `navigate('/cart')` - Navigate to cart
- `navigate('/checkout')` - Navigate to checkout
- `navigate('/receipt', { state: { receipt } })` - Navigate with data
- `navigate('/')` - Navigate to home

All pages are connected through the router in `App.jsx`.

