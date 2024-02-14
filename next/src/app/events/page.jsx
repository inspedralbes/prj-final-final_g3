'use client'

import React, { useState, useEffect, useDispatch } from 'react';
import axios from 'axios';
import CardEvent from '../components/CardEvent';
import Menu from '../components/Menu';
import Link from 'next/link';

const Page = () => {
  const isLogged = false;
  const [eventos, setEventos] = useState([]);
  
   useState(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        // console.log(await response);
        
        const eventos = response.data.events;
        const eventosAgrupados = {};
        eventos.forEach((evento) => {
          const key = `${evento.artist}-${evento.date}`; // Utilizar el nombre del artista y la fecha como clave
          if (!eventosAgrupados[key] || evento.event.length < eventosAgrupados[key].event.length) {
            eventosAgrupados[key] = evento; // Si no existe un evento con esa clave o si el nombre del evento actual es más corto, actualizarlo
          }
        });
        
        console.log(await eventos);
        setEventos(Object.values(eventosAgrupados)); // Convertir el objeto en un array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main className='w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative'>
        <h1 className='text-center uppercase text-2xl font-bold'>Los proximos eventos mas top</h1>

        <Link href={isLogged ? '#' : '/join'}>
          <section className='flex flex-col gap-3'>
            {eventos.map((evento, index) => (
              <CardEvent
                key={index}
                image={JSON.parse(evento.images)[2]}
                name={evento.event}
                location={evento.city}
                date={evento.date}
                people={evento.asistentes}
              />

            ))}
          </section>
        </Link>
      </main>
      <Menu />
    </>
  );
};

export default Page;
