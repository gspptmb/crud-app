const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());

app.listen(port, () => {
    console.log(`server is listening on port ${port}!`);
});

app.use('/api', require('./api/routes'));
