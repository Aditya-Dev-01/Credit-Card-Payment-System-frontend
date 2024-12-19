import React, { useState } from 'react';
import { Input } from '../shared/Input';
import { validateSecurityCode } from 'utils/validation';
import { Eye, EyeOff } from 'lucide-react';


interface SecurityCodeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const SecurityCodeInput: React.FC<SecurityCodeInputProps> = ({ value, onChange, error }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 3);
    onChange({ ...e, target: { ...e.target, value: input, name: 'securityCode' } });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value && !validateSecurityCode(value)) {
      e.target.setCustomValidity('Invalid security code');
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <div className="relative">
      <Input
        label="Security Code"
        name="securityCode"
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="123"
        error={error}
        maxLength={3}
      />
       <button
        type="button"
        className="absolute right-3 top-1/2 transform translate-y-1 text-blue-500 hover:text-blue-700 transition-colors duration-200 focus:outline-none"
        onClick={() => setIsVisible(!isVisible)}
        aria-label={isVisible ? "Hide security code" : "Show security code"}
      >
        {isVisible ? (
          <EyeOff size={20} />
        ) : (
          <Eye size={20} />
        )}
      </button>
    </div>
  );
};
