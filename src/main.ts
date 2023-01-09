import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RestApiOpenapi } from './generated/rest-api.openapi.generated';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const api = new RestApiOpenapi(this, 'RestApi', {
      stageName: 'dev',
    });

    new CfnOutput(this, 'ApiId', { value: api.api.restApiId });
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