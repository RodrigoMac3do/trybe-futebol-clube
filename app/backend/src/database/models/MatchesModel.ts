import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

export default class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeam: {
      allowNull: false,
      field: 'home_team',
      type: INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      field: 'home_team_goals',
      type: INTEGER,
    },
    awayTeam: {
      allowNull: false,
      field: 'away_team',
      type: INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      field: 'away_team_goals',
      type: INTEGER,
    },
    inProgress: {
      allowNull: false,
      field: 'in_progress',
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });
