import React from 'react';
import Link from 'next/link';

const ButtonCTA = ({ children }) => {
  return (
    <Link href='/events' className='px-4 py-2 font-bold text-black bg-white rounded-full hover:bg-primary transition-all duration-300 hover:-translate-y-1'>{children}</Link>
  );
}

export default ButtonCTA;
