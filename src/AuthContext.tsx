import { createContext, useContext } from 'react';
import React from 'react';

export const AuthContext = createContext(null);

export function AuthenticationContext( { children }) {
    const auth = useContext(AuthContext);
    return(
        <AuthContext.Provider value = {auth}>
            {children}
        </AuthContext.Provider>
    );
}