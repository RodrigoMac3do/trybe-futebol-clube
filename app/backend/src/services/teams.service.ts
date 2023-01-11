import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  findAll = async () => {
    const teams = await Teams.findAll();

    return teams;
  };
}
