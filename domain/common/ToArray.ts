import '@abraham/reflection';
import * as R from 'ramda';
import { Transform } from 'class-transformer';

export const toArray = (value) => {
  if (R.is(Array, value)) {
    return value;
  }

  if (R.is(Object, value)) {
    return R.values(value);
  }

  return [];
};

const _toArray = function ({ obj }) {
  const value = R.prop(this.propertyName, obj);
  return toArray(value);
};

function ToArray (...args) {
  return Transform(_toArray, ...args);
}

export default ToArray;
