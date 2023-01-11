import HttpException from '../utils/http.exception';
import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  findAll = async () => {
    const teams = await Teams.findAll();

    return teams;
  };

  findById = async (id: number) => {
    const team = await Teams.findOne({ where: { id } });

    if (team === null) throw new HttpException(404, 'Time não encontrado');

    return team;
  };
}
