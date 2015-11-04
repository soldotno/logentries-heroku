
// TODO: in readme to logentries-api it's stated accessKey, the correct is accountKey
var leApi = require('logentries-api')({ accountKey: process.env.LOGENTRIES_API_KEY });

module.exports = {
  list: list,
  get: (hostname) => get(hostname),
}

function list() {
  leApi.getHosts(function(err, result) {
    if (err) console.log('err', err);
    else console.log('list:',result);
  });
}

function get(hostname) {
  leApi.getHost(hostname, function(err, result) {
    if (err) console.log('err', err);
    else console.log('get hostname:', result);
  });
}

// leApi.registerHost(hostname, function(err, result) {
//   ...
// });
//
// leApi.createLog(logName, logType, hostKey, function(err, result) {
//
// });
