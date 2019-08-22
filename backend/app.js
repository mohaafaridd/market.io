const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const database = require('./db/mongoose');

const PORT = process.env.PORT || 3000;
const DEFAULT_PATH = path.join(__dirname, '..', 'build');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(DEFAULT_PATH));

app.get('*', (req, res) => {
  res.sendFile(path.join(DEFAULT_PATH, 'index.html'));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
