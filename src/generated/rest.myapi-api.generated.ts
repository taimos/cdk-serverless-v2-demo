/* eslint-disable */
import { Construct } from 'constructs';
import { RestApi, RestApiProps } from 'cdk-serverless/lib/constructs';
import { operations, paths } from './rest.myapi-model.generated';

export interface MyApiRestApiProps extends Omit<RestApiProps<operations>, 'definitionFileName' | 'apiName'> {
  //
}

export class MyApiRestApi extends RestApi<paths, operations> {

  constructor(scope: Construct, id: string, props: MyApiRestApiProps) {
    super(scope, id, {
      ...props,
      apiName: 'MyApi',
      definitionFileName: './src/definitions/myapi.yaml',
    });
  }

}