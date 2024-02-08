'use client'

import React, { useState } from 'react';
import MapPin from './Icons/MapPin';
import Calendar from './Icons/Calendar';
import Users from './Icons/Users';
import Heart from './Icons/Heart';
import HeartFill from './Icons/HeartFill';

const CardEvent = ({ image, name, location, date, people }) => {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <article className='relative h-56 rounded-xl overflow-hidden'>
            <img className='w-full h-full brightness-[.7] object-cover' src={image} alt="" />
            <div className='absolute bottom-2 left-2'>
                <h2 className='text-white text-xl font-semibold'>{name}</h2>
                <p className='text-white flex items-center gap-1'><MapPin size="18" />{location}</p>
                <p className='text-white flex items-center gap-1'><Calendar size="18" />{date}</p>
                <p className='text-white flex items-center gap-1'><Users size="18" />{people} personas</p>
            </div>
            <button
                className={`absolute bottom-2 right-2 p-1 rounded-lg ${liked ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
                onClick={toggleLike}
            >
                {liked ? <HeartFill size="20" /> : <Heart size="20" />}
            </button>
        </article>
    );
};

export default CardEvent;
