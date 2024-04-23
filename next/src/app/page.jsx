import React from 'react'
import Background from './components/Background'
import Header from './components/Header'
import Hero from './components/Hero'


export default function Page() {
  return (
    <>

      <Background />
      <Header />
      <main className='w-[90%] mx-auto'>
        <Hero />
      </main>
    </>
  )
}