const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    name: String,
    description: String,
    casts: String,
    origin: String,
    genre: String,
    date: Date,
    artwork: String
});

filmSchema.index({
    '$**':"text"
});

const Film = mongoose.model("film", filmSchema);

module.exports = Film;
