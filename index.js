require('dotenv').config();
const server = require('./server.js');

server.listen(3500, () => console.log('server on 3500'));
