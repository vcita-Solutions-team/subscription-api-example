/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
// const { createServer } = require('http');
const cors = require('cors');
const functions = require('firebase-functions');
const express = require('express');

const app = express();
// const httpServer = createServer(app);
const apiRoutes = require('./api/api.routes');

app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(express.json());
// const port = process.env.PORT || 3033;

app.use('/api', apiRoutes);
app.get('/*', (req, res) => {
  res.send('<h1>405- Page not found</h1>');
});

// httpServer.listen(port, () => {
//   console.info(`Server listening on port ${port}!`);
// });

exports.gateKeeper = functions.https.onRequest(app);
