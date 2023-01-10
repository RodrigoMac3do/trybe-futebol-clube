import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export default class CreateToken {
  public jwt = jwt;

  public createToken(data: object): string {
    const payload = { data };

    const token = this.jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '8h',
      algorithm: 'HS256',
    });

    return token;
  }
}
