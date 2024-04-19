import { FirebaseApp } from '@react-native-firebase/database';
import { getAuth, signInWithEmailAndPassword, UserCredential, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User} from 'firebase/auth'
import { createContext, PropsWithChildren, ReactNode, useState } from 'react';
import React from 'react';
import { createUser } from './Database';

export type AuthContextValue = {
    user: User 
    login: (email: string, password: string) => void;
    logout: () => void;
    signup: (email: string, password: string) => void;
}



export const AuthContext = createContext({user: { name: "", email: ""}, login: (email: string, password: string) => {}, logout: () => {}, signup: (email: string, password: string) => {} });

export function AuthenticationContext({ app, children }: {children?: ReactNode | undefined; app: FirebaseApp}) {
    let [user, setUser] = useState(null as User | null);
    const auth = getAuth(app);

    //Methods provided by this Authentication Context
    const login = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user);
        })
        .catch((error) => {console.log(error)});
        
    }

    const signup = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user);
            createUser(userCredential.user?.uid)
        }).catch((error) => {console.log(error); });
            console.log(user);
        }


    function logout() {
        signOut(getAuth());
    }
    
    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });

    return(
        <AuthContext.Provider value={{ user, login, logout, signup } as AuthContextValue}>
            {children}
        </AuthContext.Provider>
    );
}