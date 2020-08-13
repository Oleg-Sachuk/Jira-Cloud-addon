export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/hello-world', addon.authenticate(), (req, res) => {
        // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
        // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up.
        res.render(
          'hello-world.jsx', // change this to 'hello-world.hbs' or just 'hello-world' to use the handlebars version
          {
            title: 'Atlassian Connect'
            //, issueId: req.query['issueId']
            //, browserOnly: true // you can set this to disable server-side rendering for react views
          }
        );
    });

    // Add additional route handlers here...
}
