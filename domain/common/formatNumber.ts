const formatNumber = (num: any): string => {
  const number = parseInt(num, 10);

  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
};

export default formatNumber;
