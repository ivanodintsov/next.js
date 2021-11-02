import * as React from 'react';
import throttle from 'lodash/throttle';

const useFullHeight = () => {
  const [height, setHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    const resizeHandler = throttle(() => {
      setHeight(window.innerHeight);
    }, 400);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return height;
};

export default useFullHeight;
