import { Construct } from 'constructs';
import { RestApi, RestApiProps } from '../sls/constructs';
import { operations, paths } from './rest.myapi-model.generated';

export interface RestApiMyApiProps extends Omit<RestApiProps<operations>, 'definitionFileName' | 'apiName'> {
  //
}

export class RestApiMyApi extends RestApi<paths, operations> {

  constructor(scope: Construct, id: string, props: RestApiMyApiProps) {
    super(scope, id, {
      ...props,
      apiName: 'MyApi',
      definitionFileName: './definitions/myapi.yaml',
    });
  }


}