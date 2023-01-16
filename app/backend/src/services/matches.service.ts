import HttpException from '../utils/http.exception';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import { IMatch } from '../interfaces';

export default class MatchesService {
  findAll = async () => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  };

  findAllProgress = async (bool: boolean) => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: bool },
    });

    return matches;
  };

  create = async (match: IMatch) => {
    if (match.awayTeam === match.homeTeam) {
      throw new HttpException(
        422,
        'It is not possible to create a match with two equal teams',
      );
    }

    const statusMatches = await Matches.create({ ...match, inProgress: true });

    return statusMatches;
  };

  update = async (id: number) => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };
}
