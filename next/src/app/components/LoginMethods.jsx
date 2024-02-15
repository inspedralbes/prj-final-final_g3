import React from 'react'
// require('dotenv').config()


const LoginMethods = ({ forWhat }) => {

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function redirectToSpotify() {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
        const state = generateRandomString(16);
        const scope = 'user-read-email user-library-read user-top-read';
        const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
        window.location.href = url;
    }

    function redirectToGoogle() {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
        const state = generateRandomString(16);
        const scopes = [
            'openid',
            'profile',
            'email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/user.birthday.read'
        ];
        const scope = encodeURIComponent(scopes.join(' '));
        const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
        window.location.href = url;
    }


    return (
        <section className='flex flex-col gap-2'>
            <h2 className='text-xl'>O {forWhat} con otra cuenta</h2>
            <div className='flex gap-6'>
                <button className='w-7 h-7' onClick={redirectToGoogle}><img src="/img/google_logo.png" alt="Logo de Google" /></button>
                <button className='w-7 h-7' onClick={redirectToSpotify}><img src="/img/spotify_logo.webp" alt="Logo de Spotify" /></button>
                {/* <button className='w-7 h-7'><img src="/img/appleMusic_logo.png" alt="Logo de Apple Music" /></button> */}
            </div>
        </section>
    )
}

export default LoginMethods
