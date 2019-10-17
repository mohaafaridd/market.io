const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./db/mongoose');
const { connectRoutes } = require('./routes/routes');
const DEFAULT_PATH = path.join(__dirname, 'public');
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(connectRoutes());

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
