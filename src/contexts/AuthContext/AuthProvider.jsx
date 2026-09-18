import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);




    const registerUser = (email, password) => {

        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {

        setLoading(true);

        return signInWithEmailAndPassword(auth, email, password)
    }


    const signInWithGoogle = () => {

        setLoading(true);

        return signInWithPopup(auth, googleProvider)
    }


    const logOut = () => {

        setLoading(true);

        signOut(auth)
    }


    const updateUserProfile = (profile) => {
        updateProfile(auth.currentUser, profile)
    }


    const forgetPassword = (email) => {

        setLoading(true);

        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }

    }, [])


    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        forgetPassword,
    }


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;