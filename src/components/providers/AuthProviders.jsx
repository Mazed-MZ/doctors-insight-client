import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const UserContext = createContext(null);
export const auth = getAuth(app);
export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const signinwithpass = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = ()=>{
        return signOut(auth);
    }

    const googleSignin = (provider)=>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const createUserWithEmail = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, currentUser => {
            // console.log('auth state change', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscibe();
        }
    }, [])


    const authInfo = {
        user,
        setUser,
        loading,
        createUserWithEmail,
        signinwithpass,
        logout,
        googleSignin
    }

    return (
        <UserContext.Provider value={authInfo}>
            {children}
        </UserContext.Provider>
    )
}
