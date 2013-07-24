# Atlassian Add-on using Express

Congratulations! You've successfully created an Atlassian Connect Add-on using the Express web application framework. This web app greatly simplifies the creation of Atlassian Add-ons by simplifying the following:

* Automatic public and private key generation
* Verification of OAuth signatures through the use of a custom Express middleware
* OAuth signing of outbound HTTP requests back to the host
* Auto registration and deregistration of your add-on in development mode
* Persistent storage of the host client information (i.e., client key, host public key, and other useful host information)
* Persistent add-on data storage through a key/value store
* Dynamic re-registration of your add-on when the atlassian-plugin.xml is modified

## What's next?

[Read the docs](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/README.md#markdown-header-install-dependencies).