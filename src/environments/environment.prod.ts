const packageJson = require('../../package.json');

export const environment = {
  appName: 'Liste de lecture',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: 'AIzaSyBaWr0R15WxO-6-o55juglU0DWNVQvvTPY',
    authDomain: 'kevdemo-111.firebaseapp.com',
    databaseURL: 'https://kevdemo-111.firebaseio.com',
    projectId: 'kevdemo-111',
    storageBucket: '',
    messagingSenderId: '214483439746',
    appId: '1:214483439746:web:f2069d818411bd4b46649b'
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
