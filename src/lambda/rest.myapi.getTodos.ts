import { api } from '@taimos/cdk-serverless-v2/lib/lambda';
import { Todo, Index_GSI1_Name } from '../generated/datastore.mymodel-model.generated';
import { operations } from '../generated/rest.myapi-model.generated';

export const handler = api.createOpenApiHandler<operations['getTodos']>(async (ctx) => {
  ctx.logger.info(JSON.stringify(ctx.event));
  const list = await Todo.find({ GSI1PK: 'TODOS', GSI1SK: { begins_with: 'OPEN' } }, { index: Index_GSI1_Name });

  return list.map(i => ({
    id: i.id!,
    title: i.title!,
    description: i.description ?? 'N/A',
    lastUpdate: i.lastUpdated!,
    state: i.state!,
  }));
});