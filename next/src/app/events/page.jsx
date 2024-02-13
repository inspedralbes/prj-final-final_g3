'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardEvent from '../components/CardEvent';
import Menu from '../components/Menu';
import Link from 'next/link';

const Page = () => {
  const isLogged = false;
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        console.log(response)
        setEventos(response.data.events);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const agruparEventos = () => {
      const eventosAgrupados = {};
      eventos.forEach(evento => {
        const key = `${evento.artist}-${evento.date}`; // Utilizar el nombre del artista y la fecha como clave
        if (!eventosAgrupados[key] || evento.event.length < eventosAgrupados[key].event.length) {
          eventosAgrupados[key] = evento; // Si no existe un evento con esa clave o si el nombre del evento actual es más corto, actualizarlo
        }
      });
      setEventosFiltrados(Object.values(eventosAgrupados)); // Convertir el objeto en un array
    };

    agruparEventos();
  }, [eventos]);

  return (
    <>
      <main className='w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative'>
        <h1 className='text-center uppercase text-2xl font-bold'>Los proximos eventos mas top</h1>

        <Link href={isLogged ? '#' : '/join'}>
          <section className='flex flex-col gap-3'>
            {eventosFiltrados.map((evento, index) => (
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
}

export default Page;