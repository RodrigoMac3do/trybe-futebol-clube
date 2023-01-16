import { Request, Response, RequestHandler } from 'express';
import { matchesSchema } from '../services/validations/schema';
import validateSchema from '../services/validations/validationSchema';
import { LoginService, MatchesService } from '../services';
import HttpException from '../utils/http.exception';

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
      throw new HttpException(401, 'Unauthorized');
    }

    await this.loginService.validate(authorization);

    await validateSchema(matchesSchema, body);

    const statusMatches = await this.matchesService.create(body);

    return res.status(201).json(statusMatches);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchesService.update(+id);

    return res.status(200).json({ message: 'Finished' });
  };

  updateGoals: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    await this.matchesService.updateGoals(+id, body);

    return res.status(200).json({ message: 'Match is updated!' });
  };
}
