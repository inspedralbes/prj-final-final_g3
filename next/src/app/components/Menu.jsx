'use client'

import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Importa el hook useRouter
import { UserLoged } from '../context/UserLoged'

import Home from './Icons/Home'
import Speaker from './Icons/Speaker'
import Chat from './Icons/Chat'
import User from './Icons/User'

const Menu = () => {
    const Loged = useContext(UserLoged);
    const isLogged = Loged.isLoged;

    // Obtén la ruta actual usando el hook useRouter
    const [homeActive, setHomeActive] = useState(false);
    const [eventsActive, setEventsActive] = useState(false);
    const [chatActive, setChatActive] = useState(false);
    const [profileActive, setProfileActive] = useState(false);

    return (
        <section className=' w-full sticky bottom-0 py-1 text-white flex justify-around items-center backdrop-blur-lg'>
            <Link href="/" className={`flex flex-col justify-center items-center ${homeActive ? 'bg-black text-white' : ''}`} onClick={() => setHomeActive(true)}>
                <Home size="28" />
                <p className='font-bold text-xs'>Inicio</p>
            </Link>

            <Link href="/events" className={`flex flex-col justify-center items-center ${eventsActive ? 'bg-black text-white' : ''}`} onClick={() => setEventsActive(true)}>
                <Speaker size="28" />
                <p className='font-bold text-xs'>Eventos</p>
            </Link>

            <Link href={isLogged ? "/chat" : "/join"} className={`flex flex-col justify-center items-center ${chatActive ? 'bg-black text-white' : ''}`} onClick={() => setChatActive(true)}>
                <Chat size="28" />
                <p className='font-bold text-xs'>Chat</p>
            </Link>

            <Link href={isLogged ? "/perfil" : "/join"} className={`flex flex-col justify-center items-center ${profileActive ? 'bg-black text-white' : ''}`} onClick={() => setProfileActive(true)}>
                <User size="28" />
                <p className='font-bold text-xs'>Perfil</p>
            </Link>
        </section>
    )
}

export default Menu
