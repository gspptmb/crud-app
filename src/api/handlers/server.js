const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());

app.listen(port, () => {
    console.log(`server is listening on port ${port}!`);
});

app.use(express.static(path.join(__dirname, '../../../public')));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../../client/index.html'))
);

app.use('/api', require('../handlers/services/routes'));
