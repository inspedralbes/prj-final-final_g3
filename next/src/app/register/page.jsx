'use client'
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LoginMethods from '../components/LoginMethods'
import Loader from '../components/Loader'


const page = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surnames, setSurnames] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [passwordconfirmation, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const register = async (event) => {
        event.preventDefault();     
        setIsLoading(true);
      
        try {
          const response = await axios.post('http://localhost:8000/api/register', {
            email,
            name,
            surnames,
            nickname,
            password,
            birthdate,
            passwordconfirmation,
          });
      
          console.log(response.data);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        setIsLoading(false);

      };

    return (
        <main className='w-screen h-screen bg-background'>
            <section className='w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center'>
                <h1 className='text-4xl font-semibold'>Sign Up</h1>
                <form className='flex flex-col gap-6' onSubmit={register}>
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="text" placeholder="Apellidos" value={surnames} onChange={e => setSurnames(e.target.value)} />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="text" placeholder="Username" value={nickname} onChange={e => setNickname(e.target.value)} />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="date" placeholder="Birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="password" placeholder="Repite la contraseña" value={passwordconfirmation} onChange={e => setConfirmPassword(e.target.value)} />
                    <button className='flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600'>{!isLoading ? "Registrarme" : <Loader />}</button>
                </form>

                <LoginMethods forWhat="register" />

                <Link href="/join"><svg className='w-auto h-8' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg></Link>
            </section>



        </main>
    )
}

export default page