export const validateCardNumber = (cardNumber: string): boolean => {
  return /^\d{16}$/.test(cardNumber);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)) {
    return false;
  }

  const [month, year] = expiryDate.split('/').map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

export const validateSecurityCode = (code: string): boolean => {
  return /^\d{3}$/.test(code);
};

export const validateAmount = (amount: number): boolean => {
  return amount >= 0.01 && amount <= 1000.00;
};
