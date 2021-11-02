import '@abraham/reflection';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Role } from '~/domain/User/Role';

type Names = {
  surname?: string;
  name?: string;
  patronymic?: string;
};

const getNames = (value): Names => {
  return value
    .trim()
    .match(
      /(?<surname>[^\s]+)?(\s+(?<name>[^\s]+))?(\s+(?<patronymic>[^\s]+))?/i
    )?.groups;
};

export class SignUpRequestDTO {
  @Expose({ name: '' })
  @Transform(function ({ obj }) {
    return this.target.getNames(obj.name).name;
  })
  name: string;

  @Expose({ name: '' })
  @Transform(function ({ obj }) {
    return this.target.getNames(obj.name).surname;
  })
  surname: string;

  @Expose({ name: '' })
  @Transform(function ({ obj }) {
    return this.target.getNames(obj.name).patronymic;
  })
  patronymic: string;

  email: string;

  @Expose({ name: 'type' })
  @Transform(({ value }) => {
    return Role.TYPE[value];
  })
  role: string;

  phone: string;

  password: string;

  password_confirmation: string;

  agreement_personal_data: boolean;

  @Expose({ name: 'resort_name' })
  resort: string;

  inn: string;

  static getNames = getNames;
}
