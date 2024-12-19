import axios from 'axios';
import { PaymentDetails, PaymentResponse } from '../types/payment';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const paymentService = {
  processPayment: async (paymentDetails: PaymentDetails): Promise<PaymentResponse> => {
    const response = await api.post<PaymentResponse>('/payments', paymentDetails);
    return response.data;
  },

  saveCard: async (cardDetails: PaymentDetails['cardDetails']): Promise<void> => {
    await api.post('/cards', cardDetails);
  },
};

export default api;
