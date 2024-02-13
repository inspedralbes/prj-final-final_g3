import React from 'react'
import ButtonCTA from './ButtonCTA'

const Hero = () => {
    return (
        <>
            <section className='flex flex-col items-center justify-center h-[90dvh] gap-5'>
                <h2 className='text-2xl font-bold text-center uppercase'>Encuentra tu compañero de conciertos perfecto</h2>
                <p className='text-center text-pretty'>Conecta tu pasión por la música con nuevas amistades. Descubre conciertos épicos y compañeros de conciertos inolvidables con nuestra aplicación.</p>
                <ButtonCTA>Ver conciertos</ButtonCTA>
            </section>
        </>
    )
}

export default Hero