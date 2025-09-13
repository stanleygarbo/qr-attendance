// store/authStore.ts
import { proxy } from "valtio";
import {
  getAuth,
  onAuthStateChanged,
  type User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
}

export const authStore = proxy<AuthState>({
  user: null,
  loading: true,
});

const auth = getAuth();

// Auth state listener
onAuthStateChanged(auth, (firebaseUser) => {
  authStore.user = firebaseUser;
  authStore.loading = false;
});

// Actions
export const authActions = {
  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (err) {
      console.error("Google login failed", err);
      throw err;
    }
  },

  loginWithApple: async () => {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");

    try {
      const result = await signInWithPopup(auth, provider);
      // const credential = OAuthProvider.credentialFromResult(result);
      // const accessToken = credential?.accessToken;
      // const idToken = credential?.idToken;
      return result.user;
    } catch (err) {
      console.error("Apple login failed", err);
      throw err;
    }
  },

  logout: () => signOut(auth),
};
