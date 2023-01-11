import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  public matchesService = new MatchesService();

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
}
