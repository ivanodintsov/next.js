export const onPhoneAccept = (value, mask) => {
  if (value === '+' || value === '') {
    return value;
  }

  if (!mask.unmaskedValue?.startsWith('7')) {
    mask.unmaskedValue = `7${mask.unmaskedValue?.substring(1)}`;
    return mask.value;
  }

  return value;
};
