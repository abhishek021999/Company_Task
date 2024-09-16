# E-Commerce Command-Line Application

## Overview

Welcome to the E-Commerce Command-Line Application! This simple command-line tool allows you to manage a shopping cart, apply discounts, and view totals in different currencies. It is built using Node.js and is perfect for understanding basic cart operations, discounts, and currency conversion.

## Features

- **Manage Products**: Add products to the cart, remove them, and view cart details.
- **Discounts**: Apply predefined discounts based on product categories.
- **Currency Conversion**: View the final total in different currencies.
- **Command-Line Interface**: Interact with the application via terminal commands.

## Files

- **`app.js`**: The main script to run the application.
- **`product.js`**: Defines the `Product` class.
- **`cartItem.js`**: Defines the `CartItem` class.
- **`cart.js`**: Defines the `Cart` class.
- **`discount.js`**: Defines the `Discount` class.
- **`currency.js`**: Defines the `CurrencyConverter` class.

## Getting Started

### Prerequisites

1. **Node.js**: Make sure you have Node.js installed on your computer. 

### Running the Application

1. **Start the Application**

   Run the application using Node.js by executing:

   ```bash
   node index.js

2. **Use the Commands to work on application**
 **You can interact with the application using the following commands:**
         1. help : Show the help menu with all available commands,
         2. add_to_cart <productId> <quantity>: Add a product to the cart,
         3. remove_from_cart <productId> <quantity>: Remove a product or reduce its quantity in the cart.
         4. view_cart: View all items in the cart along with their prices and total cost. 
         5. list_discounts: View all available discounts that can be applied to your cart.
         6. checkout: Checkout, apply discounts, and view the total in different currencies.
         7. exit: Exit the application