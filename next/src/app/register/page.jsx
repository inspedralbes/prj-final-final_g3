'use client'
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import LoginMethods from '../components/LoginMethods'
import Loader from '../components/Loader'
import { useRouter } from 'next/navigation'
import { UserLoged } from '../context/UserLoged'




const page = () => {
  const Loged = useContext(UserLoged);
  const router = useRouter();
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
      // const response = await axios.post('http://localhost:8000/api/register', {
      // const response = await axios.post('http://spottunes.daw.inspedralbes.cat:8000/public/api/register', {
      const response = await axios.post('https://spottunes.daw.inspedralbes.cat:8000/public/api/register', {
        email,
        name,
        surnames,
        nickname,
        password,
        birthdate,
        passwordconfirmation,
      });
      Loged.setUser(true);
      Loged.setJsonData(response.data.data.user);
      Loged.setToken(response.data.data.token);
      
      router.push('/events');

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);

  };

  return (
    <main className='w-screen h-screen bg-background'>
      <section className='w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center'>
        <h1 className='text-4xl font-semibold'>Registra't</h1>
        <form className='flex flex-col gap-6' onSubmit={register}>
          <input className='bg-transparent border-b border-gray-400 outline-none' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className='bg-transparent border-b border-gray-400 outline-none' type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
          <input className='bg-transparent border-b border-gray-400 outline-none' type="text" placeholder="Cognoms" value={surnames} onChange={e => setSurnames(e.target.value)} />
          <input className='bg-transparent border-b border-gray-400 outline-none' type="text" placeholder="Usuari" value={nickname} onChange={e => setNickname(e.target.value)} />
          <input className='bg-transparent border-b border-gray-400 outline-none' type="date" placeholder="Data de naixement" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
          <input className='bg-transparent border-b border-gray-400 outline-none' type="password" placeholder="Contrasenya" value={password} onChange={e => setPassword(e.target.value)} />
          <input className='bg-transparent border-b border-gray-400 outline-none' type="password" placeholder="Repeteix la contrasenya" value={passwordconfirmation} onChange={e => setConfirmPassword(e.target.value)} />
          <button className='flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600'>{!isLoading ? "Registra'm" : <Loader />}</button>
        </form>

        <LoginMethods forWhat="registra't" />

        <Link href="/join"><svg className='w-auto h-8' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg></Link>
      </section>



    </main>
  )
}

export default page