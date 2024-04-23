'use client'

import React, {useState, useEffect} from 'react';

export const UserLoged = React.createContext();

export default function UserLogedProvider({ children }) {
    const [isLoged, setUser] = useState(false);
    const [token, setToken] = useState(null);
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
      const userLoged = localStorage.getItem('userLoged')
      console.log('Usuario logeado?' + userLoged);
      if (userLoged) {
        setUser(true)
      }
    }, false)
    
    useEffect(() => {
      const userToken = localStorage.getItem('token')
      console.log('Token:' + userToken);
      if (userToken) {
        setToken(userToken)
      }
    }, null)

    useEffect(() => {
      const item = localStorage.getItem("jsonData");
      console.log('jsonData:' + item);
      let userInfo;
      if (item) {
          userInfo = JSON.parse(item);
          if (userInfo.length > 0) {
              setJsonData(userInfo);
          }
      }
  }, []);

    
    useEffect(() => {
      localStorage.setItem('isLoged', isLoged)
    }, [isLoged])

    useEffect(() => {
      localStorage.setItem('token', token)
    }, [token])

    useEffect(() => {
      localStorage.setItem('jsonData', JSON.stringify(jsonData))
    }, [jsonData])

  return (
    <UserLoged.Provider value={{ isLoged, setUser, jsonData, setJsonData, token, setToken }}>
      {children}
    </UserLoged.Provider>
  );
}
