import * as Joi from 'joi';
import HttpException from '../../utils/HttpException';
import { mapStatusCode } from './statusCode';

export default class ValidateSchema {
  public validate = (schema: Joi.Schema, data: object) => {
    const { error, value } = schema.validate(data);

    if (error) {
      throw new HttpException(mapStatusCode(error.message), error.message);
    }

    return value;
  };
}
