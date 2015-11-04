####

A system to view and modify your logsDrain on heroku.

## Prerequist

`export HEROKU_API_TOKEN=<your-token>`

# Commands:

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
