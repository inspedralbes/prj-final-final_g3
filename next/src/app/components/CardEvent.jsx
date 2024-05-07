'use client'

// CardEvent.jsx

import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { UserLoged } from '../context/UserLoged'
import MapPin from './Icons/MapPin';
import Calendar from './Icons/Calendar';
import Users from './Icons/Users';
import Heart from './Icons/Heart';
import HeartFill from './Icons/HeartFill';


const CardEvent = ({ image, name, location, date, people, eventId, like }) => {
    const [liked, setLiked] = useState(like);
    const Loged = useContext(UserLoged);
    const User = Loged.jsonData;
    const isLogged = Loged.isLoged;

    const toggleLike = async () => {
        console.log(User.id)
        try {
            // const response = await axios.post('http://localhost:8080/likeEvent', {
            const response = await axios.post('http://prespottunes.daw.inspedralbes.cat/node/likeEvent', {
                eventId: eventId,
                userId: User.id
            });
            console.log(response)
            setLiked(!liked);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='relative w-full h-56 rounded-xl overflow-hidden'>
            <img className='w-full h-full brightness-[.4] object-cover' src={image} alt="" />
            <div className='absolute bottom-2 left-2'>
                <h2 className='text-white text-xl font-semibold text-left'>{name}</h2>
                <p className='text-white flex items-center gap-1'><MapPin size="18" />{location}</p>
                <p className='text-white flex items-center gap-1'><Calendar size="18" />{date}</p>
                <p className='text-white flex items-center gap-1'><Users size="18" />{people} persones</p>
                <p className='text-white flex items-center gap-1'>{like} likes</p>
            </div>
            <button
                className={`absolute bottom-2 right-2 p-1 rounded-lg ${liked ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
                onClick={() => toggleLike(eventId)}
            >
                {liked ? <HeartFill size="20" /> : <Heart size="20" />}
            </button>
        </div>
    );
};

export default CardEvent;
