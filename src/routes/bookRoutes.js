const express = require('express');
// Setup a router that we will use for all the `/books` routes for pages with book lists/info
const bookRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();
// const debug = require('debug')('app:bookRoutes');

const db = new sqlite3.Database('library.db3');

// setup the actual routes for bookRouter
// Note that below the bookRouter is bound to `/books`,
// so the below routes are appended to that (i.e. `/` is the same as `/books`)
function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      db.all('select * from books', (err, records) => {
        res.render(
          'bookListView',
          {
            nav,
            title: 'Book List',
            pagename: 'MyLibrary - Books',
            books: records
          }
        );
      });
    });
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    db.all(`select * from books where id = ${id}`, (err, record) => {
      res.render(
        'bookView',
        {
          nav,
          title: 'Book Info',
          pagename: 'MyLibrary - Book Info',
          book: record[0]
        }
      );
    });
  });
  return bookRouter;
}

module.exports = router;
