import { http, errors } from '@taimos/lambda-toolbox';
import { operations } from '../generated/rest-model.generated';

export const handler = http.createOpenApiHandler<operations['getTodoById']>(async (ctx) => {
  ctx.logger.info(JSON.stringify(ctx.event));
  
  throw new errors.HttpError(500, 'Not yet implemented');
});