type FindUserDtoConstructor = {
  id: number;
  name: string;
  email: string;
  createAt: Date;
};

export class FindUserDto {
  id: number;
  name: string;
  email: string;
  createAt: Date;

  constructor({ id, name, email, createAt }: FindUserDtoConstructor) {
    Object.assign(this, { id, name, email, createAt });
  }
}
