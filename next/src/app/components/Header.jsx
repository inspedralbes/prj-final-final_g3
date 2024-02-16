import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <header className='w-[90%] py-4 mx-auto flex justify-between'>
      <h1 className='text-2xl font-bold text-white uppercase'>Spottunes</h1>
      <Link href='/login'>Inicia sessió</Link>
    </header>
  )
}

export default Header