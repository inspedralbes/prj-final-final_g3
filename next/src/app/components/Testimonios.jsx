import React from 'react'
import CardTestimonio from './CardTestimonio'

const Testimonios = () => {
    return (
        <>
            <section className='flex flex-col gap-6 py-10'>
                <h2 className='text-2xl text-balance font-bold text-center uppercase'>Experiencias Compartidas: <span className='bg-primary text-black p-1 mx-1'>Testimonios</span>Reales</h2>

                <section className='flex flex-col gap-6 '>
                    <CardTestimonio
                        user="Miguel S."
                        image="https://i.pinimg.com/originals/67/e9/30/67e93041e878dc85c1e09e76771074ec.jpg"
                        opinion="“Esta app cambió mi forma de vivir la música. Encontré amigos con los mismos gustos, cada concierto se vuelve una experiencia compartida. Las notificaciones mantienen la emoción viva. ¡Conéctate y vive la música al máximo!”"
                        stars={5} />

                    <CardTestimonio
                        user="El Pedrito"
                        image="https://m.media-amazon.com/images/S/pv-target-images/29f22f7c0d5bc29b97b4c2cff66962e230d50ae9c499c3cc90dca88e794329fd.jpg"
                        opinion="“Transformé mi forma de vivir la música con esta app. Conectar con aficionados similares me permitió disfrutar de conciertos de manera única. Las notificaciones personalizadas mantienen la emoción viva!”"
                        stars={4} />

                    <CardTestimonio
                        user="Raul Espinas"
                        image="https://i.pinimg.com/originals/40/d4/ba/40d4ba8e0fcf770fcb9e548aa2c8657a.jpg"
                        opinion="“Mi experiencia musical cambió por completo con esta aplicación. Hallar compañeros de conciertos afines ha hecho que cada evento sea especial. Las notificaciones personalizadas son como recordatorios emocionantes. ¡Una comunidad auténtica donde la música se vive de manera única y compartida!”"
                        stars={5} />
                </section>
            </section>
        </>
    )
}

export default Testimonios