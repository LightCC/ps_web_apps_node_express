const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();
          res.render(
            'bookListView',
            {
              nav,
              title: 'Book List',
              pagename: 'MyLibrary - Books',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  bookRouter.route('/:id')
    .all((req, res, next) => {
      const { id } = req.params;
      db.all(`select * from books where id = ${id}`, (err, record) => {
        debug(`retreive "${record[0].title}"`);
        [req.book] = record;
        next();
      });
    })
    .get((req, res) => {
      res.render(
        'bookView',
        {
          nav,
          title: 'Book Info',
          pagename: 'MyLibrary - Book Info',
          book: req.book
        }
      );
    });
  return bookRouter;
}

module.exports = router;
