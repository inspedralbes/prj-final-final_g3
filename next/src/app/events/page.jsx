'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardEvent from '../components/CardEvent';
import Menu from '../components/Menu';

const Page = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/conciertos.json');
        setEventos(response.data.conciertos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, []);

  return (
    <>
      <main className='w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative'>
        <h1 className='text-center uppercase text-2xl font-bold'>Los proximos eventos mas top</h1>

        <section className='flex flex-col gap-3'>
          {eventos.map((evento, index) => (
            <CardEvent
              key={index}
              image={evento.imagen}
              name={evento.titulo}
              location={evento.location}
              date={evento.fecha}
              people={evento.asistentes}
            />
          ))}
        </section>
      </main>
      <Menu />
    </>
  );
}

export default Page;