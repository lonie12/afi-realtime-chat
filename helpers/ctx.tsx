import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { utilsGoogleSignIn, utilsSignUpCredential } from './utils';
import { User } from '@react-native-google-signin/google-signin';

const AuthContext = createContext<{
  signIn: () => Promise<User | undefined>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => undefined,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          const user = await utilsGoogleSignIn();
          if (user != undefined) {
            const toJson = JSON.stringify(user.user);
            setSession(toJson);
            return user;
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
