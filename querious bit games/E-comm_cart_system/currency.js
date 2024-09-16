// Define the CurrencyConverter class to handle currency conversion
class CurrencyConverter {
    // Constructor initializes the conversion rates for supported currencies
    constructor() {
        // Store conversion rates relative to USD (base currency)
        this.conversionRates = {
            'EUR': 0.85, // 1 USD = 0.85 EUR
            'GBP': 0.75  // 1 USD = 0.75 GBP
        };
    }

    // Method to convert a total amount to a different currency
    convert(total, currency) {
        // Check if the requested currency is supported
        if (this.conversionRates[currency]) {
            // Calculate the converted total using the conversion rate
            let convertedTotal = total * this.conversionRates[currency];
            // Display the converted total, rounded to two decimal places
            console.log(`Final Total in ${currency}: ${convertedTotal.toFixed(2)}`);
        } else {
            // If the currency is not supported, show an error message
            console.log(`Currency ${currency} not supported.`);
        }
    }
}


module.exports = CurrencyConverter;
