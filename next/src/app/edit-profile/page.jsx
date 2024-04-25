'use client'

import React, { useState, useContext } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Loader from '../components/Loader'
import { UserLoged } from '../context/UserLoged'



const page = () => {
    const Loged = useContext(UserLoged);
    const router = useRouter();
    const User = Loged.jsonData;
    const Token = Loged.token;

    const [name, setName] = useState(User && User.name ? User.name : '');
    const [nickname, setNickname] = useState(User && User.nickname ? User.nickname : '');
    const [surnames, setSurname] = useState(User && User.surnames ? User.surnames : '');
    const [email, setEmail] = useState(User && User.email ? User.email : '');
    const [birthdate, setBirthdate] = useState(User && User.birthdate ? User.birthdate : '');
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleSurnamesChange = (e) => {
        setSurname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleBirthdateChange = (e) => {
        setBirthdate(e.target.value);
    };



    const update = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        try {
            console.log(Token);
            // const response = await axios.put('http://localhost:8000/api/updateInfo', {
            const response = await axios.put('http://spottunes.daw.inspedralbes.cat:8000/public/api/updateInfo', {
                name: name,
                nickname: nickname,
                surnames: surnames,
                email: email,
                birthdate: birthdate
            }, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });

            Loged.setJsonData(response.data);
            router.push('/perfil');

        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    return (
        <main className='w-screen h-screen bg-background'>
            <section className='w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center '>
                <h1 className='text-4xl font-semibold'>Edita el teu perfil</h1>

                <form className='flex flex-col gap-6' onSubmit={update}>
                    <input
                        className='bg-transparent border-b border-gray-400 outline-none'
                        type="text"
                        autoFocus={true}
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <input
                        className='bg-transparent border-b border-gray-400 outline-none'
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    <input
                        className='bg-transparent border-b border-gray-400 outline-none'
                        type="text"
                        placeholder="Surnames"
                        value={surnames}
                        onChange={handleSurnamesChange}
                    />
                    <input
                        className='bg-transparent border-b border-gray-400 outline-none'
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        className='bg-transparent border-b border-gray-400 outline-none'
                        type="date"
                        placeholder="Birthdate"
                        value={birthdate}
                        onChange={handleBirthdateChange}
                    />

                    <button className='flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600' type="submit">
                        {!isLoading ? "Actualitza" : <Loader />}
                    </button>
                </form>


                <Link href="/perfil"><svg className='w-auto h-8' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg></Link>
            </section>
        </main>
    )
}

export default page
