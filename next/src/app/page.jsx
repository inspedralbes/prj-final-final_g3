import React from 'react'
import Background from './components/Background'
import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Testimonios from './components/Testimonios'
import LastCTA from './components/LastCTA'

export default function Page() {
  return (
    <>
    
      <Background />
      <Header />
      <main className='w-[90%] mx-auto'>
        <Hero />
        <Benefits/>
        <Testimonios/>
        <LastCTA/>
      </main>
    </>
  )
}