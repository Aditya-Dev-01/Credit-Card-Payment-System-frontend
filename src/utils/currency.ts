export const USD_TO_OMR_RATE = 0.39;

export const convertUSDtoOMR = (usdAmount: number): number => {
  return Number((usdAmount * USD_TO_OMR_RATE).toFixed(2));
};

export const formatCurrency = (amount: number, currency: 'USD' | 'OMR'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
