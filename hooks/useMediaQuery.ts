import { useMediaQuery as useMediaQueryBase } from 'react-responsive';
import { useState, useEffect } from 'react';

export const useMediaQuery: typeof useMediaQueryBase = (...args) => {
  const [isMatch, setIsMatch] = useState(false);
  const isMatchBase = useMediaQueryBase(...args);

  useEffect(() => {
    setIsMatch(isMatchBase);
  }, [isMatchBase]);

  return isMatch;
};
