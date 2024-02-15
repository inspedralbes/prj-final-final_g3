'use client'

import React, {useState} from 'react';

export const UserLoged = React.createContext();

export default function UserLogedProvider({ children }) {
    const [isLoged, setUser] = useState(false);
    const [jsonData, setJsonData] = useState(null);

  return (
    <UserLoged.Provider value={{ isLoged, setUser, jsonData, setJsonData }}>
      {children}
    </UserLoged.Provider>
  );
}
