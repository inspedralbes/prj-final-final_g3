import React from 'react'

const CardBenefit = ({ title, description, children }) => {
    return (
        <article className='flex flex-col gap-6 py-10 bg-[#7D7D7D] rounded-xl justify-items-center items-center'>
            <div className='h-20 w-auto'>{children}</div>
            <h3 className='font-bold text-xl capitalize w-[70%] text-center text-balance'>{title}</h3>
            <p className='text-center px-4 text-pretty'>{description}</p>
        </article>
    )
}

export default CardBenefit