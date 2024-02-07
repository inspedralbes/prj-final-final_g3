import React from 'react'
import Link from 'next/link'

import Home from './Icons/Home'
import Speaker from './Icons/Speaker'
import Chat from './Icons/Chat'
import User from './Icons/User'

const Menu = () => {
  return (
    <section className='bg-primary w-screen sticky bottom-0 py-1 text-black flex justify-around items-center'>
        <Link href="/" className='flex flex-col justify-center items-center '>
            <Home size="26"/>
            <p className='font-bold text-sm'>Inicio</p>
        </Link>

        <Link href="/events" className='flex flex-col justify-center items-center '>
            <Speaker size="26"/>
            <p className='font-bold text-sm'>Eventos</p>
        </Link>

        <Link href="/chat" className='flex flex-col justify-center items-center '>
            <Chat size="26"/>
            <p className='font-bold text-sm'>Chat</p>
        </Link>

        <Link href="/perfil" className='flex flex-col justify-center items-center '>
            <User size="26"/>
            <p className='font-bold text-sm'>Perfil</p>
        </Link>
    </section>
  )
}

export default Menu
