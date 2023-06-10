import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import auth from "../utils/firebase/firebase.config";
import { storage } from "../utils/firebase/firebase.config";
import { API } from "../hooks/useAxios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  // Login
  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Social Login
  const googleLogin = () => signInWithPopup(auth, googleProvider);

  // Update profile
  const updateUser = (name, image) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: image });

  // Logout
  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    await signOut(auth);
  };

  // Upload Image
  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  // Observing auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);
      // Get and set token
      if (currentUser) {
        try {
          const response = await API.post("/jwt", { email: currentUser.email });
          localStorage.setItem("access-token", response.data.token);
          setLoading(false);
        } catch (error) {
          console.error("Error getting token", error);
          setLoading(false);
        }
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Auth object
  const authInfo = {
    user,
    loading,
    setLoading,
    signIn,
    createUser,
    googleLogin,
    uploadImage,
    updateUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
