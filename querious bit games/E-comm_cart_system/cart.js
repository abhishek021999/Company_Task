// Import the CartItem class to represent individual items in the cart
const CartItem = require("./cartItem");

// Define the Cart class to manage the shopping cart
class Cart {
    constructor() {
        // The items object will store CartItem instances, where each key is a productId
        this.items = {};
    }

    // Method to add a product to the cart
    addToCart(product, quantity) {
        // If the product is already in the cart, just increase the quantity
        if (this.items[product.productId]) {
            this.items[product.productId].quantity += quantity;
        } else {
            // If the product is not in the cart, create a new CartItem and add it
            this.items[product.productId] = new CartItem(product, quantity);
        }
    }

    // Method to remove a product from the cart
    removeFromCart(productId, quantity = null) {
        // Check if the product is in the cart
        if (this.items[productId]) {
            // If no quantity is specified or the quantity is less than or equal to the existing amount,
            // remove the product from the cart entirely
            if (quantity === null || this.items[productId].quantity <= quantity) {
                delete this.items[productId];
            } else {
                // Otherwise, decrease the quantity by the specified amount
                this.items[productId].quantity -= quantity;
            }
        }
    }

    // Method to display the cart's contents and calculate the total price
    viewCart() {
        let total = 0; // Variable to keep track of the total price

        console.log("Your Cart:");

        // Loop through each item in the cart
        for (let itemId in this.items) {
            let item = this.items[itemId]; // Get the current CartItem
            let itemTotal = item.totalPrice(); // Calculate the total price for this item
            total += itemTotal; // Add the item's total price to the overall total

            // Print out the details for this item (name, quantity, individual price, and total price)
            console.log(`${item.product.name} - Quantity: ${item.quantity}, Price: ${item.product.price.toFixed(2)} USD, Total: ${itemTotal.toFixed(2)} USD`);
        }

        // After listing all items, print the total cost before any discounts
        console.log(`Total (before discounts): ${total.toFixed(2)} USD`);

        // Return the total price for further use, such as in the checkout process
        return total;
    }
}


module.exports = Cart;
