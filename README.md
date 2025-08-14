# Shopping Cart Application

![Shopping Cart Demo]
<img src="./preview2 (2).png"> *(Optional: Add a screenshot or GIF later)*

A simple, client-side shopping cart application built with HTML, CSS, and JavaScript. Products are stored in the browser's localStorage.

## Features

- 📦 Add products with name, price, and quantity
- 🔢 Adjust quantities with +/- buttons
- 🗑️ Delete individual products
- 🧹 Clear entire cart with one click
- 💾 Automatic save to browser's localStorage
- 📱 Responsive design

## How to Use

1. **Add a Product**:
   - Enter product name
   - Enter price (numbers only)
   - Set quantity (default: 1)
   - Click "Add Product" or press Enter

2. **Manage Products**:
   - Increase/decrease quantity with +/- buttons
   - Delete items with the Delete button
   - Clear all items with "Clear All"

## Technical Details

- **Storage**: Uses `localStorage` to persist cart between sessions
- **Validation**:
  - Requires product name
  - Validates price is positive number
  - Ensures quantity is ≥1
- **Duplicate Handling**: Asks to update quantity if product already exists


## Future Improvements

- [ ] Add product categories
- [ ] Implement checkout functionality
- [ ] Add user accounts
- [ ] Support for product images

## Installation

No installation required! Just open `index.html` in any modern browser.

## Contributing

Contributions are welcome! Please open an issue or pull request for any improvements.

---

*Built with vanilla JavaScript - no frameworks or libraries required*