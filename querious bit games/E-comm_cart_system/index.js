// Import the 'readline' module to handle user input from the command line
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Import custom modules for handling cart, currency conversion, discounts, and product management
const Cart = require('./cart');
const CurrencyConverter = require('./currency');
const Discount = require('./discount');
const Product = require('./product');

// Create a list of available products
const products = {
    'P001': new Product('P001', 'Laptop', 1000.00, 'Electronics'),
    'P002': new Product('P002', 'Phone', 500.00, 'Electronics'),
    'P003': new Product('P003', 'T-Shirt', 20.00, 'Fashion')
};

// Instantiate classes for cart, discount system, and currency converter
const cart = new Cart();
const discountSystem = new Discount();
const currencyConverter = new CurrencyConverter();

// Function to prompt the user and wait for their input
function askQuestion(query) {
    return new Promise(resolve => readline.question(query, resolve));
}

// Function to display available commands and their descriptions
function showHelp() {
    console.log(`
Available Commands:
1. add_to_cart <productId> <quantity>  - Add a product to the cart.
2. remove_from_cart <productId> <quantity> - Remove a product or reduce its quantity from the cart.
3. view_cart - View all items in the cart along with their prices and total cost.
4. list_discounts - View all available discounts that can be applied to your cart.
5. checkout - Checkout and apply discounts, with the option to view the total in different currencies.
6. help - Show this help menu with all available commands.
7. exit - Exit the application.
    `);
}

// Main application loop to handle user commands
async function appLoop() {
    while (true) {
        // Prompt the user to enter a command
        let command = await askQuestion("Enter command: ");
        let parts = command.split(' ');

        // Handle different commands based on user input
        switch (parts[0]) {
            case 'add_to_cart':
                let productId = parts[1]; // Get the product ID from the command
                let quantity = parseInt(parts[2], 10); // Get the quantity from the command
                // Check if the product exists
                if (products[productId]) {
                    // Add the product to the cart
                    cart.addToCart(products[productId], quantity);
                    console.log(`Added ${quantity} of ${products[productId].name} to the cart.`);
                } else {
                    console.log("Product not found.");
                }
                break;

            case 'remove_from_cart':
                productId = parts[1]; // Get the product ID from the command
                quantity = parseInt(parts[2], 10); // Get the quantity from the command
                // Remove the product from the cart
                cart.removeFromCart(productId, quantity);
                console.log(`Removed ${quantity} of ${productId} from the cart.`);
                break;

            case 'view_cart':
                // Display the current contents of the cart
                cart.viewCart();
                break;

            case 'list_discounts':
                // List all available discounts
                discountSystem.listDiscounts();
                break;

            case 'checkout':
                // Apply discounts and display the final total
                let finalTotal = discountSystem.applyDiscounts(cart);
                // Ask if the user wants to view the total in a different currency
                let convert = await askQuestion("Would you like to view it in a different currency? (yes/no): ");
                if (convert.toLowerCase() === 'yes') {
                    let currency = await askQuestion("Enter currency (EUR, GBP): ");
                    // Convert the total to the specified currency
                    currencyConverter.convert(finalTotal, currency);
                }
                // Close the readline interface and exit the loop
                readline.close();
                return;

            case 'help':
                // Show the help menu with available commands
                showHelp();
                break;

            case 'exit':
                // Exit the application
                console.log("Exiting application...");
                readline.close();
                return;

            default:
                // Inform the user about an unknown command and suggest using 'help'
                console.log("Unknown command. Type 'help' to see available commands.");
        }
    }
}

// Start the application loop
appLoop();
