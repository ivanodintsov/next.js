export enum ROLES {
  resort,
  guest,
}

export class Role {
  public static TYPE = ROLES;
  public TYPE = ROLES;

  role: ROLES;
  slug: string;
  name: string;
}
