export const config = {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'your_actual_stripe_secret_key_here',
    paytmMerchantId: "YOUR_MERCHANT_ID",
    paytmMerchantKey: "YOUR_MERCHANT_KEY",
    paytmWebsite: "WEBSTAGING",  // Use "DEFAULT" for production
    paytmEnvironment: "staging" // Use "production" for production
};
