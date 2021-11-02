import '@abraham/reflection';
import * as R from 'ramda';
import { Transform } from 'class-transformer';

const toNil = function ({ value }) {
  if (R.anyPass([R.isEmpty])(value)) {
    return undefined;
  }

  return value;
};

function ToNil (...args) {
  return Transform(toNil, ...args);
}

export default ToNil;
