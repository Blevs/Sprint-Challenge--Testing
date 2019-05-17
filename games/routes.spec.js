const server = require('../server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');

describe('Games Routes /api/games', () => {
  // apply migrations and seeds
  beforeEach(done => {
    db.migrate.rollback()
      .then(function() {
        db.migrate.latest()
          .then(function() {
            return db.seed.run()
              .then(function() {
                done();
              });
          });
      });
  });
  describe('post', () => {
    it('create new game', async () => {
      const testGame = {title: 'TestGame', genre: 'TestGenre', releaseYear: 2000};
      const res = await request(server)
            .post('/api/games/')
            .send(testGame);
      expect(res.status).toBe(201);
    });
    it('post returns game', async () => {
      const testGame = {title: 'TestGame', genre: 'TestGenre', releaseYear: 2000};
      let res = await request(server)
            .post('/api/games/')
            .send(testGame);
      expect(res.body.title).toBe(testGame.title);
      expect(res.body.genre).toBe(testGame.genre);
      expect(res.body.releaseYear).toBe(testGame.releaseYear);
      const testGame2 = {title: 'TestGame2', genre: 'TestGenre2'};
      res = await request(server)
            .post('/api/games/')
            .send(testGame2);
      expect(res.body.title).toBe(testGame2.title);
      expect(res.body.genre).toBe(testGame2.genre);
      expect(res.body.releaseYear).toBe(null);
    });
    it('Error on no title', async () => {
      const testGame = {genre: 'TestGenre', releaseYear: 2000};
      const {status} = await request(server)
            .post('/api/games/')
            .send(testGame);
      expect(status).toBe(422);
    });
    it('Error on no genre', async () => {
      const testGame = {title: 'TestGame', releaseYear: 2000};
      const {status} = await request(server)
            .post('/api/games/')
            .send(testGame);
      expect(status).toBe(422);
    });
  });
});
