export interface ISignUp  {
  surname;
  first_name;
  phone;
  email;
  city;
  sign_up_password;
  repeat_password;
  processing_agreement;
  rules_agreement;
  age_agreement;
  captcha;
}

export class SignUp implements ISignUp {
  surname: string;
  first_name: string;
  phone: string;
  email: string;
  city: string;
  sign_up_password: string;
  repeat_password: string;
  processing_agreement: string;
  rules_agreement: string;
  age_agreement: string;
  captcha: string;
}
