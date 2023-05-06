const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const path = require('path');

const _dirName = path.dirName('');
const buildPath = path.join(_dirName, '../client/build');

app.use(express.static(buildPath));

//Middleware
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(8000, () => {
  console.log('server has started on port 8000');
});
