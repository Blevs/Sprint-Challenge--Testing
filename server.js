const express = require('express');
const gamesRoutes = require('./games/routes.js');

const server = express();
server.use(express.json());

server.use('/api/games', gamesRoutes);

module.exports = server;
