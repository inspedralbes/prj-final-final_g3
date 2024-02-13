import React from 'react'
import ButtonCTA from './ButtonCTA'

const LastCTA = () => {
    return (
        <>
            <section className='flex flex-col justify-center items-center gap-6 py-10'>
                <h2 className='text-2xl text-balance font-bold text-center uppercase'>Transforma tu experiencia musical. Descubre, conecta y <span className='bg-primary text-black p-1 mx-1'>vive la música</span> de manera única. Únete ahora para empezar la aventura.</h2>

                <ButtonCTA>Empezar</ButtonCTA>
            </section>
        </>

    )
}

export default LastCTA