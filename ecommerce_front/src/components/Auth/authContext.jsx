//crear un estado por otro archivo, por fuera
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../Auth/firebase";
import { toast } from "react-toastify";
export const authContext = createContext();
const userUrl = import.meta.env.VITE_URL_USERS;

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);

  const signup = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
        user
          .getIdToken()
          .then((idToken) => {
            window.localStorage.setItem("token", idToken);
            const newUser = {
              email: email,
              token: idToken,
              name: name,
            };
            axios
              .post(userUrl, newUser)
              .then((res) => {
                setUserAuth({
                  email: newUser.email,
                  name: newUser.name,
                  token: idToken,
                });
                if (res.status === 201) {
                  toast.success("Usuario creado con exito!");
                } else if (res.status === 400 || res.status === 500) {
                  toast.error(res.data.message);
                }
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => console.error(err));
      }
    );
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(email);
  };

  const login = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then(({ user }) => user.accessToken);
    if (window.localStorage.getItem("token")) {
      window.localStorage.removeItem("token");
    }
    window.localStorage.setItem("token", credentials);
    console.log(credentials);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      window.localStorage.removeItem("token");
      toast.success("Log out succesfull");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleProvider);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserAuth(currentUser);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        logOut,
        userAuth,
        logInWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
