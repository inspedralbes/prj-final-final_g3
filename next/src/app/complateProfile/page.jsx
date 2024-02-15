'use client'
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader'


const page = () => {
    const [nickname, setNickname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const register = async (event) => {
        event.preventDefault();     
        setIsLoading(true);
        console.log(birthdate)
      
        try {
          const response = await axios.post('http://localhost:8000/api/register', {
            nickname,
            birthdate,
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
                <h1 className='text-4xl font-semibold'>Completa tu perfil</h1>
                <form className='flex flex-col gap-6' onSubmit={register}>
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="text" placeholder="Username" value={nickname} onChange={e => setNickname(e.target.value)} />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="date" placeholder="Birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)} />                    <button className='flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600'>{!isLoading ? "Completar usuario" : <Loader />}</button>
                </form>
                <Link href="/join"><svg className='w-auto h-8' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg></Link>
            </section>



        </main>
    )
}

export default page