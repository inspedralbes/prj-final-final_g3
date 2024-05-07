'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../../components/Loader'
import MapPin from '@/app/components/Icons/MapPin';
import Music from '@/app/components/Icons/Music';

const Page = ({ params }) => {
  const { id } = params;
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const cargarConcierto = async () => {
      try {
        // const response = await axios.get(`http://localhost:8000/api/events/${id}`);
        // const response = await axios.get(`http://spottunes.daw.inspedralbes.cat:8000/public/api/events/${id}`);
        const response = await axios.get(`http://prespottunes.daw.inspedralbes.cat:8000/public/api/events/${id}`);
        console.log(response);
        setDatos(response.data.event);
      } catch (error) {
        console.error(`Error al cargar el concierto con id ${id}:`, error);
      }
    }

    cargarConcierto();
  }, [id]);


  if (!datos) {
    return <div className='flex w-full h-screen justify-center items-center'><Loader /></div>;
  }


  return (
    <>
      <div className='h-[218px] relative'>
        <img src={JSON.parse(datos.images)[2]} className='w-full h-full object-cover' alt={`Imagen del  ${datos.event}`} />
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-50% from-transparent to-[#212121]'></div>
      </div>
      <article className='w-[80%] mx-auto flex flex-col gap-2 mt-6'>
        {datos.genre ? <p className='text-xs text-[#A4A4A4]'>{datos.genre}</p> : null}
        <h1 className='text-2xl font-bold'>{datos.event}</h1>
        <h2 className='font-semibold text-base flex gap-1 items-center'> <MapPin size="20" /> {datos.city}</h2>
        <h2 className='font-semibold text-base flex gap-1 items-center'> <Music size="20" /> {datos.venue}</h2>
        <h3 className='text[#CACACA] text-sm'>2.487 personas inscritas</h3>
        <div className='w-full h-[2px] bg-[#888888]'></div>
      </article>
    </>
  )
}

export default Page