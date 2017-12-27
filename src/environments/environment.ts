// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBkwFSk8bNjvHH-JL0VdXsIRmdjgNK6Pug',
    authDomain: 'medicapp-e38d2.firebaseapp.com',
    databaseURL: 'https://medicapp-e38d2.firebaseio.com',
    projectId: 'medicapp-e38d2',
    storageBucket: 'medicapp-e38d2.appspot.com',
    messagingSenderId: '101724408187'
  }
};
