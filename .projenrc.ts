import { awscdk } from "projen";
import { RestApi } from "./src/sls/projen";

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.59.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-serverless-v2-demo',
  deps: [
    'projen',
    'date-fns',
    'esbuild',
    'js-yaml',
    'openapi-typescript',
  ],
  devDeps: [
    '@types/js-yaml',
  ],
});

new RestApi(project, {
  apiName: 'MyApi',
  definitionFile: './definitions/myapi.yaml',
});

project.synth();