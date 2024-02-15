'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

// Components
import Loader from '../components/Loader';

const page = () => {
    const router = useRouter();
    useState(() => {

        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const scope = url.searchParams.get("scope");
        const authuser = url.searchParams.get("authuser");
        const hd = url.searchParams.get("hd");
        const prompt = url.searchParams.get("prompt");


        const fetchSpotifyToken = async () => {
            let spotifyData = {};

            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                data: new URLSearchParams({
                    code: code,
                    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
                    grant_type: 'authorization_code',
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                },
            };

            try {
                const responseToken = await axios.post(authOptions.url, authOptions.data, {
                    headers: authOptions.headers,
                });

                spotifyData.tokenInfo = responseToken.data;

                axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${responseToken.data.access_token}`
                    }
                })
                    .then(response => {
                        spotifyData.userInfo = response.data;
                        router.push('/');
                    })
                    .catch(error => {
                        console.error('Error al hacer la solicitud a Spotify API:', error);
                    });
            } catch (error) {
                console.error('Error during Spotify authentication:', error);
                throw new Error('Failed to authenticate with Spotify');
            }

        };

        const fetchGoogleToken = async () => {
            let googleData = {};
            const authOptions = {
                url: 'https://oauth2.googleapis.com/token',
                data: new URLSearchParams({
                    code: code,
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
                    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
                    grant_type: 'authorization_code',
                    scope: 'openid profile email'
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            try {
                const responseToken = await axios.post(authOptions.url, authOptions.data, {
                    headers: authOptions.headers,
                });

                googleData.tokenInfo = responseToken.data;

                axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                    headers: {
                        Authorization: `Bearer ${responseToken.data.access_token}`
                    }
                })
                    .then(response => {
                        googleData.userInfo = response.data;
                        console.log(googleData);
                        router.push('/');
                    })
                    .catch(error => {
                        console.error('Error al hacer la solicitud a Google API:', error);
                    });
            } catch (error) {
                console.error('Error during Google authentication:', error);
                throw new Error('Failed to authenticate with Google');
            }
        };

        if (code && state && !scope && !authuser && !hd && !prompt) {
            fetchSpotifyToken();
        }
        else if (code && state && scope && authuser && hd && prompt) {
            fetchGoogleToken();
        }
    }, [router])

    return (
        <Loader />
    )
}

export default page


