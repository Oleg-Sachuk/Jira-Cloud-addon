module.exports = function (app, addon) {

  app.get('/',

    function(req, res) {
      res.format({
        'text/html': function () {
          res.redirect(addon.descriptor.documentationUrl() || '/atlassian-plugin.xml');
        },
        'application/xml': function () {
          res.redirect('/atlassian-plugin.xml');
        }
      });
    }

  );

  app.get('/example',

    // Protect this resource with OAuth
    addon.authenticate(),

    function(req, res) {
      res.render('example', {title: 'Express'});
    }

  );

};
