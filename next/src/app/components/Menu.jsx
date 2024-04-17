'use client'

import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { UserLoged } from '../context/UserLoged'

import Home from './Icons/Home'
import Speaker from './Icons/Speaker'
import Chat from './Icons/Chat'
import User from './Icons/User'

const Menu = () => {
    const Loged = useContext(UserLoged);
    const isLogged = Loged.isLoged;

    const router = useRouter();
    const currentPath = usePathname()


    return (
        <section className=' w-full sticky bottom-0 py-1 text-white flex justify-around items-center bg-background backdrop-blur-lg'>
            <Link href="/" className="flex flex-col justify-center items-center">
                <Home size="28" />
                <p className='font-bold text-xs'>Inici</p>
            </Link>

            <Link href="/events" className={`flex flex-col justify-center items-center ${currentPath === '/events' ? ' text-orange-400 fill-orange-400' : ''}`}>
                <Speaker size="28" />
                <p className='font-bold text-xs'>Events</p>
            </Link>

            <Link href={isLogged ? "/chat" : "/join"} className={`flex flex-col justify-center items-center ${currentPath === '/chat' ? ' text-orange-400 fill-orange-400' : ''}`}>
                <Chat size="28" />
                <p className='font-bold text-xs'>Xat</p>
            </Link>

            <Link href={isLogged ? "/perfil" : "/join"} className={`flex flex-col justify-center items-center ${currentPath === '/perfil' ? ' text-orange-400 fill-orange-400' : ''}`}>
                <User size="28" />
                <p className='font-bold text-xs'>Perfil</p>
            </Link>
        </section>
    )
}

export default Menu
