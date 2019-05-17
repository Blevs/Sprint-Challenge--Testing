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

module.exports = router;
