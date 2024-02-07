import React from 'react'

const Header = () => {
  return (
    <header className='w-[90%] py-4 mx-auto flex justify-between'>
      <h1 className='text-2xl font-bold text-white uppercase'>Spottunes</h1>
      <a href='/login'>Log in</a>
    </header>
  )
}

export default Header