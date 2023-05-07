import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export function hashPassword(text: string): Promise<string> {
  return bcrypt.hash(text, saltOrRounds);
}

export function compareHash(hash: string, password: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
