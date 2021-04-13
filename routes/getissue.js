// const fetch = require('node-fetch');

// module.exports = fetch('https://oleg-test.atlassian.net/rest/api/3/search', {
//     method: 'GET',
//     headers: {
//         'Authorization': `Basic ${Buffer.from(
//             'sachuk.o.a@gmail.com:X8BvJRasXAzVtvDOA3b92690'
//         ).toString('base64')}`,
//         'Accept': 'application/json'
//     }
// })
//     .then(response => {
//         console.log(
//             `Response: ${response.status} ${response.statusText}`
//         );
//         return response.render('hello-world', {data});
//     })
//     .then(text => console.log(text.issues[2].fields.assignee.displayName))
//     .catch(err => console.error(err));

