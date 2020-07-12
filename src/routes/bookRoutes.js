const express = require('express');
// Setup a router that we will use for all the `/books` routes for pages with book lists/info
const bookRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();
const debug = require('debug')('app:bookRoutes');

const db = new sqlite3.Database('library.db3');

// setup the actual routes for bookRouter
// Note that below the bookRouter is bound to `/books`,
// so the below routes are appended to that (i.e. `/` is the same as `/books`)
function router(nav) {
  bookRouter.route('/')
    .all((req, res, next) => {
      db.all('select * from books', (err, records) => {
        req.books = records;
        debug('retreive books');
        next();
      });
    })
    .get((req, res) => {
      debug(req.books);
      res.render(
        'bookListView',
        {
          nav,
          title: 'Book List',
          pagename: 'MyLibrary - Books',
          books: req.books
        }
      );
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
