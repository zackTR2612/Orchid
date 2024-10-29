import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase'; 
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};