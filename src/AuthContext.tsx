import { createContext, PropsWithChildren, useState } from 'react';
import React from 'react';

export type AuthContextValue = {
    user: {
        name: string;
        email: string;
    };
    login: () => void;
    logout: () => void;
}

export type User = {
    name: string;
    email: string;
}

export const AuthContext = createContext({user: { name: "", email: ""}, login: () => {}, logout: () => {} });

export function AuthenticationContext({ children }: PropsWithChildren) {
    let [user, setUser] = useState(null as User | null);
    
    const login = () => {
        setUser({
                name: "John Doe",
                email: "johndoe@gmail.com",
            }
        );
        console.log(user);
    }

    function logout() {
        setUser(null);
    }
    
    console.log(user);
    return(
        <AuthContext.Provider value={{ user, login, logout } as AuthContextValue}>
            {children}
        </AuthContext.Provider>
    );
}