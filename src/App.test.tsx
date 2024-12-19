import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders payment form', () => {
    render(<App />);
    const headingElement = screen.getByText(/Payment Details/i);
    expect(headingElement).toBeInTheDocument();
  });
});

export {};