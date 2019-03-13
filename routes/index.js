import fs from 'fs';
import path from 'path';

export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/hello-world', addon.authenticate(), (req, res) => {
        // Rendering a template is easy; the render method takes two params:
        // name of template and a json object to pass the context in.
        res.render('hello-world', {
            title: 'Atlassian Connect'
            //issueId: req.query['issueId']
        });
    });

    // Add additional route handlers here...

    // Load additional files in routes directory.
    {
        const files = fs.readdirSync('routes');
        files.forEach(file => {
            if (file !== 'index.js' && path.extname(file) === '.js') {
                const routes = require('./' + path.basename(file));
                if (typeof routes === 'function') {
                    routes(app, addon);
                }
            }
        });
    }
}
