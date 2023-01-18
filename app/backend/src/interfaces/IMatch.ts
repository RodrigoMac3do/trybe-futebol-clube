export interface IMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchIDP extends IMatch {
  id?: number;
  inProgress: boolean;
}
