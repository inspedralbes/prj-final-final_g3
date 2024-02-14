'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const page = () => {
    const router = useRouter();
    useState(() => {
        console.log("Current URL:", window.location.href);

        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");

        const fetchData = async () => {
            const url = new URL(window.location.href);
            const code = url.searchParams.get("code");
            const state = url.searchParams.get("state");

            if (code && state) {
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
                    })
                        .then((response) => {
                            console.log('Authentication successful:', response.data);
                            router.push('/');
                        });


                    // Aquí puedes hacer algo con los datos de autenticación
                } catch (error) {
                    console.error('Error during Spotify authentication:', error);
                    throw new Error('Failed to authenticate with Spotify');
                }
            }
        };


        if (code && state) {
            fetchData();
        }
    }, [router])
}

export default page