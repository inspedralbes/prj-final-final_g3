import React from 'react'
import StarIcon from './Icons/Star'


const CardTestimonio = ({ user, image, opinion, stars }) => {
    return (
        <article className='bg-[#ACA567] rounded-xl gap-6 flex flex-col justify-center p-4'>
            <div className='flex items-center gap-2'>
                <img className='w-14 h-14 object-cover rounded-full ' src={image} alt="" />
                <div>
                    <h3 className='font-bold text-black'>{user}</h3>
                    <div className='flex'>
                        {Array.from({ length: stars }).map((_, index) => (
                            <StarIcon key={index} size="16" />
                        ))}
                    </div>
                </div>

            </div>
            <p className='text-black'>{opinion}</p>
        </article>
    )
}

export default CardTestimonio