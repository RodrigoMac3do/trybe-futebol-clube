import { compareSync } from 'bcryptjs';
import CreateToken from '../utils/jwt.util';
import HttpException from '../utils/http.exception';
import User from '../database/models/UsersModel';
import ILogin from '../interfaces';

export default class LoginService {
  private token = new CreateToken();

  signIn = async (body: ILogin) => {
    const { email, password } = body;

    const user = await User.findOne({ where: { email } });

    if (!user) throw new HttpException(401, 'Incorrect email or password');

    const valid = compareSync(password, user.password);

    if (!valid) throw new HttpException(401, 'Incorrect email or password');

    const { password: _, ...userWithoutPassword } = user.dataValues;

    return this.token.createToken(userWithoutPassword);
  };
}
