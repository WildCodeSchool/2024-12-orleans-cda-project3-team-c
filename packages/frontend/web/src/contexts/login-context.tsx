import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type LoginProviderContextProps = PropsWithChildren<object>;

type LoginProviderState = {
  isUserLogged: boolean;
  isLoading: boolean;
  setIsUserLogged: (value: boolean) => void;
};

const LoginProviderContext = createContext<LoginProviderState | undefined>(
  undefined,
);

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginContext({
  children,
  ...props
}: LoginProviderContextProps) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getConnected() {
      const response = await fetch(`${API_URL}/cookie`, {
        credentials: 'include',
      });
      const data = (await response.json()) as {
        ok: boolean;
      };

      console.log('cookie', data);

      if (data.ok) {
        setIsUserLogged(true);
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
    }),
    [isUserLogged, isLoading],
  );

  return (
    <LoginProviderContext.Provider {...props} value={value}>
      {children}
    </LoginProviderContext.Provider>
  );
}

export function useLoginContext() {
  const ctx = useContext(LoginProviderContext);

  return ctx;
}
