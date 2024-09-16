// Define the Product class to represent a product in the store
class Product {
    // Constructor initializes a product with its ID, name, price, and category
    constructor(productId, name, price, category) {
        this.productId = productId; // Unique identifier for the product
        this.name = name;           // Name of the product
        this.price = price;         // Price of the product in USD
        this.category = category;   // Category to which the product belongs (e.g., Electronics, Fashion)
    }
}


module.exports = Product;
