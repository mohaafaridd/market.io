const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`Database connected ${process.env.MONGODB_URL}`);
});

mongoose.connection.on('error', err => {
  console.log(`database error ${err}`);
});
