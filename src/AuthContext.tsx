import { FirebaseApp } from '@react-native-firebase/database';
import { getAuth, signInWithEmailAndPassword, UserCredential, createUserWithEmailAndPassword} from 'firebase/auth'
import { createContext, PropsWithChildren, ReactNode, useState } from 'react';
import React from 'react';

export type AuthContextValue = {
    user: UserCredential
    login: (email: string, password: string) => void;
    logout: () => void;
    signup: (email: string, password: string) => void;
}

export type User = {
    name: string;
    email: string;
}

export const AuthContext = createContext({user: { name: "", email: ""}, login: () => {}, logout: () => {} });

export function AuthenticationContext({ app, children }: {children?: ReactNode | undefined; app: FirebaseApp}) {
    let [user, setUser] = useState(null as UserCredential | null);
    const auth = getAuth(app);

    const login = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential);
        })
        .catch((error) => {console.log(error)});
        
        console.log(user);
    }

    const signup = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        setUser(userCredential);
  })
  .catch((error) => {console.log(error); });
        console.log(user);
    }


    function logout() {
        setUser(null);
    }
    
    return(
        <AuthContext.Provider value={{ user, login, logout, signup } as AuthContextValue}>
            {children}
        </AuthContext.Provider>
    );
}