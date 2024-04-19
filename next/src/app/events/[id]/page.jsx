'use client'

import React, { useState, useEffect, useDispatch, useContext } from 'react';
import axios from 'axios';





const Page = () => {
  const [event, setEvento] = useState([]);


  useState(() => {
    const fetchData = async () => {
      // console.log("Esta es la info del usuario", userInfo.jsonData.userInfo);
      try {
        const response = await axios.get('http://localhost:8000/api/events/3');

        const eventos = response.data.event;


        console.log(eventos.images);
        setEvento(eventos);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <img src={event.images[2]} alt='Event image' className='w-full h-[300px] object-cover' />
      <article className='w-[80%] mx-auto flex flex-col gap-2'>
        <p className='text-xs text-[#A4A4A4]'>Concierto</p>
        <h1 className='text-2xl font-bold'>{event.event}</h1>
        <h2 className='font-semibold text-base'>{event.city}</h2>
        <h2 className='font-semibold text-base'>{event.venue}</h2>
        <h3 className='text[#CACACA] text-base'>2.487 personas inscritas</h3>
        <div className='w-full h-[2px] bg-[#888888]'></div>
      </article>
    </>
  );
};

export default Page;
