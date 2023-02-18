import { api, errors } from '@taimos/cdk-serverless-v2/lib/lambda';
import { operations } from '../generated/rest.myapi-model.generated';

export const handler = api.createOpenApiHandler<operations['getTodoById']>(async (ctx) => {
  ctx.logger.info(JSON.stringify(ctx.event));
  
  throw new errors.HttpError(500, 'Not yet implemented');
});