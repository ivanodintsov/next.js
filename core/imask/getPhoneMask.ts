export const getPhoneMask = (appended, dynamicMasked) => {
  const number = (dynamicMasked.value + appended).replace(/\D/g, '');

  return (
    dynamicMasked.compiledMasks.find((m) => {
      return number.indexOf(m.startsWith) === 0;
    }) || dynamicMasked.compiledMasks[0]
  );
};
