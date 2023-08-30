import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import Users from '../database/models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  dataValues: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  },
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

describe('POST /login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Deve retornar status 200 e chave token', async function () {
    sinon.stub(Users, 'findOne').resolves(userMock as Users);

    const res: Response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(res.status).to.be.eq(200);
    expect(res.body).to.have.property('token');
  });

  it('Deve retornar 400 e mensagem de erro', async () => {
    const res = await chai.request(app).post('/login').send({
      email: '',
      password: '',
    });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('message');
  });

  it('Deve retornar 401, quando email está incorreto', async () => {
    sinon.stub(Users, 'findOne').resolves(null);

    const res = await chai.request(app).post('/login').send({
      email: 'email@email.com',
      password: 'password',
    });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });

  it('Deve retornar 401, quando a senha está incorreta', async () => {
    sinon.stub(Users, 'findOne').resolves(null);

    const res = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'password',
    });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });
});

describe('GET /login/validate', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve retornar status 200 e a role', async () => {
    const validToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjkzNDE0MTc1LCJleHAiOjE2OTM1MDA1NzV9.UpT1em1KoqlH0htzIGfK_i0y5XxmKTuoOJ_u73Q-rFE';

    sinon.stub(jwt, 'verify').withArgs(validToken, 'jwt_secret').resolves({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    sinon.stub(Users, 'findOne').resolves(userMock as Users);

    const res: Response = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', `${validToken}`);

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('role', 'admin');
  });

  it('Deve retornar status 401 quando token invalido', async () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..UpT1em1KoqlH0htzIGfK_i0y5XxmKT';

    const res: Response = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', invalidToken);

    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });

  it('Deve retornar status 401 quando não tem token', async () => {
    const res: Response = await chai.request(app).get('/login/validate');

    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });
});
