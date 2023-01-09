import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      field: 'team_name',
      type: STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

export default Teams;
