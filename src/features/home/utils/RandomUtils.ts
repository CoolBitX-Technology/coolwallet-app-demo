export const generateRandomPassword = (): string => {
  const min = 10000000; // Minimum 8-digit number (10^7)
  const max = 99999999; // Maximum 8-digit number (10^8 - 1)

  // Generate a random decimal number between 0 and 1
  const randomDecimal = Math.random();

  // Scale the random decimal to the range between min and max
  const randomInRange = Math.floor(randomDecimal * (max - min + 1)) + min;

  return randomInRange.toString();
};
