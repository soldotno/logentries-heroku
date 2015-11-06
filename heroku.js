const Heroku = require('heroku-client');
const hl = require('highland');

// function getLogDrains(app) {
//   const logDrainApi = heroku.apps(app.id).logDrains();
//   const logDrainList =  hl.wrapCallback(logDrainApi.list.bind(logDrainApi));
//   //yield 'logDrains';
//   return logDrainList
// }

function getLogDrains(app) {
  const logDrainApi = heroku.apps(app.id).logDrains();
    return hl(function (push, next) {
      logDrainApi.list((err, res) => {
        push(err, {app: app, logs: res});
        push(null, hl.nil);
      });
    });
}


var heroku = new Heroku({
  token: process.env.HEROKU_API_TOKEN
});

const hkApps = heroku.apps();
const appList = hl.wrapCallback(hkApps.list.bind(hkApps));

function showAppNameThat(filter) {
  return appList()
    .flatMap(x => x)
    .map(getLogDrains)
    .flatten()
    .filter(filter)
    .map(app => ({
      name: app.app.name,
      logs: app.logs
    }))
    .errors(e => console.log('error: ', e))
}

function haveNoLogsDrain(app) {
  return  app.logs.length === 0
}

function haveLogsDrain(app) {
  return  app.logs.length !== 0
}

module.exports = {
  haveDrains: () => showAppNameThat(haveLogsDrain),
  missingDrains: () => showAppNameThat(haveNoLogsDrain),
  oneApp: () => showAppNameThat(isprosecco),
  addDrain: addDrain,
}

function isprosecco(app) {
  return app.name === 'prosecco'
}

function addDrain(appName, drainUrl) {
  heroku.apps(appName).logDrains().create({url: drainUrl}, (err, res) => {
    if (err) console.log('Error creating drain for %s. Error: ', appName, JSON.stringify(err));
    else console.log('LogDrain created: %s, is now draining to %s', appName, drainUrl);
  })
}
