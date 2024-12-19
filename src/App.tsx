import React from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { CreditCardForm } from './components/CreditCardForm';
import { WebSocketProvider } from './context/webSocketContext';

const App: React.FC = () => {
  return (
    <WebSocketProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <CreditCardForm />
        </main>
        <Footer />
      </div>
    </WebSocketProvider>
  );
};

export default App;