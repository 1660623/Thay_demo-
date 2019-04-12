const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./models/db');
const User = require('./models/user');
const auth = require('./middleware/auth')
// Create app
const app = express();
const port = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Add middlewares
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

// Check login user
app.use(auth);

//Static file
app.use(express.static('./public'));

//auth

// Load routes
// app.use('/', require('./routes/home'));
app.use('/todo', require('./routes/todo'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

app.get('/', (req, res)=>{
  res.redirect('/auth/login');
})
// Connect database
db.sync().then(function() {
  app.listen(port);
  console.log(`Server is listening on port ${port}`);
}).catch(function(err) {
  console.log(err);
  process.exit(1);
});
