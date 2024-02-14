'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';

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
                const response = await axios.post(authOptions.url, authOptions.data, {
                    headers: authOptions.headers,
                });

                console.log('Authentication with Spotify successful:', response.data);
                // Si la autenticación es exitosa, redirige a la página principal
                router.push('/');

                // Aquí puedes hacer algo con los datos de autenticación si es necesario
            } catch (error) {
                console.error('Error during Spotify authentication:', error);
                throw new Error('Failed to authenticate with Spotify');
            }

        };

        const fetchGoogleToken = async () => {
            const authOptions = {
                url: 'https://oauth2.googleapis.com/token',
                data: new URLSearchParams({
                    code: code,
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
                    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
                    grant_type: 'authorization_code',
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            try {
                const response = await axios.post(authOptions.url, authOptions.data, {
                    headers: authOptions.headers,
                });

                console.log('Authentication with Google successful:', response.data);
                // Si la autenticación es exitosa, redirige a la página principal
                router.push('/');

                // Aquí puedes hacer algo con los datos de autenticación si es necesario
            } catch (error) {
                console.error('Error during Google authentication:', error);
                throw new Error('Failed to authenticate with Google');
            }
        };

        if (!scope && !authuser && !hd && !prompt) {
            fetchSpotifyToken();
        }
        else if (code && state && scope && authuser && hd && prompt) {
            fetchGoogleToken();
        }

    }, [router])
}

export default page


