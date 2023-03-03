const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');

//Middleware
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(8000, () => {
  console.log('server has started on port 8000');
});
