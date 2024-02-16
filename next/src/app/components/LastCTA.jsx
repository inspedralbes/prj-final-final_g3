import React from 'react'
import ButtonCTA from './ButtonCTA'

const LastCTA = () => {
    return (
        <>
            <section className='flex flex-col justify-center items-center gap-6 py-10'>
                <h2 className='text-2xl text-balance font-bold text-center uppercase'>Transforma la teva experiència musical. Descobreix, connecta i <span className='bg-primary text-black p-1 mx-1'>viu la música</span> de manera única. Uneix-te ara per començar l'aventura.</h2>

                <ButtonCTA>Començar</ButtonCTA>
            </section>
        </>

    )
}

export default LastCTA