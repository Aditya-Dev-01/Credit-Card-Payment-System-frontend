import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { CardNumberInput } from './CardNumberInput';
import { ExpirationDateInput } from './ExpirationDateInput';
import { SecurityCodeInput } from './SecurityCodeInput';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { creditCardSchema } from '../../validations/creditCardSchema';
import { webSocketService } from '../../services/websocket';
import { PaymentResponse } from '../../types/payment';
import { formatCurrency, USD_TO_OMR_RATE } from 'utils/currency';

interface FormValues {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  securityCode: string;
  amount: string;
  currency: string;
  saveCard: boolean;
}

const initialValues: FormValues = {
  cardNumber: '',
  cardHolderName: '',
  expirationDate: '',
  securityCode: '',
  amount: '',
  currency: 'USD',
  saveCard: false,
};

export const CreditCardForm: React.FC = () => {
  const [response, setResponse] = useState<PaymentResponse | null>(null);
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={creditCardSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const paymentDetails = {
              amount: parseFloat(values.amount),
              currency: values.currency as 'USD' | 'OMR',
              cardDetails: {
                cardNumber: values.cardNumber,
                cardHolderName: values.cardHolderName,
                expirationDate: values.expirationDate,
                securityCode: values.securityCode,
                saveCard: values.saveCard,
              },
            };

            const response = await webSocketService.processPayment(paymentDetails);
            setResponse(response);

            if (response.success) {
              setSubmittedValues(values);
              resetForm();
            }
          } catch (error) {
            setResponse({
              success: false,
              message: error instanceof Error ? error.message : 'Payment processing failed',
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form className="space-y-4">
            <CardNumberInput
              value={values.cardNumber}
              onChange={handleChange}
              error={touched.cardNumber ? errors.cardNumber : undefined}
            />

            <Input
              label="Card Holder Name"
              name="cardHolderName"
              value={values.cardHolderName}
              onChange={handleChange}
              error={touched.cardHolderName ? errors.cardHolderName : undefined}
            />

            <ExpirationDateInput
              value={values.expirationDate}
              onChange={handleChange}
              error={touched.expirationDate ? errors.expirationDate : undefined}
            />

            <SecurityCodeInput
              value={values.securityCode}
              onChange={handleChange}
              error={touched.securityCode ? errors.securityCode : undefined}
            />

            <Input
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              max="1000.00"
              value={values.amount}
              onChange={handleChange}
              error={touched.amount ? errors.amount : undefined}
              placeholder="Enter amount (0.01 - 1000.00)"
            />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={values.currency}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="USD">USD</option>
                <option value="OMR">OMR</option>
              </select>
              {touched.currency && errors.currency && (
                <p className="text-red-500 text-xs italic">{errors.currency}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="saveCard"
                  checked={values.saveCard}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <span className="ml-2 text-gray-700">Save card for future use</span>
              </label>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full"
            >
              Process Payment
            </Button>

            {response && (
              <div className={`mt-4 p-4 rounded ${response.success ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`font-bold ${response.success ? 'text-green-700' : 'text-red-700'}`}>
                  {response.success ? 'Success!' : 'Error'}
                </p>
                <p className={`${response.success ? 'text-green-700' : 'text-red-700'}`}>
                  {response.message}
                </p>

                {response.success && submittedValues && (
                  <div className="mt-4 space-y-2 text-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Original Amount:</span>
                      <span>
                        {formatCurrency(parseFloat(submittedValues.amount), submittedValues.currency as 'USD' | 'OMR')}
                      </span>
                    </div>
                    {response.convertedAmount && response.convertedCurrency && (
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Converted Amount:</span>
                        <span>
                          {formatCurrency(response.convertedAmount, response.convertedCurrency)}
                        </span>
                      </div>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                      Exchange Rate: 1 USD = {USD_TO_OMR_RATE} OMR
                    </div>
                  </div>
                )}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
