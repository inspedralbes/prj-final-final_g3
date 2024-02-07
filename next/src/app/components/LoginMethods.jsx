import React from 'react'

const LoginMethods = ({forWhat}) => {
    return (
        <section className='flex flex-col gap-2'>
            <h2 className='text-xl'>O {forWhat} con otra cuenta</h2>
            <div className='flex gap-6'>
                <button className='w-7 h-7'><img src="/img/google_logo.png" alt="Logo de Google" /></button>
                <button className='w-7 h-7'><img src="/img/spotify_logo.webp" alt="Logo de Spotify" /></button>
                <button className='w-7 h-7'><img src="/img/appleMusic_logo.png" alt="Logo de Apple Music" /></button>
            </div>
        </section>
    )
}

export default LoginMethods
