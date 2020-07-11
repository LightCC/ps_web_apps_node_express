/* eslint-disable no-console */
const express = require('express');
const chalk = require('chalk');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

// morgan('combined') for a lot of http info to the console
// morgan('tiny') for limited info
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

bookRouter.route('/')
  .get((req, res) => {
    res.send('hello books!!');
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book!!');
  });

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
