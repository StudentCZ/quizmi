const express = require('express');
const app = express();
const cors = require('cors');

//Middleware
app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log('server has started on port 8000');
});
