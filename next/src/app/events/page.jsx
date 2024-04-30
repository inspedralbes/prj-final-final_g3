
'use client'

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import CardEvent from '../components/CardEvent';
import Menu from '../components/Menu';
import { UserLoged } from '../context/UserLoged';

const Page = () => {
  const [eventos, setEventos] = useState([]);
  const [eventosLike, setEventosLike] = useState([]);
  const userInfo = useContext(UserLoged);
  const User = userInfo.jsonData;

  useEffect(() => {
    console.log('Numero ID', User);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/likeEvents?userId=${User.id}`);
        setEventosLike(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [User.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        const eventos = response.data.events;
        const eventosAgrupados = {};
        eventos.forEach((evento) => {
          const key = `${evento.artist}-${evento.date}`;
          if (!eventosAgrupados[key] || evento.event.length < eventosAgrupados[key].event.length) {
            eventosAgrupados[key] = evento;
          }
        });
        setEventos(Object.values(eventosAgrupados));
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
          {eventos.map((evento) => {
            const like = eventosLike.some(likedEvent => likedEvent.eventId === evento.id);
            return (
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
                  like={like}
                />
              </Link>
            );
          })}
        </section>
      </main>
      <Menu />
    </>
  );
};

export default Page;