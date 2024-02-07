import React from 'react'
import LoginMethods from '../components/LoginMethods'

const page = () => {
  return (
    <main className='w-screen h-screen bg-background'>
            <section className='w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center'>
                <h1 className='text-4xl font-semibold'>Log in</h1>
                <form className='flex flex-col gap-6'>
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="email" placeholder="Correo" />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="password" placeholder="Contraseña" />
                    <input className='bg-transparent border-b border-gray-400 outline-none' type="password" placeholder="Repite la contraseña" />
                    <button className='py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600'>Log in</button>
                </form>

                <LoginMethods forWhat="haz login"/>

                <button><svg className='w-auto h-8' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg></button>
            </section>

            

        </main>
  )
}

export default page
