"use client";

import React, { useState, useEffect } from "react";

export const UserLoged = React.createContext();

export default function UserLogedProvider({ children }) {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);
    const [isLoged, setUser] = useState(initialToken ? true : false);
    const [jsonData, setJsonData] = useState(() => {
        const item = localStorage.getItem("userInfo");
        return item ? JSON.parse(item) : [];
    });

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(jsonData));
    }, [jsonData]);

    return (
        <UserLoged.Provider
            value={{ isLoged, setUser, jsonData, setJsonData, token, setToken }}
        >
            {children}
        </UserLoged.Provider>
    );
}