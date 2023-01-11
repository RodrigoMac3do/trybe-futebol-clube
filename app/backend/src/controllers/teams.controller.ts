import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class TeamsController {
  public teamsService = new TeamsService();

  findAll = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.findAll();

    res.status(200).json(teams);
  };

  findById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const team = await this.teamsService.findById(id);

    return res.status(200).json(team);
  };
}
