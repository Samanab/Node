const express = require("express");
const router = express.Router();
const Film = require("../models/film");
const Comment = require("../models/comment");


router.get("/movies", (req, res) => {
    Film.find()
    .exec()
    .then((foundfilms) => {
        res.render("movies", {films: foundfilms})
    })
});

router.get("/movies/new", (req, res) => {
    res.render("new_movies")
});

router.get("/movies/:id", (req, res) => {
    Film.findById(req.params.id)
    .exec()
    .then((film) => {
        Comment.find({filmId: req.params.id}, (err, comments) => {
            if (err) {
                res.send(err)
            } else {
                res.render("show_page", {film, comments})
            }
        })
    })
    .catch((err) => {
        res.send(err)
    })
})

router.post("/movies", (req, res) => {
    const genre = req.body.genre.toLowerCase();
    const newFilm = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        origin: req.body.origin,
        genre: genre,
        date: req.body.date,
        artwork: req.body.artwork
    }

    Film.create(newFilm)
    .then((film) => {
		console.log(film)
		res.redirect("/movies")
	})
	.catch((err) => {
		console.log(err)
		res.redirect("/movies")
	})
});

router.get("/movies/:id/edit", (req, res) => {
    Film.findById(req.params.id)
    .exec()
    .then((film) => {
        res.render("movie_edit", {film})
    })
    .catch((err) => {
        res.send(err)
    })

})

module.exports = router;