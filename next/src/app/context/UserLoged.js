'use client'

import React, {useState} from 'react';

export const UserLoged = React.createContext();

export default function UserLogedProvider({ children }) {
    const [isLoged, setUser] = useState(false);

  return (
    <UserLoged.Provider value={{ isLoged, setUser }}>
      {children}
    </UserLoged.Provider>
  );
}
