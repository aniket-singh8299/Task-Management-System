import React, { createContext, useState } from 'react';

// Create the context
export const globalVar = createContext();

// Create a provider component
export const ContextAp = ({ children }) => {
    const [user, setUser] = useState(null);

    const saveUser = (userData) => {
        setUser(userData);
    };

    return (
        <globalVar.Provider value={{ user, saveUser }}>
            {children}
        </globalVar.Provider>
    );
};


