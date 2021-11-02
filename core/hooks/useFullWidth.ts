import * as React from 'react';
import throttle from 'lodash/throttle';

const useFullWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const resizeHandler = throttle(() => {
      setWidth(window.innerWidth);
    }, 400);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return width;
};

export default useFullWidth;
