import React from 'react';
import { Input } from '../shared/Input';
import { validateCardNumber } from 'utils/validation';


interface CardNumberInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const CardNumberInput: React.FC<CardNumberInputProps> = ({ value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 16);
    onChange({ ...e, target: { ...e.target, value: input, name: 'cardNumber' } });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value && !validateCardNumber(value)) {
      e.target.setCustomValidity('Invalid card number');
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <Input
      label="Card Number"
      name="cardNumber"
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="1234 5678 9012 3456"
      error={error}
      maxLength={16}
    />
  );
};
