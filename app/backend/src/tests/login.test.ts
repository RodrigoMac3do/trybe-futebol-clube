import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/UsersModel';
import { validAdmin, invalidAdmin, token } from './mocks/user';

import { Response } from 'superagent';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste do metodo POST de /login', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  // it('Login é efetuado com sucesso', async () => {
  //   sinon.stub(User, 'findOne').resolves(validAdmin as User);
  //   sinon.stub(jwt, 'sign').resolves(token as string);

  //   chaiHttpResponse = await chai.request(app).post('/login').send(validAdmin);

  //   expect(chaiHttpResponse.status).to.be.equal(200);
  //   expect(chaiHttpResponse.body).to.be.deep.equal({ token });
  // });

  it('Usuário não informa email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: validAdmin.password });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('Usuário não informa password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: validAdmin.email });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('Usuário informa apenas o email incorreto', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: invalidAdmin.email,
      password: validAdmin.password,
    });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Incorrect email or password',
    });
  });

  it('Usuário informa apenas o password incorreto', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: validAdmin.email,
      password: invalidAdmin.password,
    });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Incorrect email or password',
    });
  });
});
