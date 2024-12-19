import { io, Socket } from 'socket.io-client';
import { PaymentDetails, PaymentResponse } from '../types/payment';

class WebSocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(process.env.REACT_APP_WEBSOCKET_URL);
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  processPayment(paymentDetails: PaymentDetails) {
    return new Promise<PaymentResponse>((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      this.socket.emit('process-payment', paymentDetails);
      
      this.socket.once('payment-response', (response: PaymentResponse) => {
        resolve(response);
      });

      this.socket.once('payment-error', (error: string) => {
        reject(new Error(error));
      });
    });
  }
}

export const webSocketService = new WebSocketService();
