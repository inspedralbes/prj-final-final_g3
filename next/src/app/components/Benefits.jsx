import React from 'react'
import CardBenefit from './CardBenefit'

const Benefits = () => {
  return (
    <>
      <section className='flex flex-col gap-6 py-10'>
        <h2 className='text-2xl text-balance font-bold text-center uppercase'>Experimenta nuestros <span className='bg-primary text-black p-1'>beneficios</span></h2>
        <section className='flex flex-col gap-10'>

          <CardBenefit title="No te pierdas ningun evento" description="Nunca vuelvas a perderte un concierto por falta de compañía. Nuestra aplicación te mantiene conectado con personas que van a los mismos eventos, asegurándote experiencias musicales inolvidables."><svg className='h-20 w-auto' width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
          </svg></CardBenefit>

          <CardBenefit title="Seguridad y Confianza" description="Disfruta de eventos en un entorno seguro. Nuestra aplicación fomenta relaciones basadas en intereses compartidos, proporcionando un espacio donde puedes conectar con personas afines y construir relaciones de confianza antes de asistir a un evento juntos."><svg className='h-20 w-auto' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shield" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /></svg></CardBenefit>

          <CardBenefit title="Conexiones en Tiempo Real" description="No te pierdas ninguna actualización importante. Recibe notificaciones instantáneas cuando alguien a quien sigues se inscribe en un concierto o cuando tus artistas favoritos anuncian nuevos eventos. Mantente conectado con tu comunidad musical en tiempo real."><svg className='h-20 w-auto' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg></CardBenefit>
        </section>
      </section>
    </>
  )
}

export default Benefits