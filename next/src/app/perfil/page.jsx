import React from 'react'

const page = () => {
    return (
        <>
            <main className='bg-background flex flex-col gap-10'>
                <section className='bg-background flex flex-col items-center gap-6'>
                    <article className='w-full px-2 py-4 flex justify-around items-center'>
                        <img className='size-24 rounded-full object-cover' src="data:image/jpeg;base64,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" alt="" />
                        <div className='flex flex-col justify-center gap-4'>
                            <h1 className='text-xl font-semibold'>Pedro Garcia</h1>
                            <div className='flex justify-center items-center gap-6'>
                                <div>
                                    <p>666</p>
                                    <p className='text-xs text-white/60'>Seguidors</p>
                                </div>
                                <div>
                                    <p>404</p>
                                    <p className='text-xs text-white/60'>Seguits</p>
                                </div>
                                <div>
                                    <p>5</p>
                                    <p className='text-xs text-white/60'>Events</p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div>
                        <button className='px-8 py-2 rounded-full bg-white text-black font-bold'>Edita el teu perfil</button>
                    </div>
                </section>

                <section className='flex flex-col gap-4'>
                    <div className='flex justify-center gap-8'>
                        <h2 className='border-b-2 border-b-white'>Posts</h2>
                        <h2 className='opacity-60'>Esdeveniments</h2>
                        <h2 className='opacity-60'>Gustos</h2>

                    </div>
                    <section className='grid grid-cols-3 gap-2 px-6'>
                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://www.shutterstock.com/image-photo/crowd-partying-stage-lights-live-600nw-2297236461.jpg" alt="" />
                        </article>
                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2015/11/22/19/04/crowd-1056764_640.jpg" alt="" />
                        </article>
                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://www.tarracoarena.com/wp-content/uploads/2023/06/2023-Concierto-TarracoArena.jpg" alt="" />
                        </article>

                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA3YA0wHEZ_3WW5cXMACgP5gG4Dmf-2QplwgAZUvf8bwN627FWDod6k7bB3l2Sx2tfy6U&usqp=CAU" alt="" />
                        </article>
                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://d1bvpoagx8hqbg.cloudfront.net/originals/festival-cabo-plata-af3046d6531984e4bda4175fc9beb113.jpg" alt="" />
                        </article>
                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCWWFoH41Wm59POvxQPtOWT6XmHovcViXTYe1HRVNol6cZorKouAmj4lOkOxtwnR3Agc&usqp=CAU" alt="" />
                        </article>

                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://www.lavozdelsur.es/uploads/s1/11/22/25/9/1658619294066-01.jpeg" alt="" />
                        </article>
                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://publicacionesdelsur.b-cdn.net/articulos/articulos-1027817.jpg" alt="" />
                        </article>
                        <article className='h-40 overflow-hidden rounded-lg'>
                            <img className='w-full h-full object-cover' src="https://www.shutterstock.com/image-photo/two-young-woman-having-great-600nw-2195333383.jpg" alt="" />
                        </article>
                    </section>
                </section>
            </main>
        </>
    )
}

export default page