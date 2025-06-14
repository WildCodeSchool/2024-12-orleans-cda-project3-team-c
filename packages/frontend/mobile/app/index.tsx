import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import type { SomeInterface } from '@app/shared';

export default function Index() {
  const [someData, setSomeData] = useState<SomeInterface>({
    someProperty: 'someValue',
  });

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(`/api/demo`, {
        signal: abortController.signal,
      });
      const data = await response.json();
      setSomeData(data);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{'Edit app/index.tsx to edit this screen.'}</Text>

      <Text>{someData.someProperty}</Text>
    </View>
  );
}
