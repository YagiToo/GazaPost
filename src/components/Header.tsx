import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-center">
        <span className="text-6xl font-bold mr-2">🔻</span>
        <h1 className="text-6xl font-bold">GazaPost</h1>
      </div>
    </header>
  );
};

export default Header;
