// src/components/Header.jsx
import React from 'react';

export const Header = () => {
  return (
    <header className="px-4 py-6">
      <div className="container mx-auto">
        <h1 className="flex mx-12 text-2xl md:text-3xl font-bold text-[#FFDB70] items-center gap-2">
          Weather Dashboard
        </h1>
      </div>
    </header>
  );
};