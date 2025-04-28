import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type LoginProviderContextProps = PropsWithChildren<object>;

type User = {
  id: number;
  email: string;
};

type LoginProviderState = {
  isUserLogged: boolean;
  isLoading: boolean;
  setIsUserLogged: (value: boolean) => void;
};

const loginProviderContext = createContext<LoginProviderState | undefined>(
  undefined,
);

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthContext({
  children,
  ...props
}: LoginProviderContextProps) {
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
    <loginProviderContext.Provider {...props} value={value}>
      {children}
    </loginProviderContext.Provider>
  );
}

export function useLoginContext() {
  const ctx = useContext(loginProviderContext);

  return ctx;
}
