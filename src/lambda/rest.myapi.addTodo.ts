import { api, errors } from '@taimos/cdk-serverless-v2/lib/lambda';
import { operations } from '../generated/rest.myapi-model.generated';

export const handler = api.createOpenApiHandlerWithRequestBody<operations['addTodo']>(async (ctx, data) => {
  ctx.logger.info(JSON.stringify(ctx.event));
  ctx.logger.info(JSON.stringify(data));
  throw new errors.HttpError(500, 'Not yet implemented');
});