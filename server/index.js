const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//Middleware
app.use(cors());
app.use(express.json());

//Routes

app.listen(8000, () => {
  console.log('server has started on port 8000');
});
