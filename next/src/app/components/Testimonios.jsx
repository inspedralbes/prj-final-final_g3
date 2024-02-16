import React from 'react'
import CardTestimonio from './CardTestimonio'

const Testimonios = () => {
    return (
        <>
            <section className='flex flex-col gap-6 py-10'>
                <h2 className='text-2xl text-balance font-bold text-center uppercase'>Experiències Compartides: <span className='bg-primary text-black p-1 mx-1'>Testimonis</span> Reals</h2>

                <section className='flex flex-col gap-6 '>
                    <CardTestimonio
                        user="Miguel S."
                        image="https://i.pinimg.com/originals/67/e9/30/67e93041e878dc85c1e09e76771074ec.jpg"
                        opinion="“Aquesta app va canviar la meva forma de viure la música. Vaig trobar amics amb els mateixos gustos, cada concert es converteix en una experiència compartida. Les notificacions mantenen l'emoció viva. Connecta't i viu la música al màxim!”"
                        stars={5} />

                    <CardTestimonio
                        user="El Pedrito"
                        image="https://m.media-amazon.com/images/S/pv-target-images/29f22f7c0d5bc29b97b4c2cff66962e230d50ae9c499c3cc90dca88e794329fd.jpg"
                        opinion="“Vaig transformar la meva forma de viure la música amb aquesta app. Connectar amb aficionats semblants em va permetre gaudir de concerts de manera única. Les notificacions personalitzades mantenen l'emoció viva!”"
                        stars={4} />

                    <CardTestimonio
                        user="Raul Espinas"
                        image="https://i.pinimg.com/originals/40/d4/ba/40d4ba8e0fcf770fcb9e548aa2c8657a.jpg"
                        opinion="“La meva experiència musical va canviar completament amb aquesta aplicació. Trobar companys de concerts afins ha fet que cada esdeveniment sigui especial. Les notificacions personalitzades són com recordatoris emocionants. Una comunitat autèntica on la música es viu de manera única i compartida!”"
                        stars={5} />
                </section>
            </section>
        </>
    )
}

export default Testimonios