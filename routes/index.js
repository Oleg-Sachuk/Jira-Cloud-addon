module.exports = function (app, addon) {

  // Root route. This route will serve the `atlassian-plugin.xml` unless the
  // plugin-info>param[documentation.url] inside `atlassian-plugin.xml` is set... else
  // it will redirect to that documentation URL
  app.get('/',

    function(req, res) {
      // Use content-type negotiation to choose the best way to respond
      res.format({
        // If the request content-type is text-html, it will decide which to serve up
        'text/html': function () {
          res.redirect(addon.descriptor.documentationUrl() || '/atlassian-plugin.xml');
        },
        // This logic is here to make sure that the `atlassian-plugin.xml` is always
        // served up when requested by the host
        'application/xml': function () {
          res.redirect('/atlassian-plugin.xml');
        }
      });
    }

  );

  // This is an example route that's used by the default <general-page> modules
  app.get('/hello-world',

    // Require authentication with Atlassian Connect's OAuth signing
    addon.authenticate(),

    function(req, res) {
      // Rendering a template is easy; the `render()` takes two params: name of template
      // and a json object to pass the context in
      res.render('hello-world', {title: 'Atlassian Connect'});
    }

  );

  // Add any additional route handlers you need for views or REST resources here...

};
