const heroku = require('./heroku');
const logentries = require('./logentries');
const hl = require('highland');

const LOGENTRIES_DRAIN_PREFIX = 'syslog://api.logentries.com:'

function createLogOnMissingDrains() {
   heroku
     .missingDrains()
    .map(logentries.createLogAndHost)
    .flatten()
    .each(appLog =>  {
      heroku.addDrain(appLog.app.name, LOGENTRIES_DRAIN_PREFIX + appLog.logData.log.port);
    })

}

//By running this all missing apps will get a Dyno in logentries.
createLogOnMissingDrains();
