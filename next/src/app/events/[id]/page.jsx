'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

import Loader from '../../components/Loader'
import MapPin from '@/app/components/Icons/MapPin';
import Music from '@/app/components/Icons/Music';
import Calendar from '@/app/components/Icons/Calendar';
import Clock from '@/app/components/Icons/Clock';
import Arrow from '@/app/components/Icons/LeftArrow';
import Menu from '../../components/Menu';

const Page = ({ params }) => {
  const { id } = params;
  const [datos, setDatos] = useState(null);
  const [liked, setLiked] = useState();

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

  const toggleLike = () => {
    setLiked(!liked);
  }

  if (!datos) {
    return <div className='flex w-full h-screen justify-center items-center'><Loader /></div>;
  }


  return (
    <>
      <main className='min-h-screen relative'>
        <header className='w-[80%]  flex justify-between absolute top-4 left-1/2 -translate-x-1/2 z-10'>
          <Link href='/events'>
            <Arrow className="size-6" />
          </Link>

          <button
            onClick={() => toggleLike()}
            className={`px-4 py-1 text-black font-semibold rounded-full text-sm transition duration-300 ${liked ? 'bg-red-400 hover:bg-red-600 text-white' : 'bg-white hover:bg-green-500 hover:text-white'}`}>
            {liked ? 'Siguiendo' : 'Seguir'}
          </button>
        </header>

        <div className='h-[218px] relative'>
          <img src={JSON.parse(datos.images)[2]} className='w-full h-full object-cover' alt={`Imagen del  ${datos.event}`} />
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-50% from-transparent to-[#212121]'></div>
        </div>
        <article className='w-[80%] mx-auto flex flex-col gap-3 mt-6'>
          {datos.genre && datos.genre !== 'Undefined' && <p className='text-xs text-[#A4A4A4]'>{datos.genre}</p>}
          <h1 className='text-2xl font-bold'>{datos.event}</h1>
          <div className='flex justify-between items-center'>
            <div className='space-y-1'>
              <h2 className='font-semibold text-sm flex gap-1 items-center'> <MapPin size="20" /> {datos.city}</h2>
              <h2 className='font-semibold text-sm flex gap-1 items-center'> <Music size="20" /> {datos.venue}</h2>
            </div>
            <div className='space-y-1'>
              <h2 className='font-semibold text-sm flex gap-1 items-center'> <Calendar size="20" /> {datos.date}</h2>
              <h2 className='font-semibold text-sm flex gap-1 items-center'> <Clock size="20" /> {datos.time}</h2>
            </div>
          </div>
          <h3 className='text[#CACACA] text-sm'>2.487 personas inscritas</h3>
          <div className='w-full h-[2px] bg-[#888888]'></div>
        </article>
      </main>

      <Menu />
    </>
  )
}

export default Page