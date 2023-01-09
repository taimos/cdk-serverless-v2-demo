import { Construct } from 'constructs';
import { RestApi, RestApiProps } from '../sls/rest-api';
import { operations, paths } from './rest-model.generated';

export interface RestApiOpenapiProps extends Omit<RestApiProps<operations>, 'definitionFileName' | 'apiName'> {
  //
}

export class RestApiOpenapi extends RestApi<paths, operations> {

  constructor(scope: Construct, id: string, props: RestApiOpenapiProps) {
    super(scope, id, {
      ...props,
      apiName: 'MyApi',
      definitionFileName: './definitions/openapi.yaml',
    });
  }


}