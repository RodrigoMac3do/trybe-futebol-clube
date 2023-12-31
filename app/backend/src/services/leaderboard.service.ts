import { IClassTeam } from '../interfaces';
import MatchesService from './matches.service';
import TeamsService from './teams.service';
import Leaderboard from '../utils/leaderboard.rules';

export default class LeaderboardService {
  private matchesService = new MatchesService();
  private teamsService = new TeamsService();
  private leaderboardUtils = new Leaderboard();
  private classTeam: IClassTeam = {
    name: '',
    efficiency: '',
    goalsBalance: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    totalDraws: 0,
    totalGames: 0,
    totalLosses: 0,
    totalPoints: 0,
    totalVictories: 0,
  };

  private static sortBoard = (board: IClassTeam[]): IClassTeam[] =>
    board.sort((team1, team2) => {
      if (team1.totalPoints !== team2.totalPoints) { return team2.totalPoints - team1.totalPoints; }
      if (team1.goalsBalance !== team2.goalsBalance) {
        return team2.goalsBalance - team1.goalsBalance;
      }
      if (team1.goalsFavor !== team2.goalsFavor) { return team2.goalsFavor - team1.goalsFavor; }
      if (team1.goalsOwn !== team2.goalsOwn) { return team1.goalsOwn - team2.goalsOwn; }

      return 1;
    });

  leaderboard = async () => {
    const home = await this.leaderboardHome();
    const away = await this.leaderboardAway();

    if (home && away) {
      const matches = [...away, ...home];
      const newBoard = this.leaderboardUtils.leaderboard(matches);

      return LeaderboardService.sortBoard(newBoard);
    }
  };

  leaderboardHome = async () => {
    const teams = await this.teamsService.findAll();

    const matches = await this.matchesService.findAllProgress(false);

    if (teams && matches) {
      const result = await Promise.all(
        teams.map((team) =>
          this.leaderboardUtils.leaderboardHome(this.classTeam, team, matches)),
      );
      return LeaderboardService.sortBoard(result);
    }
  };

  leaderboardAway = async () => {
    const teams = await this.teamsService.findAll();

    const matches = await this.matchesService.findAllProgress(false);

    if (teams && matches) {
      const result = await Promise.all(
        teams.map((team) =>
          this.leaderboardUtils.leaderboardAway(this.classTeam, team, matches)),
      );
      return LeaderboardService.sortBoard(result);
    }
  };
}
