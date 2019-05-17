
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
        {id: 2, title: 'Put Put Save the Zoo', genre: 'Adventure'}
      ]);
    });
};
