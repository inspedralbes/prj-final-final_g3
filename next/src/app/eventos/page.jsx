import React from 'react'
import CardsEvents from '../components/cardsEvents'

const Eventos = () => {
  return (
    <div className='bg-gray-900 font-poppins h-screen w-screen'>
      <div className="px-40 py-10 ">
        <div className="flex justify-between items-center border-b-4 pb-2">
          <div className="text-5xl font-bold text-white">
            Eventos
          </div>
          <div className="flex items-center justify-end space-x-4 px-[20px]">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="35"
                height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </button>
            <button className="text-white rounded-full px-[15px] py-[5px] border-color-white bg-white text-black"><span
              class="text-black font-bold">Filtro</span></button>
            <button className="text-white">Perfil</button>
          </div>
        </div>
      </div>
      <div className="px-40 py-10">
        <CardsEvents />
      </div>
    </div>
  )
}

export default Eventos