import { Request, Response } from 'express';
import HttpException from '../utils/http.exception';
import { ILogin } from '../interfaces/index';
import { LoginService } from '../services/index';
import { loginSchema } from '../services/validations/schema';
import validateSchema from '../services/validations/validationSchema';

export default class LoginController {
  public service = new LoginService();

  signIn = async (req: Request<object, object, ILogin>, res: Response) => {
    const { body } = req;

    await validateSchema(loginSchema, body);

    const token = await this.service.signIn(body);

    return res.status(200).json({ token });
  };

  validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(401, 'Unauthorized');
    }

    const role = await this.service.validate(authorization);

    return res.status(200).json({ role });
  };
}
