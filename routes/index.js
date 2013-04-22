module.exports = function (app, plugin) {

  app.get('/',

    function(req, res) {
      res.format({
        'text/html': function () {
          res.redirect(plugin.descriptor.documentationUrl() || '/atlassian-plugin.xml');
        },
        'application/xml': function () {
          res.redirect('/atlassian-plugin.xml');
        }
      });
    }

  );

  app.get('/example',

    plugin.authenticate(),

    function(req, res) {
      res.render('example', {title: 'Express'});
    }

  );

};
