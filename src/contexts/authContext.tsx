import { createContext, useContext, useEffect, useState } from "react";
import {
  UserYouShouldKnow,
  authStateChanged,
  logout,
  signInRedirect,
} from "../services/firebase";

interface AuthContextDefaultValue {
  user: UserYouShouldKnow | undefined | null;
  uid: string | undefined | null;
  signInRedirect: typeof signInRedirect;
  logout: () => void;
}

const AuthContext = createContext<AuthContextDefaultValue>({
  uid: null,
  user: null,
  signInRedirect: signInRedirect,
  logout,
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  console.log("authContextProvider Rendering");
  const [user, setUser] = useState<UserYouShouldKnow | null>();
  useEffect(() => {
    authStateChanged(async (user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: user, uid: user && user.uid, signInRedirect, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(AuthContext);
}
