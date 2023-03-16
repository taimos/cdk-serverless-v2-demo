/* eslint-disable */
import { Model, Table, Entity } from 'dynamodb-onetable';
import { env } from 'process';
import { Dynamo } from 'dynamodb-onetable/Dynamo';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const dynamoClient = new Dynamo({ client: new DynamoDBClient({}) })
export const TABLE_NAME: string = env.TABLE!;

export const Index_primary_Name = 'primary';
export const Index_primary_HashKey = 'PK';
export const Index_primary_SortKey = 'SK';

export const Index_GSI1_Name = 'GSI1';
export const Index_GSI1_HashKey = 'GSI1PK';
export const Index_GSI1_SortKey = 'GSI1SK';

export const Index_LSI1_Name = 'LSI1';
export const Index_LSI1_HashKey = 'undefined';
export const Index_LSI1_SortKey = 'lastUpdated';


export const Schema = {
  "indexes": {
    "primary": {
      "hash": "PK",
      "sort": "SK"
    },
    "GSI1": {
      "hash": "GSI1PK",
      "sort": "GSI1SK",
      "project": "ALL"
    },
    "LSI1": {
      "type": "local",
      "sort": "lastUpdated",
      "project": [
        "id",
        "lastUpdated",
        "title"
      ]
    }
  },
  "models": {
    "Todo": {
      "PK": {
        "type": String,
        "value": "TODO#${id}"
      },
      "SK": {
        "type": String,
        "value": "TODO#${id}"
      },
      "id": {
        "type": String,
        "required": true,
        "generate": "uuid"
      },
      "GSI1PK": {
        "type": String,
        "value": "TODOS"
      },
      "GSI1SK": {
        "type": String,
        "value": "${state}#${title}"
      },
      "lastUpdated": {
        "type": String,
        "required": true
      },
      "title": {
        "type": String,
        "required": true
      },
      "description": {
        "type": String
      },
      "state": {
        "type": String,
        "enum": [
          "OPEN",
          "IN PROGRESS",
          "DONE"
        ],
        "required": true,
        "default": "OPEN"
      }
    }
  },
  "version": "0.1.0",
  "format": "onetable:1.1.0",
  "queries": {}
};

export const table = new Table({
  client: dynamoClient,
  name: TABLE_NAME,
  schema: Schema,
  isoDates: true,
  // logger: true,
  hidden: false,
});

export type TodoType = Entity<typeof Schema.models.Todo>
export const Todo: Model<TodoType> = table.getModel<TodoType>('Todo');


