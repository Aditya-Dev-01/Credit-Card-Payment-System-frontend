# Credit Card Payment System - Frontend

## Overview
This is the frontend application for the Credit Card Payment System, a web-based payment processing interface that allows users to submit credit card payments with real-time validation and feedback.

## Features
- Credit card input form with real-time validation
- Support for multiple currencies (USD, OMR)
- Real-time currency conversion
- WebSocket integration for instant payment processing
- Card details saving capability
- Responsive design
- Form validations:
  - 16-digit card number validation
  - Cardholder name validation (max 100 characters, allows only letters and hyphens)
  - Expiration date validation (MM/YY format, must be at least 1 month in future)
  - 3-digit security code validation
  - Amount validation (between 0.01 and 1,000.00)

## Tech Stack
- React 18
- TypeScript
- Redux Toolkit for state management
- Chakra UI for components and styling
- Socket.io for real-time communication
- Formik + Yup for form handling and validation

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend service running (see backend README)

## Installation

1. Clone the repository.

2. Install dependencies:
```bash
npm install
```

3. Create a .env file and copy paste the code of .env.example file in .env


## Running the Application

### Development Mode
```bash
npm start
```
The application will start on `http://localhost:3000`



## Form Validation Rules
1. Card Number:
   - Must be exactly 16 numerical digits
   - No spaces or special characters allowed

2. Cardholder Name:
   - Maximum length: 100 characters
   - Only letters, spaces, and hyphens allowed
   - Cannot be empty

3. Expiration Date:
   - Format: MM/YY
   - Must be at least one month in the future
   - Valid month (01-12)
   - Valid year (current year or future)

4. Security Code:
   - Exactly 3 numerical digits

5. Amount:
   - Minimum: 0.01
   - Maximum: 1,000.00
   - Up to 2 decimal places
   - Must be a valid number
