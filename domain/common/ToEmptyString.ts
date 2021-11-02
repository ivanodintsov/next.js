import '@abraham/reflection';
import * as R from 'ramda';
import { Transform } from 'class-transformer';

const toEmptyString = function ({ value }) {
  if (R.anyPass([R.isEmpty, R.isNil])(value)) {
    return '';
  }

  return value;
};

function ToEmptyString (...args) {
  return Transform(toEmptyString, ...args);
}

export default ToEmptyString;
