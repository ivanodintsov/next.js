import * as React from 'react';
import throttle from 'lodash/throttle';

const compassHeading = (alpha, beta, gamma) => {
  const alphaRad = alpha * (Math.PI / 180);
  const betaRad = beta * (Math.PI / 180);
  const gammaRad = gamma * (Math.PI / 180);

  const cA = Math.cos(alphaRad);
  const sA = Math.sin(alphaRad);
  const cB = Math.cos(betaRad);
  const sB = Math.sin(betaRad);
  const cG = Math.cos(gammaRad);
  const sG = Math.sin(gammaRad);

  const rA = - cA * sG - sA * sB * cG;
  const rB = - sA * sG + cA * sB * cG;
  const rC = - cB * cG;

  const compassHeading = Math.atan(rA / rB);

  if (rB < 0) {
    compassHeading += Math.PI;
  } else if (rA < 0) {
    compassHeading += 2 * Math.PI;
  }

  compassHeading *= 180 / Math.PI;

  return compassHeading;
};

const getCompassHeading = (event) => {
  let heading = null;

  if (event.absolute === true && event.alpha !== null) {
    heading = compassHeading(event.alpha, event.beta, event.gamma);
  } else if (event.webkitCompassHeading) {
    heading = event.webkitCompassHeading;
  } else {
    heading = event.alpha;
  }

  return heading;
};

const permissions = async () => {
  if (typeof DeviceOrientationEvent !== 'function') {
    throw new Error('DeviceOrientationEvent not detected');
  }

  if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
    throw new Error('DeviceOrientationEvent.requestPermission not detected');
  }

  const result = await DeviceOrientationEvent.requestPermission();

  if (result !== 'granted') {
    throw new Error('denied');
  }

  return result;
}

const useCompassHeading = () => {
  const [state, setState] = React.useState({
    heading: undefined,
    allow: false,
    error: undefined,
  });

  React.useEffect(() => {
    const handler = throttle((event) => {
      const heading = getCompassHeading(event);
      setState((state) => ({
        ...state,
        heading,
      }));
    }, 1000);

    window.addEventListener('deviceorientation', handler, true);

    return () => {
      window.removeEventListener('devicemotion', handler);
    };
  }, []);

  const requestPermission = async () => {
    try {
      await permissions();

      setState(state => ({
        ...state,
        error: undefined,
        allow: true,
      }));

      return true;
    } catch (error) {
      setState(state => ({
        ...state,
        error: error,
        allow: false,
      }));

      return false;
    }
  }

  return {
    requestPermission,
    state,
  }
};

export default useCompassHeading;
