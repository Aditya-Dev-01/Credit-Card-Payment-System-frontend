import React from 'react';
import { Input } from '../shared/Input';
import { validateExpiryDate } from 'utils/validation';

interface ExpirationDateInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const ExpirationDateInput: React.FC<ExpirationDateInputProps> = ({ value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length >= 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    onChange({ ...e, target: { ...e.target, value: input, name: 'expirationDate' } });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value && !validateExpiryDate(value)) {
      e.target.setCustomValidity('Invalid expiration date');
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <Input
      label="Expiration Date"
      name="expirationDate"
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="MM/YY"
      error={error}
      maxLength={5}
    />
  );
};
