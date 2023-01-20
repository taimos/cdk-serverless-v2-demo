import { awscdk } from "projen";
import { Datastore, RestApi, Workflow } from "./src/sls/projen";

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.59.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-serverless-v2-demo',
  projenrcTs: true,
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
  definitionFile: './src/definitions/myapi.yaml',
});

new Datastore(project, {
  modelName: 'MyModel',
  definitionFile: './src/definitions/mymodel.json',
})

new Workflow(project, {
  workflowName: 'TodoLifecycle',
  definitionFile: './src/definitions/todo-lifecycle.json',
})

project.synth();