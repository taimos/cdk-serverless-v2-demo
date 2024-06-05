import { api, errors } from 'cdk-serverless/lib/lambda';
import { Todo } from '../generated/datastore.mymodel-model.generated';
import { operations } from '../generated/rest.myapi-model.generated';

export const handler = api.createOpenApiHandler<operations['getTodoById']>(async (ctx) => {
  ctx.logger.info(JSON.stringify(ctx.event));

  const todo = await Todo.get({ id: ctx.event.pathParameters!.id });
  if (!todo) {
    throw new errors.NotFoundError();
  }

  return {
    id: todo.id!,
    title: todo.title!,
    description: todo.description ?? 'N/A',
    lastUpdate: todo.lastUpdated!,
    state: todo.state!,
  };
});