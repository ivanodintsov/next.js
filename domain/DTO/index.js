import * as R from 'ramda';

export const filterEmpties = R.anyPass([
  R.isEmpty,
  R.isNil,
]);

const DTO = R.curry((transforms, reverse, data) => {
  return R.reduce((acc, keys) => {
    const TO = reverse ? keys[1] : keys[0];
    const FROM = reverse ? keys[0] : keys[1];
    const value = R.path(FROM, data);
    return R.assocPath(TO, value, acc);
  }, {}, transforms);
});

export default DTO;
