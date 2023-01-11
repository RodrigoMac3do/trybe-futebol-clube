import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  public matchesService = new MatchesService();

  findAll = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.findAll();

    res.status(200).json(matches);
  };
}
