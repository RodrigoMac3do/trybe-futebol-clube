import { Request, Response } from 'express';
import { matchesSchema } from '../services/validations/schema';
import validateSchema from '../services/validations/validationSchema';
import { LoginService, MatchesService } from '../services';

export default class MatchesController {
  public matchesService = new MatchesService();
  public loginService = new LoginService();

  findAll = async (req: Request, res: Response) => {
    const {
      query: { inProgress },
    } = req;

    if (inProgress === 'true') {
      const progress = await this.matchesService.findAllProgress(true);

      res.status(200).json(progress);
    } else if (inProgress === 'false') {
      const progress = await this.matchesService.findAllProgress(false);

      res.status(200).json(progress);
    } else {
      const matches = await this.matchesService.findAll();

      res.status(200).json(matches);
    }
  };

  create = async (req: Request, res: Response) => {
    const { body } = req;
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    await this.loginService.validate(authorization);

    await validateSchema(matchesSchema, body);

    const statusMatches = await this.matchesService.create(body);

    return res.status(201).json(statusMatches);
  };
}
