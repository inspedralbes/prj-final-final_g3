import React from 'react'
import ButtonCTA from './ButtonCTA'

const Hero = () => {
    return (
        <>
            <section className='flex flex-col items-center justify-center h-[90dvh] gap-5'>
                <h2 className='text-white text-3xl font-bold text-center uppercase'>Troba el teu company de concerts perfecte</h2>
                <p className='text-white text-center text-pretty'>Connecta la teva passió per la música amb noves amistats. Descobreix concerts èpics i companys de concerts inoblidables amb la nostra aplicació.</p>
                <ButtonCTA>Veure concerts</ButtonCTA>
            </section>
        </>
    )
}

export default Hero