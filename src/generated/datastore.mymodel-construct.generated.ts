/* eslint-disable */
import { AttributeType, ProjectionType } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { SingleTableDatastore, SingleTableDatastoreProps } from '@taimos/cdk-serverless-v2/lib/constructs';

export interface MyModelDatastoreProps extends Omit<SingleTableDatastoreProps, 'design'> {
  //
}

export class MyModelDatastore extends SingleTableDatastore {

  constructor(scope: Construct, id: string, props: MyModelDatastoreProps = {}) {
    super(scope, id, {
      ...props,
      design: {
        primaryKey: {
          partitionKey: 'PK',
          sortKey: 'SK',
        },
        // timeToLiveAttribute: 'TODO',
        globalIndexes: [
          {
            indexName: 'GSI1',
            partitionKey: {
              name: 'GSI1PK',
              type: AttributeType.STRING,
            },
            sortKey: {
              name: 'GSI1SK',
              type: AttributeType.STRING,
            },
            projectionType: ProjectionType.ALL,
            
          }
        ],
        localIndexes: [
          {
            indexName: 'LSI1',
            sortKey: {
              name: 'lastUpdated',
              type: AttributeType.STRING,
            },
            projectionType: ProjectionType.INCLUDE,
            nonKeyAttributes: ['id','lastUpdated','title'],
          }
        ],
      }
    });
  }

}