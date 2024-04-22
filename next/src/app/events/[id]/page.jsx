'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../../components/Loader'

const Page = ({ params }) => {
  const { id } = params;
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const cargarConcierto = async () => {
      console.log("2");
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${id}`);
        console.log(response);
        setDatos(response.data.event);
      } catch (error) {
        console.error(`Error al cargar el concierto con id ${id}:`, error);
      }
    }

    cargarConcierto();
  }, [id]);

  console.log("1");

  if (!datos) {
    return <div className='flex w-full h-screen justify-center items-center'><Loader /></div>;
  }

  console.log("3");

  return (
    <>
      <img src={JSON.parse(datos.images)[2]} className='w-full h-[218px] object-cover' alt="" />
      <article className='w-[80%] mx-auto flex flex-col gap-2'>
        <p className='text-xs text-[#A4A4A4]'>Concierto</p>
        <h1 className='text-2xl font-bold'>{datos.event}</h1>
        <h2 className='font-semibold text-base'>{datos.city}</h2>
        <h2 className='font-semibold text-base'>{datos.venue}</h2>
        <h3 className='text[#CACACA] text-base'>2.487 personas inscritas</h3>
        <div className='w-full h-[2px] bg-[#888888]'></div>
      </article>
    </>
  )
}

export default Page