const express = require('express');

// Setup a router that we will use for all the `/books` routes for pages with book lists/info
const bookRouter = express.Router();

// setup the actual routes for bookRouter
// Note that below the bookRouter is bound to `/books`,
// so the below routes are appended to that (i.e. `/` is the same as `/books`)
const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }
];
bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        nav: [
          { title: 'Books', link: '/books' },
          { title: 'Authors', link: '/authors' }
        ],
        title: 'Books',
        pagename: 'MyLibrary',
        books
      }
    );
  });
bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book!!');
  });

module.exports = bookRouter;
