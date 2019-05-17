const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
  const game = req.body;
  if (game && game.title && game.genre) {
    db('games').insert(game).then(([id]) => db('games').where({id}).first())
      .then(game => res.status(201).json(game))
      .catch(() => res.status(500).json({message: 'Error creating game'}));
  } else {
    res.status(422).json({message: 'Requires title and genre'});
  }
});

router.get('/', (req, res) => {
  db('games')
    .then(games => res.status(200).json(games))
    .catch(() => res.status(500).json({message: 'Error retrieving games'}));
});

module.exports = router;
