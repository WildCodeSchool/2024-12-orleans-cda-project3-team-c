import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthProviderContextProps = PropsWithChildren<object>;

type User = {
  id: number;
  email: string;
};

type AuthProviderState = {
  isUserLogged: boolean;
  isLoading: boolean;
  setIsUserLogged: (value: boolean) => void;
};

const authProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthContext({
  children,
  ...props
}: AuthProviderContextProps) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // stocker le user connecté pour l'afficher dans le front
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getConnected() {
      const response = await fetch(`${API_URL}/cookie`, {
        credentials: 'include',
      });

      const data = (await response.json()) as {
        ok: boolean;
        user: User;
      };

      if (data.ok) {
        setIsUserLogged(true);
        setUser(data.user);
      }

      setIsLoading(false);
    }
    void getConnected();
  }, []);

  const value = useMemo(
    () => ({
      isUserLogged,
      isLoading,
      setIsUserLogged,
      user,
      setUser,
    }),
    [isUserLogged, isLoading, user],
  );

  return (
    <authProviderContext.Provider {...props} value={value}>
      {children}
    </authProviderContext.Provider>
  );
}

export function useLoginContext() {
  const ctx = useContext(authProviderContext);

  return ctx;
}
