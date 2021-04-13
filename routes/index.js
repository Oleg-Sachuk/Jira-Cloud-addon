export default function routes(app) {
  const fetch = require('node-fetch');
  const config = require('../configdb');
  const mysql = require('mysql2/promise');
  const moment = require('moment');

  // Redirect root path to /atlassian-connect.json,
  // which will be served by atlassian-connect-express.
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json');
  });

  app.get('/getissue', (req, res) => {
    let data;
    fetch('https://oleg-test.atlassian.net/rest/api/3/search', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          'sachuk.o.a@gmail.com:X8BvJRasXAzVtvDOA3b92690'
        ).toString('base64')}`,
        'Accept': 'application/json'
      }
    })
      .then(response => {
        try {
          mysql.createConnection(config).then( connection => connection.execute(`INSERT INTO \`log\` (\`curr_time\`,\`did\`,\`success\`) VALUES ('${moment().format('lll')}', 
          'Page loaded (issue data inserted)', '${response.status} - ${response.statusText}');`))
        } catch (error) {
          console.log(error);
        }
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.json();
      })
      .then(text => {
        console.log(text.issues[2].fields.assignee.displayName)
        data = text;
        // console.log("Fetched data: ",data);
        res.status(200).json(data)
      })
      .catch(err => console.error(err));
  })

  app.post('/getfilter', (req, res) => {
    console.log(req.body.filter);
    let data;
    fetch(`https://oleg-test.atlassian.net/rest/api/3/filter${req.body.filter}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          'sachuk.o.a@gmail.com:X8BvJRasXAzVtvDOA3b92690'
        ).toString('base64')}`,
        'Accept': 'application/json'
      }
    })
      .then(response => {
        try {
          mysql.createConnection(config).then( connection => connection.execute(`INSERT INTO \`log\` (\`curr_time\`,\`did\`,\`success\`) VALUES ('${moment().format('lll')}', 
          'filter chosen (${req.body.filter})', '${response.status} - ${response.statusText}');`))
        } catch (error) {
          console.log(error);
        }
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.json();
      })
      .then(text => {
        data = text;
        console.log("Fetched data: ", data);
        res.status(200).json(data)
      })
      .catch(err => console.error(err));
  })

  app.post('/getdata', (req, res) => {
    console.log(req.body.url);
    let data;
    fetch(`${req.body.url}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          'sachuk.o.a@gmail.com:X8BvJRasXAzVtvDOA3b92690'
        ).toString('base64')}`,
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.json();
      })
      .then(text => {
        data = text;
        console.log("Fetched data: ", data);
        res.status(200).json(data)
      })
      .catch(err => console.error(err));
  })



  // This is an example route used by "generalPages" module (see atlassian-connect.json).
  // Verify that the incoming request is authenticated with Atlassian Connect.
  app.get('/hello-world', (req, res) => {
    // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
    // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
    res.render(
      'hello-world.jsx', // change this to 'hello-world.jsx' to use the Atlaskit & React version
      {
        title: 'Atlassian Connect'
        //, issueId: req.query['issueId']
        //, browserOnly: true // you can set this to disable server-side rendering for react views
      }
    );
  });

  // Add additional route handlers here...
}
