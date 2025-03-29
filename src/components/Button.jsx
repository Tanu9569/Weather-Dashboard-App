import React from 'react'

export const Button = ({children, className=''}) => {
  return (
    <button 
        className={`px-4 py-2 bg-[#FFDB70] text-[#121212] font-medium rounded-lg hover:bg-[#FFBE5E] transition-colors duration-300 ${className}`}
    >
        { children }
    </button>
  );
};
