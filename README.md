# Express Web App for Atlassian Plugins 3

Congratulations! You've successfully created an Express web application for use with the Atlassian Plugins 3 framework. This web app greatly simplifies the creation of Atlassian Plugins 3 Add-ons by simplifying the following:

* Automatic public and private key generation
* Verification of OAuth signatures through the use of a custom Express middleware
* OAuth signing of outbound HTTP requests back to the host
* Auto registration and deregistration of your add-on in development mode
* Persistent storage of the host client information (i.e., client key, host public key, and other useful host information)
* Persistent add-on data storage through a key/value store
* Dynamic re-registration of your add-on when the atlassian-plugin.xml is modified

## What's next?

The first thing you'll want to do is determine the host (i.e., Atlassian JIRA/Confluence instance) where you want to host your add-on during development. You have a few options here:

1. You can use an OnDemand instance... TODO
2. Or, you can can use the [Atlassian SDK](developer.atlassian.com) to run a standalone development environment of JIRA or Confluence (`atlas-run-standalone --product <jira|confluence>`
3. Or, you can use a [JIRA or Confluence Vagrant VM](https://bitbucket.org/rmanalan/p3-dev-env-vagrant)

Once you've determined the host for your add-on `config.json` file with the base URL of your host(s) as well any other information you'd like to change.

When you're ready, make sure your host is up and available, then run the following:

    node app.js

This will start your add-on on the port you've specified in `config.json` and register you add-on's `atlassian-plugin.xml` with your host(s). Once it's up, you can log into your host and use your add-on.