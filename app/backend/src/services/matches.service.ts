import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

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

  create = async (match: object) => {
    const statusMatches = Matches.create({ ...match, inProgress: true });

    return statusMatches;
  };
}
