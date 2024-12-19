import React from 'react';
import logo from 'assets/images/logo.png';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Payment System Logo" 
              className="h-10 w-auto"
              loading="lazy"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 rounded-full" 
                 style={{ 
                   backgroundColor: '#4CAF50',
                   boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)'
                 }} 
            />
            <span className="text-sm text-gray-600">System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};
