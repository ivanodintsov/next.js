import * as R from 'ramda';

const filterNil = (input) => {
  const pairs = R.toPairs(input);

  return R.pipe(
    R.filter(([key, value]) => !R.isNil(value)),
    R.fromPairs,
  )(pairs);
};

export default filterNil;
