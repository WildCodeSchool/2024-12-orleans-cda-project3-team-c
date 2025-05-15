import { useState } from 'react';

export default function useDisclosure() {
  const [isTrue, setIsTrue] = useState(false);

  const toggleTrue = () => {
    setIsTrue(!isTrue);
  };

  return [isTrue, toggleTrue] as const;
}
