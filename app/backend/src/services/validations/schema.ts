import * as Joi from 'joi';

const campos = {
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
};

const loginSchema: Joi.Schema = Joi.object({
  email: Joi.string().email().required().messages(campos),
  password: Joi.string().min(6).required().messages(campos),
});

const matchesSchema: Joi.Schema = Joi.object({
  homeTeam: Joi.number().integer().required(),
  awayTeam: Joi.number().integer().required(),
  homeTeamGoals: Joi.number().integer().required(),
  awayTeamGoals: Joi.number().integer().required(),
});

export { loginSchema, matchesSchema };
