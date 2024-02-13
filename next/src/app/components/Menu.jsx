import React from 'react'
import Link from 'next/link'

import Home from './Icons/Home'
import Speaker from './Icons/Speaker'
import Chat from './Icons/Chat'
import User from './Icons/User'

const Menu = () => {
    const isLogged = false;
    return (
        <section className=' w-screen sticky bottom-0 py-1 text-white flex justify-around items-center backdrop-blur-lg'>
            <Link href="/" className='flex flex-col justify-center items-center '>
                <Home size="28" />
                <p className='font-bold text-xs'>Inicio</p>
            </Link>

            <Link href="/events" className='flex flex-col justify-center items-center '>
                <Speaker size="28" />
                <p className='font-bold text-xs'>Eventos</p>
            </Link>

            <Link href={isLogged ? "/chat" : "/join"} className='flex flex-col justify-center items-center '>
                <Chat size="28" />
                <p className='font-bold text-xs'>Chat</p>
            </Link>

            <Link href={isLogged ? "/perfil" : "/join"} className='flex flex-col justify-center items-center '>
                <User size="28" />
                <p className='font-bold text-xs'>Perfil</p>
            </Link>
        </section>
    )
}

export default Menu
