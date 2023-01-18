import { IClassTeam, IMatchIDP, ITeam } from '../interfaces';

export default class Leaderboard {
  leaderboard = (matches: IClassTeam[]) => {
    const points = matches.reduce((acc, cur) => {
      const found = acc.find((elem) => elem.name === cur.name);

      if (found) {
        found.totalPoints += cur.totalPoints;
        found.totalGames += cur.totalGames;
        found.totalVictories += cur.totalVictories;
        found.totalDraws += cur.totalDraws;
        found.totalLosses += cur.totalLosses;
        found.goalsFavor += cur.goalsFavor;
        found.goalsOwn += cur.goalsOwn;
        found.goalsBalance += cur.goalsBalance;
        found.efficiency = ((found.totalPoints / (found.totalGames * 3)) * 100).toFixed(2);
      } else {
        acc.push(cur);
      }
      return acc;
    }, [] as IClassTeam[]);

    return points;
  };

  leaderboardHome = (obj: IClassTeam, team:ITeam, matches: IMatchIDP[]) => {
    const list = { ...obj };

    matches.forEach((match) => {
      if (match.homeTeam === team.id) {
        list.name = team.teamName;
        list.totalGames += 1;
        list.goalsFavor += match.homeTeamGoals;
        list.goalsOwn += match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) list.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) list.totalDraws += 1;
        if (match.homeTeamGoals < match.awayTeamGoals) list.totalLosses += 1;
        list.goalsBalance = list.goalsFavor - list.goalsOwn;
        list.totalPoints = (list.totalVictories * 3) + list.totalDraws;
        list.efficiency = ((list.totalPoints / (list.totalGames * 3)) * 100).toFixed(2);
      }
    });

    return list;
  };

  leaderboardAway = (obj: IClassTeam, team:ITeam, matches: IMatchIDP[]) => {
    const list = { ...obj };

    matches.forEach((match) => {
      if (match.awayTeam === team.id) {
        list.name = team.teamName;
        list.totalGames += 1;
        list.goalsFavor += match.awayTeamGoals;
        list.goalsOwn += match.homeTeamGoals;
        if (match.homeTeamGoals < match.awayTeamGoals) list.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) list.totalDraws += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) list.totalLosses += 1;
        list.goalsBalance = list.goalsFavor - list.goalsOwn;
        list.totalPoints = (list.totalVictories * 3) + list.totalDraws;
        list.efficiency = ((list.totalPoints / (list.totalGames * 3)) * 100).toFixed(2);
      }
    });

    return list;
  };
}
