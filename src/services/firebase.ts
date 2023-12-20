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
  User,
} from "firebase/auth";

import { getDatabase, ref, get, set } from "firebase/database";

import { v4 as uuidv4 } from "uuid";
import { Product } from "../types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  appId: import.meta.env.VITE_APP_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
};

export const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
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
  console.log("getUserResult");
  try {
    const result = await getRedirectResult(auth);
    const user = result?.user;
    Promise.resolve(user);
  } catch (error) {
    console.error("getUserResult error", error);
  }
}

/**
 * extends User and `User` extends `UserInfo`
 */
export interface UserYouShouldKnow extends User {
  isAdmin?: boolean;
}

export async function authStateChanged(
  cb: (user: UserYouShouldKnow | null) => void
) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await checkAdmin(user) : null;
    cb(updatedUser);
  });
}

async function checkAdmin(user: UserYouShouldKnow) {
  // admins
  const userRef = ref(database, "admins");
  // 한번만 실행할 경우 get
  return get(userRef) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const adminList: string[] = snapshot.val();
        const isAdmin = adminList.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function logout() {
  const auth = getAuth();
  return signOut(auth).then(() => {
    console.log("hello sign out successful");
    return null;
  });
}

export async function addProduct(newProduct: Product, url: string) {
  const productId = uuidv4();

  const productRef = ref(database, `products/${productId}`);
  const product = { ...newProduct, id: productId, url };
  set(productRef, product);
}

interface ResponseProduct {
  [s: string]: Product;
}

export async function getProducts(): Promise<ResponseProduct> {
  const productRef = ref(database, `products`);
  return get(productRef) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getProductDetail(productId: string): Promise<Product> {
  const productRef = ref(database, `products/${productId}`);
  return get(productRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
