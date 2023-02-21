import HttpException from '../utils/HttpException';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import { IMatch, IMatchGoals } from '../interfaces';

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

    const awayTeam = await Matches.findByPk(match.awayTeam);

    const homeTeam = await Matches.findByPk(match.homeTeam);

    if (!awayTeam || !homeTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    const statusMatches = await Matches.create({ ...match, inProgress: true });

    return statusMatches;
  };

  update = async (id: number) => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };

  updateGoals = async (id: number, body: IMatchGoals) => {
    await Matches.update(
      {
        homeTeamGoals: body.homeTeamGoals,
        awayTeamGoals: body.awayTeamGoals,
      },
      { where: { id } },
    );
  };
}
