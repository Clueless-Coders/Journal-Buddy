import { createContext, PropsWithChildren, useContext, useState } from 'react';
import React from 'react';

type AuthContextValue = {
    user: User | null;
    login: () => void;
    logout: () => void;
}

type User = {
    name: string | null;
    email: string | null;
}
export const AuthContext = createContext({user: { name: "", email: ""}, login: () => {}, logout: () => {} });

export function AuthenticationContext({ children }: PropsWithChildren) {
    let [user, setUser] = useState(null as User | null);
    const login = () => {
        setUser({
                name: "John Doe",
                email: "johndoe@gmail.com",
            } as User
        );
        console.log(user);
    }

    function logout() {
        setUser(null);
    }
    
    console.log(user);
    return(
        <AuthContext.Provider value = {{ user, login, logout } as AuthContextValue}>
            {children}
        </AuthContext.Provider>
    );
}