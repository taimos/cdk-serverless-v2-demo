import { http, errors } from '@taimos/lambda-toolbox';
import { operations } from '../generated/rest.myapi-model.generated';

export const handler = http.createOpenApiHandler<operations['removeTodo']>(async (ctx) => {
  ctx.logger.info(JSON.stringify(ctx.event));

  throw new errors.HttpError(500, 'Not yet implemented');
});