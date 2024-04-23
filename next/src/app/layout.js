import { Inter } from "next/font/google";
import "./globals.css";
import React, { useContext } from 'react';
import UserLogedProvider from "./context/UserLoged";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Spottunes",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html data-lt-installed lang="en">
            <UserLogedProvider>
                <body className={inter.className}>{children}</body>
            </UserLogedProvider>
        </html>
    );

}
