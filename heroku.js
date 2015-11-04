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

var hkApps = heroku.apps();
var appList = hl.wrapCallback(hkApps.list.bind(hkApps));

function showAppNameThat(filter) {
  appList()
    .flatMap(x => x)
    .map(getLogDrains)
    .flatten()
    .filter(filter)
    .map(app => ({
      name: app.app.name,
      logs: app.logs
    }))
    .errors(e => console.log('error: ', e))
    .each((a) => {
       console.log(JSON.stringify(a, null, 2));
    })
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
}
