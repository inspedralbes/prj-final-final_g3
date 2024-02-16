import React from 'react'
import CardBenefit from './CardBenefit'

const Benefits = () => {
  return (
    <>
      <section className='flex flex-col gap-6 py-10'>
        <h2 className='text-2xl text-balance font-bold text-center uppercase'>Experimenta els nostres <span className='bg-primary text-black p-1'>beneficis</span></h2>
        <section className='flex flex-col gap-10'>

          <CardBenefit title="No et perdis cap esdeveniment" description="Mai més et perdis un concert per falta de companyia. La nostra aplicació et manté connectat amb persones que van als mateixos esdeveniments, assegurant-te experiències musicals inoblidables."><svg className='h-20 w-auto' width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
          </svg></CardBenefit>

          <CardBenefit title="Seguretat i confiança" description="Gaudeix d'esdeveniments en un entorn segur. La nostra aplicació fomenta relacions basades en interessos compartits, proporcionant un espai on pots connectar amb persones afins i construir relacions de confiança abans d'assistir a un esdeveniment junts."><svg className='h-20 w-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /></svg></CardBenefit>

          <CardBenefit title="Connexions en Temps Real" description="No et perdis cap actualització important. Rep notificacions instantànies quan algú a qui segueixes es registra en un concert o quan els teus artistes favorits anuncien nous esdeveniments. Mantén-te connectat amb la teva comunitat musical en temps real."><svg className='h-20 w-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg></CardBenefit>
        </section>
      </section>
    </>
  )
}

export default Benefits