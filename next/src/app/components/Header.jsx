'use client'

import React, { useContext } from 'react'
import Link from 'next/link'
import { UserLoged } from '../context/UserLoged'


const Header = () => {
  const Loged = useContext(UserLoged);
  
  if (localStorage.getItem("isLoged")) {
    Loged.setUser(true);
  }
  const isLogged = Loged.isLoged;

  return (
    <header className='w-[90%] py-4 mx-auto flex justify-between'>
      <h1 className='text-2xl font-bold text-white uppercase'>Spottunes</h1>
      {!isLogged && <Link href='/login'>Inicia sessió</Link>}
    </header>

  )
}


export default Header