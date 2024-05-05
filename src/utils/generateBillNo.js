const usedBillingNumbers = new Set(); // Create a Set to store used billing numbers

export function generateBillingNumber() {
  const prefix = "PE";
  let randomDigits;
  let billingNumber;

  // Keep generating new billing numbers until a unique one is found
  do {
    randomDigits = Math.floor(Math.random() * 90000000) + 10000000;
    billingNumber = prefix + randomDigits;
  } while (usedBillingNumbers.has(billingNumber));

  // Add the new billing number to the Set
  usedBillingNumbers.add(billingNumber);

  return billingNumber;
}
