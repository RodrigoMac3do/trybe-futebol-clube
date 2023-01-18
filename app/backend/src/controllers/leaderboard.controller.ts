import { RequestHandler } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  public service = new LeaderboardService();

  leaderboard: RequestHandler = async (_req, res) => {
    const leaderboard = await this.service.leaderboard();

    return res.status(200).json(leaderboard);
  };

  leaderboardHome: RequestHandler = async (_req, res) => {
    const leaderboardHome = await this.service.leaderboardHome();

    return res.status(200).json(leaderboardHome);
  };

  leaderboardAway: RequestHandler = async (_req, res) => {
    const leaderboardAway = await this.service.leaderboardAway();

    return res.status(200).json(leaderboardAway);
  };
}
