import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import HttpException from './HttpException';

dotenv.config();

export default class JWT {
  public jwt = jwt;

  public createToken(payload: object): string {
    const token = this.jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '8h',
      algorithm: 'HS256',
    });

    return token;
  }

  verifyToken = (token: string): jwt.JwtPayload | string => {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);

      return payload;
    } catch (error) {
      throw new HttpException(401, 'Expired or invalid token');
    }
  };

  decoderToken = (token: string): jwt.JwtPayload => {
    const payload = jwt.decode(token);

    return payload as object;
  };
}
