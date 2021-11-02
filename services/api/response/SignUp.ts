import '@abraham/reflection';
import { Expose, Transform, Type } from 'class-transformer';

class Errors {
  @Expose({ name: '' })
  @Transform(({ obj }) => {
    console.log(obj);
    const errors = [obj.name, obj.surname, obj.patronymic].reduce(
      (acc, item) => {
        if (item) {
          acc = [...acc, ...item];
        }
        return acc;
      },
      []
    );

    if (!errors.length) {
      return;
    }

    return errors;
  })
  name: string[];

  @Expose({ name: 'role' })
  type: string[];

  phone: string[];

  password: string[];

  password_confirmation: string[];

  @Expose({ name: 'resort' })
  resort_name: string[];

  inn: string[];

  email: string[];

  agreement_personal_data: string[];
}

export class SignUpResponseDTO {
  @Type(() => Errors)
  errors: Errors;

  message?: string;
}
