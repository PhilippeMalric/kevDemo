const packageJson = require('../../package.json');

export const environment = {
  appName: 'Angular Ngrx Material Starter',
  envName: 'TEST',
  production: false,
  test: true,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: "",
    authDomain: "votoire-ec754.firebaseapp.com",
    databaseURL: "https://votoire-ec754.firebaseio.com",
    projectId: "votoire-ec754",
    storageBucket: "votoire-ec754.appspot.com",
    messagingSenderId: "869485557727",
    appId: "1:869485557727:web:d8ed2f31e7bd8b04ed366a"
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
