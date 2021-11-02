import * as R from 'ramda';

const formatPhone = (str: string) => {
  if (R.is(String, str)) {
    return R.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/g, '+$1 ($2) $3-$4-$5', str);
  }

  return '';
};

export default formatPhone;
