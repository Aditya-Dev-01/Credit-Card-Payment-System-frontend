import { CardDetails } from "./card";

export type CurrencyType = 'USD' | 'OMR';

export interface PaymentDetails {
  amount: number;
  currency: CurrencyType;
  cardDetails: CardDetails;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  convertedAmount?: number;
  convertedCurrency?: CurrencyType;
  originalAmount?: number;
  originalCurrency?: CurrencyType;
  omrAmount?: number;
  error?: string;
}