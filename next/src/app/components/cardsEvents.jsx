'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardsEvents = () => {
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
    <div className="grid grid-cols-3 gap-4 ">
      {eventos.map((evento, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url("${evento.imagen}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="p-4 rounded-md shadow-md"
        >
          <div className="flex justify-between items-center">
            <div className="text-white text-xl font-bold">{evento.titulo}</div>
          </div>
          <div className="text-white">{evento.fecha}</div>
        </div>
      ))}
    </div>
  );
};

export default CardsEvents;
