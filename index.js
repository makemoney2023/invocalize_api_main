const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv-flow').config();

require('./routes/middlewares/mongo');

const app = express()
const port = 3002

app.use(morgan('dev'))
app.use(cors({
    origin: "*"
}));


app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  if (req.originalUrl === '/api/stripe/webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});


// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.set('jwt', "ebeb1a5ada5cf38bfc2b49ed5b3100e0");

app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))

// Default Index Page
// app.use(express.static(__dirname + './build'));
// Send all other items to index file
// app.get('*', (req, res) => res.sendFile(__dirname + './build/index.html'));

// app.listen(port, () => {
//   console.log(`Example app listening at ${process.env.DOMAIN}:${port}`)
// })
module.exports = app;