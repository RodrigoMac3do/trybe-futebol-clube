import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    id: 1,
    teamName: 'Team 1',
  },
  {
    id: 2,
    teamName: 'Team 2',
  },
];

describe('GET /teams', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Deve retornar status 200 e uma lista de times', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);

    const res = await chai.request(app).get('/teams');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('GET /teams/:id', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Deve retornar 200 e um time', async () => {
    sinon.stub(Team, 'findOne').resolves(teamsMock[0] as Team);

    const res = await chai.request(app).get('/teams/1');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
  });

  it('Deve retornar status 404 quando não existir o time', async () => {
    sinon.stub(Team, 'findByPk').resolves(null);

    const res = await chai.request(app).get('/teams/999');

    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('message');
  });
});
