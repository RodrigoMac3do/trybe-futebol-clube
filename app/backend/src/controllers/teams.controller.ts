import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class TeamsController {
  public teamsService = new TeamsService();

  findAll = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.findAll();

    res.status(200).json(teams);
  };
}
