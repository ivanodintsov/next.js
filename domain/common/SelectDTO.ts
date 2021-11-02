import '@abraham/reflection';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Select {
  @Expose()
  value: string;

  @Expose()
  label: string;
}
