
// TODO: in readme to logentries-api it's stated accessKey, the correct is accountKey
const leApi = require('logentries-api')({ accountKey: process.env.LOGENTRIES_API_KEY });
const hl = require('highland');

const LOG_TYPE = 'udp';

module.exports = {
  list: list,
  get: (hostname) => get(hostname),
  createLog: createLog,
  createHost: createHost,
  createLogAndHost: createLogAndHost,
}

function list() {
  leApi.getHosts(function(err, result) {
    if (err) console.log('err', err);
    else console.log('list:',result);
  });
}

function get(name) {
  leApi.getHost(name, function(err, result) {
    if (err) console.log('err', err);
    else console.log('get name:', name, '\n', result);
  });
}

// input a app object. Where app.name will be used as the log and host name.
// outputs a highland stream of data
function createLogAndHost(app) {
    return hl(function (push, next) {
        leApi.registerHost(app.name, function (err, data) {
          if(err) {
            push(err, { app: app, logs: data })
            return push(null, hl.nil);
          }
          leApi.createLog(
            app.name,
            LOG_TYPE,
            data.host_key,
            (error, logData) => {
              push(err, {
                app: app,
                logData: logData
              });
              push(null, hl.nil);
          });
        });
    });
}

function createHost(hostname) {
  leApi.registerHost(hostname, function(err, result) {
    if (err) console.log('err', err);
    else console.log('Created host:', hostname, '\n', result);
  });
}

function createLog(logName, logType, hostKey) {
  console.log('logName: ', logName);
  console.log('logType: ', logType);
  console.log('hostKey: ', hostKey);

 leApi.createLog(logName, logType, hostKey, function(err, result) {
   if (err) console.log('err', err);
   else console.log('Created log:', logName, '\n', result);
 });
}
