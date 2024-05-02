<template>
    <main className='w-screen h-screen bg-background'>
        <section className='w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center'>
            <h1 className='text-4xl font-semibold text-white'>Registra't</h1>
            <form class="flex flex-col gap-6" @submit="register">
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="email" placeholder="Email"
                    v-model="email" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="text" placeholder="Nom"
                    v-model="name" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="text" placeholder="Cognoms"
                    v-model="surnames" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="text" placeholder="Usuari"
                    v-model="nickname" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="date"
                    placeholder="Data de naixement" v-model="birthdate" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="password"
                    placeholder="Contrasenya" v-model="password" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="password"
                    placeholder="Repeteix la contrasenya" v-model="passwordconfirmation" />
                <button
                    class="flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600">
                    <span v-if="!isLoading" class="text-white">Registra'm</span>
                    <Loader v-else />
                </button>
            </form>

            <LoginMethods forWhat="registra't" />

            <Link href="/join"><svg className='w-auto h-8' xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
            </svg></Link>
        </section>



    </main>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            name: "",
            surnames: "",
            nickname: "",
            birthdate: "",
            password: "",
            passwordconfirmation: "",
            isLoading: false,
        };
    },

    methods: {
        async register() {
            this.isLoading = true;

            try {
                const response = await axios.post('http://localhost:8000/api/register', {
                    // const response = await axios.post('http://spottunes.daw.inspedralbes.cat:8000/api/register', {
                    email,
                    name,
                    surnames,
                    nickname,
                    password,
                    birthdate,
                    passwordconfirmation,
                });
                //Guardar la info del user en pinia

            } catch (error) {
                console.error('Error fetching data:', error);
            }

            this.isLoading = false;
        }
    }
}
</script>