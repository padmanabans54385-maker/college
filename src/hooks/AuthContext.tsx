import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "firebase/auth";

import { subscribeToAuth } from "../firebase/auth";
import { createUserProfile, getUserProfile } from "../services/userService";

import type { UserProfile } from "../types";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(
      async (firebaseUser) => {
        setLoading(true);
        setUser(firebaseUser);

        if (firebaseUser) {
          try {
            let userProfile = await getUserProfile(firebaseUser.uid);

            // Accounts created before Firestore profiles were introduced still
            // receive a safe, non-admin profile at their next sign-in.
            if (!userProfile) {
              await createUserProfile(firebaseUser.uid, {
                name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Student",
                email: firebaseUser.email || "",
              });
              userProfile = await getUserProfile(firebaseUser.uid);
            }

            setProfile(userProfile);
          } catch (error) {
            console.error("Unable to load the signed-in user profile:", error);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
