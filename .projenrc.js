const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.59.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-serverless-v2-demo',
  deps: [
    'projen',
    '@taimos/lambda-toolbox',
    'uuid',
    'date-fns',
    'esbuild',
    'js-yaml',
    'openapi-typescript',
  ],
  devDeps: [
    '@types/aws-lambda',
    '@types/uuid',
    '@types/js-yaml',
    '@types/lambda-log',
  ],
});

const generateTask = project.addTask('generate:api', {
  exec: 'openapi-typescript definitions/openapi.yaml --output src/generated/rest-model.generated.ts',
  description: 'Generate Types from the OpenAPI specification',
});
project.preCompileTask.prependSpawn(generateTask);

project.synth();