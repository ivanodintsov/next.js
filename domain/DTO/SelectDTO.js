import * as R from 'ramda';

export const SelectDTO = (field) => {
  if (R.is(Array, field)) {
    return R.map(SelectDTO, field);
  }
  
  return R.path(['value'], field);
};

export const ToSelectDTO = (field) => {
  if (R.isNil(field)) {
    return;
  }

  if (R.is(Array, field)) {
    return R.map(ToSelectDTO, field);
  }

  if (R.is(Object, field)) {
    return {
      value: field.uuid,
      label: field.title,
    };
  }

  return {
    value: field,
    label: field,
  };
};

export const StringSelectDTO = R.path(['label']);
