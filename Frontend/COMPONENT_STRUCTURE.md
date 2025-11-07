# Frontend Component Structure

The frontend has been refactored into a modular structure with separate component files for better organization and maintainability.

## 📁 File Structure

```
Frontend/src/
├── App.jsx                 # Main application component (state management & routing)
├── App.css                 # Global styles
├── main.jsx               # React entry point
├── index.css              # Base styles
├── components/            # React components
│   ├── Header.jsx         # Header component with cart button
│   ├── ProductsGrid.jsx   # Products listing grid
│   ├── CartView.jsx       # Shopping cart view
│   ├── CheckoutForm.jsx   # Checkout form with validation
│   ├── ReceiptModal.jsx   # Order receipt modal
│   ├── Loading.jsx        # Loading state component
│   └── Error.jsx          # Error state component
└── services/              # API service functions
    └── api.js             # All API calls centralized
```

## 🧩 Component Breakdown

### App.jsx
- **Purpose**: Main application component
- **Responsibilities**:
  - State management (products, cart, UI states)
  - API calls coordination
  - Route/navigation logic
  - Component orchestration

### Header.jsx
- **Purpose**: Application header
- **Props**: 
  - `cartItemCount` - Number of items in cart
  - `onCartClick` - Handler for cart button click
- **Features**: Cart button with item count

### ProductsGrid.jsx
- **Purpose**: Display products in a grid
- **Props**:
  - `products` - Array of product objects
  - `onAddToCart` - Handler for add to cart action
- **Features**: Product cards with images, prices, and add to cart buttons

### CartView.jsx
- **Purpose**: Display and manage shopping cart
- **Props**:
  - `cart` - Cart object with items and total
  - `onRemove` - Handler for removing items
  - `onUpdateQuantity` - Handler for updating quantities
  - `onCheckout` - Handler for proceeding to checkout
  - `onBack` - Handler for going back to products
- **Features**: 
  - Empty cart state
  - Quantity controls
  - Item removal
  - Total calculation display

### CheckoutForm.jsx
- **Purpose**: Customer information form for checkout
- **Props**:
  - `cart` - Cart object with items and total
  - `onCheckout` - Handler for submitting checkout
  - `onBack` - Handler for going back to cart
- **Features**:
  - Form validation (name, email)
  - Order summary
  - Error messages

### ReceiptModal.jsx
- **Purpose**: Display order confirmation receipt
- **Props**:
  - `receipt` - Receipt object with order details
  - `onClose` - Handler for closing modal
- **Features**:
  - Order ID display
  - Customer information
  - Itemized receipt
  - Total amount
  - Timestamp formatting

### Loading.jsx
- **Purpose**: Loading state indicator
- **Props**:
  - `message` - Loading message (optional, defaults to "Loading...")

### Error.jsx
- **Purpose**: Error state display
- **Props**:
  - `message` - Error message
  - `onRetry` - Retry handler (optional)

## 🔧 Services

### api.js
Centralized API service functions:
- `getProducts()` - Fetch all products
- `getCart()` - Fetch cart items
- `addToCart(productId, qty)` - Add item to cart
- `updateCartItem(itemId, qty)` - Update cart item quantity
- `removeFromCart(itemId)` - Remove item from cart
- `processCheckout(cartItems, customerName, customerEmail)` - Process checkout

## ✅ Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused
3. **Maintainability**: Easier to find and fix bugs
4. **Testability**: Components can be tested in isolation
5. **Scalability**: Easy to add new features or components
6. **Separation of Concerns**: UI logic separated from API calls

## 🎯 Usage Example

```jsx
// App.jsx imports components
import Header from './components/Header';
import ProductsGrid from './components/ProductsGrid';
import CartView from './components/CartView';

// Uses them in render
<Header cartItemCount={cart.itemCount} onCartClick={handleCartToggle} />
<ProductsGrid products={products} onAddToCart={handleAddToCart} />
<CartView cart={cart} onRemove={handleRemoveFromCart} />
```

## 📝 Notes

- All API calls are centralized in `services/api.js`
- Components receive data and callbacks via props (unidirectional data flow)
- State management is handled in `App.jsx`
- Styles are in `App.css` with component-specific classes
- Error handling is implemented at both component and service levels

