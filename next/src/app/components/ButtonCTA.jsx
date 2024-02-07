import React from 'react';

const ButtonCTA = ({ children }) => {
  return (
    <a href='/events' className='px-4 py-2 font-bold text-black bg-white rounded-full hover:bg-primary transition-all duration-300 hover:-translate-y-1'>{children}</a>
  );
}

export default ButtonCTA;
