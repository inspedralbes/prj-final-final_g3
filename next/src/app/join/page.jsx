import Link from 'next/link';

import React from 'react'
import Logo from '../components/Logo'

const page = () => {
    return (
        <main className='relative flex flex-col w-screen h-screen gap-10 mx-auto bg-background'>
            <header className='py-6 w-[90vw] mx-auto'>
                <Logo fill="white" size="70" />
            </header>

            <section className='w-[90vw] mx-auto flex flex-col justify-center items-center gap-32'>
                <article className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-semibold'>Coneix a gent amb els mateixos gustos musicals i passa-ho d'allò més bé!</h1>
                    <p className='font-normal'>Una forma diferent, ràpida i entretinguda de conèixer gent nova.</p>
                </article>

                <div className='flex flex-col justify-center w-full gap-6'>
                    <Link href='/login' className='bg-[#464646] rounded-full font-bold py-3 text-center'>Inicia sessió</Link>
                    <Link href='/register' className='py-3 font-bold text-center transition-all rounded-full duration-200 bg-gradient-to-r from-orange-600 to-yellow-600 hover:bg-white hover:text-black'>Crea un compte</Link>
                </div>
            </section>
        </main>
    )
}

export default page