import '@abraham/reflection';
import { Expose } from 'class-transformer';

export class SignInRequestDTO {
  @Expose()
  email: string;

  @Expose()
  password: string;
}
