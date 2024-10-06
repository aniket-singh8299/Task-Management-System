import axios from 'axios';
import React, { createContext, useState } from 'react';

// Create a Context
export const GlobalContext = createContext();

export const ContextAp = ({ children }) => {
  const [loginCredentials, setLoginCredentials] = useState([]);
  const [loginType, setLoginType] = useState('defaultType');  // Set default login type

  const fetchUsers = async (loginType) => {
    const response = await axios.get(`http://localhost:8080/api/users/${loginType}`);
    setLoginCredentials(response.data);
  };

  return (
    <GlobalContext.Provider value={{
      loginCredentials,
      setLoginCredentials,
      loginType,
      setLoginType,
      fetchUsers
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
