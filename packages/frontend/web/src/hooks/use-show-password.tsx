import { useState } from 'react';

export default function useShowPassword() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return [isVisible, toggleVisible];
}
