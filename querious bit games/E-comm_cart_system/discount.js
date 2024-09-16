// Define the Discount class to manage available discounts and apply them to a shopping cart
class Discount {
    // Constructor initializes the available discount types
    constructor() {
        // Store available discounts as methods inside an object with descriptions
        this.availableDiscounts = {
            'Buy 1 Get 1 Free on Fashion items': this.buyOneGetOneFree,
            '10% Off on Electronics': this.tenPercentOff
        };
    }

    // Method to display a list of all available discounts
    listDiscounts() {
        console.log("Available Discounts:");
        // Loop through the available discounts and print their names
        for (let discount in this.availableDiscounts) {
            console.log(discount);
        }
    }

    // Method to apply all applicable discounts to the cart
    applyDiscounts(cart) {
        let totalDiscount = 0;  // Initialize total discount to 0
        let total = cart.viewCart();  // Get the cart's total price before discounts

        // Apply the 'Buy 1 Get 1 Free' discount and add the discount amount
        totalDiscount += this.buyOneGetOneFree(cart);

        // Apply the '10% Off on Electronics' discount and add the discount amount
        totalDiscount += this.tenPercentOff(cart);

        // Calculate the final total after applying all discounts
        let finalTotal = total - totalDiscount;

        // Print the final total after applying the discounts
        console.log(`Final Total after discounts: ${finalTotal.toFixed(2)} USD`);
        return finalTotal;  // Return the final total for further use
    }

    // Discount logic for 'Buy 1 Get 1 Free' on fashion items
    buyOneGetOneFree(cart) {
        let discount = 0;  // Initialize discount amount to 0

        // Loop through each item in the cart
        for (let itemId in cart.items) {
            let item = cart.items[itemId];
            
            // Check if the item belongs to the 'Fashion' category
            if (item.product.category === "Fashion") {
                // Calculate the number of free items (one for every two items purchased)
                discount += Math.floor(item.quantity / 2) * item.product.price;
            }
        }
        return discount;  // Return the total discount for this rule
    }

    // Discount logic for '10% Off on Electronics'
    tenPercentOff(cart) {
        let discount = 0;  // Initialize discount amount to 0

        // Loop through each item in the cart
        for (let itemId in cart.items) {
            let item = cart.items[itemId];

            // Check if the item belongs to the 'Electronics' category
            if (item.product.category === "Electronics") {
                // Calculate 10% discount on the total price of the electronic item
                discount += item.totalPrice() * 0.10;
            }
        }
        return discount;  // Return the total discount for this rule
    }
}


module.exports = Discount;
