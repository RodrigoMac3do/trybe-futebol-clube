import { compareSync } from 'bcryptjs';
import HttpException from '../utils/HttpException';
import User from '../database/models/UsersModel';
import { ILogin } from '../interfaces';
import JWT from '../utils/jwt.util';

export default class LoginService {
  private token = new JWT();
  private _model = User;

  signIn = async (body: ILogin) => {
    const { email, password } = body;

    const user = await this._model.findOne({ where: { email } });

    if (!user) throw new HttpException(401, 'Incorrect email or password');

    const valid = compareSync(password, user.password);

    if (!valid) throw new HttpException(401, 'Incorrect email or password');

    const { password: _, ...userWithoutPassword } = user.dataValues;

    return this.token.createToken(userWithoutPassword);
  };

  validate = async (token: string) => {
    try {
      const { email, role } = this.token.decoderToken(token);
      const user = await User.findOne({ where: { email } });

      if (!user) return null;

      return role;
    } catch (error) {
      throw new HttpException(401, 'Token must be a valid token');
    }
  };
}
