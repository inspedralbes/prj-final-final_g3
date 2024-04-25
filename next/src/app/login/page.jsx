'use client'

import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'

import LoginMethods from '../components/LoginMethods'
import Loader from '../components/Loader'

import { UserLoged } from '../context/UserLoged'



const page = () => {
  const Loged = useContext(UserLoged);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const Login = async (event) => {
    
    setIsLoading(true);
    event.preventDefault();

    try {
      // const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const response = await axios.post('http://spottunes.daw.inspedralbes.cat:8000/public/api/login', { email, password });
      Loged.setUser(true);
      Loged.setJsonData(response.data.data.user);
      Loged.setToken(response.data.data.token);
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('isLoged', true);
      router.push('/events');

    } catch (error) {
      Loged.setUser(false);
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <main className='w-screen h-screen bg-background'>
      <section className='w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center '>
        <h1 className='text-4xl font-semibold'>Inicia sessió</h1>

        <form className='flex flex-col gap-6' onSubmit={Login}>
          <input className='bg-transparent border-b border-gray-400 outline-none' type="email" autoFocus="true" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className='bg-transparent border-b border-gray-400 outline-none' type="password" placeholder="Contrasenya" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className='flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600' type="submit">
            {!isLoading ? "Inicia sessió" : <Loader />}
          </button>
        </form>

        <LoginMethods forWhat="inicia la sessió" />

        <Link href="/join"><svg className='w-auto h-8' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg></Link>
      </section>
    </main>
  )
}

export default page