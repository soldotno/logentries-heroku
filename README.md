####

A system to view and modify your logsDrain on heroku.

## Prerequist

Setup heroku and/or logentries env.var.
`export HEROKU_API_TOKEN=<your-token>`
`export LOGENTRIES_API_KEY=<your-api-key>`


#Usage

node main.js [command] [argouments]

# Commands:

```text
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
```

# Add Logentries to Heroku

`node herokuToLogentries.js`

This will add Logentries to all Heroku apps that are missing a [drain](https://devcenter.heroku.com/articles/log-drains)
