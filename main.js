
const heroku = require('./heroku');
const logentries = require('./logentries');
const command = process.argv[2];
const args = process.argv[3];
const subarg = process.argv.slice(4);

console.log(command, args, subarg);

switch (command) {
  case 'logentries':
    logentries[args](...subarg)
      // .each((app) => {
      //    console.log(app);
      // })
    break;
  case 'heroku':
    heroku[args](...subarg)
      .each((app) => {
         console.log(app);
      })
    break;
  default:
    usage();

}


function usage() {
  const output = `
  usage: ${process.argv[1]} command args
  Commands:
    heroku
      arguments:
        haveDrains
          List all apps and info about the logDrains that are setup.

        missingDrains
          List all apps that are missing Drains

    logentries
      arguments:
        list
          List all info about all hosts
        get(hostname);
          List info about one host
  `
  console.log(output);
}
