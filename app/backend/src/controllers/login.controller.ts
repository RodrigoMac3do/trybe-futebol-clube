import { Request, Response } from 'express';
import HttpException from '../utils/HttpException';
import { ILogin } from '../interfaces/index';
import { LoginService } from '../services/index';
import { loginSchema } from '../services/validations/schema';
import ValidateSchema from '../services/validations/validationSchema';

export default class LoginController {
  private service = new LoginService();
  private validateSchema = new ValidateSchema();

  signIn = async (req: Request<object, object, ILogin>, res: Response) => {
    const { body } = req;

    await this.validateSchema.validate(loginSchema, body);

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
