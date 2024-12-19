import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Payment System. All rights reserved.</p>
          <p className="mt-1">Secure Payment Processing</p>
        </div>
      </div>
    </footer>
  );
};
