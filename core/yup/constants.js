export const phoneRegex = /^\+[78] \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
export const ruOneRegex = /^[А-Я][А-Яа-я -]*$/;
export const ruTwoRegex = /^[А-Яа-я]*$/;
export const textRegex = /^[A-Za-zА-Яа-яЁёіІєЄЇї _-]*$/;
export const dateOneRegex = /^\d{2}.\d{2}.\d{4}$/;
export const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
// export const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
export const passwordRegex = /.{5,}/;
export const numOneRegex = /^[0-9 ]*$/;
export const passwordComplexityRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
