import React from 'react'
import ButtonCTA from './ButtonCTA'

const Hero = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center h-[90vh] gap-5'>
                <h2 className='font-bold text-center uppercase tefont-bold'>Encuentra tu compañero de conciertos perfecto</h2>
                <p className='text-center'>Conecta tu pasión por la música con nuevas amistades. Descubre conciertos épicos y compañeros de conciertos inolvidables con nuestra aplicación.</p>
                <ButtonCTA>Ver conciertos</ButtonCTA>
            </div>
        </>
    )
}

export default Hero