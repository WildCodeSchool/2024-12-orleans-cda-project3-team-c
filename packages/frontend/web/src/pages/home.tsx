import { useEffect, useState } from 'react';

import type { SomeInterface } from '@app/shared';

import Logo from '@/components/logo';
import NavBar from '@/components/navbar-left-web';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [someData, setSomeData] = useState<SomeInterface>({
    someProperty: 'someValue',
  });

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(`${API_URL}/api/demo`, {
        signal: abortController.signal,
      });
      const data = await response.json();
      setSomeData(data);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return <></>;
}
