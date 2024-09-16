// Define the CartItem class to represent an item in the cart
class CartItem {
    // The constructor takes a product and its quantity as input
    constructor(product, quantity) {
        this.product = product; // Store the product details (name, price, etc.)
        this.quantity = quantity; // Store the quantity of the product in the cart
    }

    // Method to calculate the total price for this cart item
    totalPrice() {
        // Total price is the product's price multiplied by the quantity
        return this.product.price * this.quantity;
    }
}

module.exports = CartItem;
