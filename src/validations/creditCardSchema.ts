import * as Yup from 'yup';

const currentDate = new Date();
const minExpiryDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  1
);

export const creditCardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Card number is required')
    .matches(/^\d{16}$/, 'Card number must be exactly 16 digits'),
  
  cardHolderName: Yup.string()
    .required('Card holder name is required')
    .max(100, 'Name cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s-]*$/, 'Only letters, spaces, and hyphens are allowed'),
  
  expirationDate: Yup.string()
    .required('Expiration date is required')
    .matches(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      'Expiration date must be in MM/YY format'
    )
    .test('expiry', 'Card has expired', function (value) {
      if (!value) return false;
      const [month, year] = value.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
      return expiry >= minExpiryDate;
    }),
  
  securityCode: Yup.string()
    .required('Security code is required')
    .matches(/^\d{3}$/, 'Security code must be exactly 3 digits'),
  
  amount: Yup.number()
    .required('Amount is required')
    .min(0.01, 'Amount must be at least 0.01')
    .max(1000, 'Amount cannot exceed 1,000.00')
    .test('decimals', 'Amount cannot have more than 2 decimal places', (value) => {
      if (!value) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),
  
  currency: Yup.string()
    .required('Currency is required')
    .oneOf(['USD', 'OMR'], 'Invalid currency'),
  
  saveCard: Yup.boolean()
});
