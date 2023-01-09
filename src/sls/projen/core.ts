import * as pj from 'projen';

export interface CoreAspectOptions {
  //
}

export class CoreAspect extends pj.Component {

  constructor(app: pj.awscdk.AwsCdkTypeScriptApp, _options: CoreAspectOptions = {}) {
    super(app);

    app.addDevDeps(
      '@types/aws-lambda',
      '@types/uuid',
      '@types/lambda-log',
    );
    app.addDeps(
      '@taimos/lambda-toolbox',
      'uuid',
    );

    app.defaultTask!.prependExec('rm -rf cdk.out/');

  }

}