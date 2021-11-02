import * as R from 'ramda';

export type FormValue = string | Blob;
export type FormInputData = {
  [key: string]: FormValue | FormValue[];
};

const toFormData = (input: FormInputData) => {
  const formData = new FormData();
  const pairs = R.toPairs(input);
  
  pairs.forEach(([key, value]) => {
    if (R.is(Array, value)) {
      R.addIndex(R.forEach)((item: FormValue, idx) => {
        formData.append(`${key}[${idx}]`, item);
      }, value as FormValue[]);
      return;
    }
    formData.append(key, value as FormValue);
  });

  return formData;
};

export default toFormData;
