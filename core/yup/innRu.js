const COEFFICIENTS_N10 = [2, 4, 10, 3, 5, 9, 4, 6, 8];
const COEFFICIENTS_N11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
const COEFFICIENTS_N12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

const checkNumberCalculation = (inn, coefficients) => {
    let n = 0;
    
    coefficients.forEach((k, i) => {
      n += k * inn[i];
    });

    return n % 11 % 10;
};

export const checkInn12 = (inn) => {
  if (inn.length !== 12) {
    return false;
  }

  const n11 = checkNumberCalculation(inn, COEFFICIENTS_N11);
  const n12 = checkNumberCalculation(inn, COEFFICIENTS_N12);

  return (n11 === inn[10]) && (n12 === inn[11]);
};

export const checkInn10 = inn => {
  if (inn.length !== 10) {
    return false;
  }

  const n10 = checkNumberCalculation(inn, COEFFICIENTS_N10);
  return n10 === inn[9];
};
