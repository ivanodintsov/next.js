import * as React from 'react';

const useOutsideListener = (
  ref: React.MutableRefObject<any>,
  handler: (event: any) => void,
  deps?: any[],
): void => {
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, ...deps]);
}

export default useOutsideListener;
