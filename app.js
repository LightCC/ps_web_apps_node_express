/* eslint-disable no-console */
const express = require('express');
const chalk = require('chalk');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
// const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { urlencoded } = require('body-parser');

const app = express();
// pull in PORT from nodemon config `nodemonConfig` in node's `package.json` file
// i.e. nodemon must be installed and configured, and run our app with nodemon instead of node
// default is 3000 if the config isn't setup
const port = process.env.PORT || 3000;

// app.xx are Express functions for managing the web site

// morgan('combined') for a lot of http info to the console
// morgan('tiny') for limited info
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

// app.use((req, res, next) => {
//   debug('my middleware');
//   next();
// });
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

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
