import React from 'react'
import CardEvent from '../components/CardEvent'

const page = () => {
  return (
    <main className='w-[90vw] mx-auto py-4 flex flex-col gap-6'>
      <h1 className='text-center uppercase text-2xl font-bold'>Los proximos eventos mas top</h1>

      <section className='flex flex-col gap-3'>
        <CardEvent
          image="https://image.europafm.com/clipping/cmsimages02/2021/11/10/E193D296-BEF5-44C8-9F35-987DAA518D57/98.jpg?crop=3605,2028,x0,y99&width=1900&height=1069&optimize=low&format=webply"
          name="Concierto Travis Scott"
          location="Orlando, FL, US"
          date="31 de Enero 2024"
          people="2,487" />

        <CardEvent
          image="https://cdn.hoyaragon.es/wp-content/uploads/2024/01/24003801/180420232245091w-2024-01-24-00-38-01.jpg"
          name="Concierto Eladio Carrion"
          location="Gran Canaria, ES"
          date="17 de Mayo 2024"
          people="1,697" />
      </section>

    </main>
  )
}

export default page