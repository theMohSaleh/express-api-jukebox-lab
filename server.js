const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');

const tracksController = require('./controllers/tracks.js')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(methodOverride('_method'))

app.use(express.json());

// Routes go here

app.get('/', (req, res) => {
    res.send('Hello index')
})

app.use('/tracks', tracksController)

app.listen(3000, () => {
  console.log('The express app is ready!');
});