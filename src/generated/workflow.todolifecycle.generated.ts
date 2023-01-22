import * as constructs from 'constructs';
import * as sls from '@taimos/cdk-serverless-v2/lib/constructs';

export interface TodoLifecycleWorkflowProps extends Omit<sls.WorkflowProps, 'definitionFileName' | 'definitionSubstitutions'> {
  readonly stateConfig: {
    readonly table: sls.DynamoDBStateConfig;
readonly reminderLambda: sls.LambdaStateConfig;
readonly stageName: string;
  };
}

export class TodoLifecycleWorkflow extends sls.Workflow {

  constructor(scope: constructs.Construct, id: string, props: TodoLifecycleWorkflowProps) {
    super(scope, id, {
      ...props,
      definitionFileName: './src/definitions/todo-lifecycle.json',
      definitionSubstitutions: {
        'table#DynamoDBTable': props.stateConfig.table.table.tableName,
'reminderLambda#LambdaFunction': props.stateConfig.reminderLambda.handler.functionArn,
'stageName': props.stateConfig.stageName,
      }
    });

    if (props.stateConfig.table.writable ?? false) {
  props.stateConfig.table.table.grantReadWriteData(this);
} else {
  props.stateConfig.table.table.grantReadData(this);
}
props.stateConfig.reminderLambda.handler.grantInvoke(this);

  }

}