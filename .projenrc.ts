import { Datastore, RestApi, ServerlessProject, Workflow } from 'cdk-serverless/lib/projen';

const project = new ServerlessProject({
  cdkVersion: '2.140.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-serverless-v2-demo',
  gitpod: true,
  deps: [
    'projen',
    'cdk-serverless',
    'date-fns',
  ],
});

new RestApi(project, {
  apiName: 'MyApi',
  definitionFile: './src/definitions/myapi.yaml',
});

new Datastore(project, {
  modelName: 'MyModel',
  definitionFile: './src/definitions/mymodel.json',
});

new Workflow(project, {
  workflowName: 'TodoLifecycle',
  definitionFile: './src/definitions/todo-lifecycle.json',
});

project.synth();