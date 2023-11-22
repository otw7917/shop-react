import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithRedirect,
  Auth,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  NextOrObserver,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

/**
 * help provider and initiate
 * @param provider
 * @returns
 */
export function whatProviderAndInitiate(provider: string) {
  switch (provider) {
    case "Google": {
      const googleAuthProvider = new GoogleAuthProvider();
      return googleAuthProvider;
    }
    case "Github": {
      const githubAuthProvider = new GithubAuthProvider();
      return githubAuthProvider;
    }
    default:
      throw new Error(`${provider} unkown provider`);
  }
}
/**
 *
 * @param auth firebase auth
 * @param providerValue google | github available
 * @returns Promise<never>
 */

export async function signInRedirect(auth: Auth, providerValue: string) {
  if (!auth) throw new Error("where is your auth?");
  const provider = whatProviderAndInitiate(providerValue);
  return await signInWithRedirect(auth, provider);
}

export async function getUserResult() {
  try {
    const result = await getRedirectResult(auth);
    const user = result?.user;
    return Promise.resolve(user);
  } catch (error) {
    console.error(error);
  }
}

export interface UserYouShouldKnow extends User {
  uid: string;
}

export async function authStateChanged(cb: NextOrObserver<User>) {
  return onAuthStateChanged(auth, cb);
}

export async function logout() {
  const auth = getAuth();
  return signOut(auth).then(() => {
    console.log("hello sign out successful");
    return null;
  });
}
