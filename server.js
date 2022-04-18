const express = require('express');
const session = require('express-session');
const ConnectDB = require('./config/db');
const config = require('config');
const passport = require('passport');

const PORT = process.env.PORT || 3001;
const app = express();

//connect to mongoDB
ConnectDB();

//init middleware
app.use(
  session({
    secret: config.get('jwtSecret'),
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.json({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./middleware/passport');

app.get('/', (req, res) =>
  res.send('<a href="/auth/google">Authenticate with google<a>')
);

//create routes
app.use('/auth/google', require('./routes/auth/google'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
