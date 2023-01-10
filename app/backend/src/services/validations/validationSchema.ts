import * as Joi from 'joi';
import HttpException from '../../utils/http.exception';
import { mapStatusCode } from './statusCode';

export default function validateSchema(schema: Joi.Schema, data: object) {
  const { error, value } = schema.validate(data);

  if (error) {
    throw new HttpException(mapStatusCode(error.message), error.message);
  }

  return value;
}
