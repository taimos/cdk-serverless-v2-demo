import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { CognitoAuthentication } from 'cdk-serverless/lib/constructs/authentication';
import { Construct } from 'constructs';
import { MyModelDatastore } from './generated/datastore.mymodel-construct.generated';
import { MyApiRestApi } from './generated/rest.myapi-api.generated';
import { TodoLifecycleWorkflow } from './generated/workflow.todolifecycle.generated';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const datastore = new MyModelDatastore(this, 'Datastore');

    const authentication = new CognitoAuthentication(this, 'Auth', {
      userPoolName: 'myPool',
      triggers: {
        preTokenGeneration: true,
      },
    });

    const api = new MyApiRestApi(this, 'RestApi', {
      stageName: 'dev',
      singleTableDatastore: datastore,
      authentication,
      cors: true,
    });

    const workflow = new TodoLifecycleWorkflow(this, 'Workflow', {
      stateConfig: {
        stageName: 'dev',
        reminderLambda: api.getFunctionForOperation('addTodo'),
        table: datastore.table,
      },
    });

    api.getFunctionForOperation('addTodo').grantInvoke(workflow);
    datastore.table.grantReadWriteData(workflow);

    new CfnOutput(this, 'ApiId', { value: api.api.restApiId });
    new CfnOutput(this, 'Table', { value: datastore.table.tableName });
    new CfnOutput(this, 'SfnArn', { value: workflow.workflowArn });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'cdk-serverless-v2-demo-dev', { env: devEnv });
// new MyStack(app, 'cdk-serverless-v2-demo-prod', { env: prodEnv });

app.synth();