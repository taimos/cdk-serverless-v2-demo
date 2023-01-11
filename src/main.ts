import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyModelDatastore } from './generated/datastore.mymodel-construct.generated';
import { RestApiMyApi } from './generated/rest.myapi-api.generated';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const datastore = new MyModelDatastore(this, 'Datastore');

    const api = new RestApiMyApi(this, 'RestApi', {
      stageName: 'dev',
      singleTableDatastore: datastore,
    });

    new CfnOutput(this, 'ApiId', { value: api.api.restApiId });
    new CfnOutput(this, 'Table', { value: datastore.table.tableName });
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