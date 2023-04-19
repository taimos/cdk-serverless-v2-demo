/* eslint-disable */
import * as constructs from 'constructs';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import * as sls from 'cdk-serverless/lib/constructs';

export interface TodoLifecycleWorkflowProps extends Omit<sls.WorkflowProps, 'definitionFileName' | 'definitionSubstitutions'> {
  readonly stateConfig: {
    readonly table: ITable;
readonly reminderLambda: IFunction;
readonly stageName: string;
  };
}

export class TodoLifecycleWorkflow extends sls.Workflow {

  constructor(scope: constructs.Construct, id: string, props: TodoLifecycleWorkflowProps) {
    super(scope, id, {
      ...props,
      definitionFileName: './src/definitions/todo-lifecycle.json',
      definitionSubstitutions: {
        'table#DynamoDBTable': props.stateConfig.table.tableName,
'reminderLambda#LambdaFunction': props.stateConfig.reminderLambda.functionArn,
'stageName': props.stateConfig.stageName,
      }
    });
  }

}