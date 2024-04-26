'use client'

import React, { useState, useEffect, useDispatch, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';

import CardEvent from '../components/CardEvent';
import Menu from '../components/Menu';
import { UserLoged } from '../context/UserLoged'



const Page = () => {
  const [eventos, setEventos] = useState([]);
  const userInfo = useContext(UserLoged);



  useState(() => {
    const fetchData = async () => {
      // console.log("Esta es la info del usuario", userInfo.jsonData.userInfo);
      try {
        // const response = await axios.get('http://localhost:8000/api/events');
        const response = await axios.get('http://spottunes.daw.inspedralbes.cat:8000/public/api/events');
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

  const Loged = useContext(UserLoged);
  Loged.setUser(true);
  const isLogged = Loged.isLoged;

  return (
    <>
      <main className='w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative bg-background'>
        <h1 className='text-center uppercase text-2xl font-bold text-balance'>Els propers esdeveniments més top</h1>

        <section className='flex flex-col gap-3'>
          {eventos.map((evento) => (
            <Link key={evento.id} href={isLogged ? `/events/${evento.id}` : '/join'}
            onClick={(e) => {
              if (e.target.closest('button')) {
                  e.preventDefault();
              }
          }}>
              <CardEvent
                image={JSON.parse(evento.images)[2]}
                name={evento.event}
                location={evento.city}
                date={evento.date}
                people={evento.asistentes}
                eventId={evento.id}
              />
            </Link>
          ))}
        </section>
      </main>
      <Menu />
    </>
  );
};

export default Page;
