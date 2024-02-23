import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxiosPublic from '../Shared/useAxiosPublic';

export const UserContext = createContext(null);
export const auth = getAuth(app);
export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();

    const signinwithpass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const googleSignin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const createUserWithEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, currentUser => {
            // console.log('auth state change', currentUser);
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                //get token and store client
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        // console.log(data.data.token)
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                        }
                        else{
                            // remove token if token not found
                            localStorage.removeItem('access-token')
                        }
                        setLoading(false);
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }


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
