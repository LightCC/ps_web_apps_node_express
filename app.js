/* eslint-disable no-console */
const express = require('express');
const chalk = require('chalk');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
// pull in PORT from nodemon config `nodemonConfig` in node's `package.json` file
// i.e. nodemon must be installed and configured, and run our app with nodemon instead of node
// default is 3000 if the config isn't setup
const port = process.env.PORT || 3000;
// Setup a router that we will use for all the `/books` routes for pages with book lists/info
const bookRouter = express.Router();

// app.xx are Express functions for managing the web site

// morgan('combined') for a lot of http info to the console
// morgan('tiny') for limited info
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

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

// bookRouter likely needs to be assigned after setting up the routes, so it's down here
app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [
        { title: 'Books', link: '/books' },
        { title: 'Authors', link: '/authors' }
      ],
      title: 'Library',
      pagename: 'MyLibrary'
    }
  );
});

app.listen(port, () => {
  console.log(`listening on port ${chalk.green(port)}`);
});
