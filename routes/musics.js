var express = require('express');
var router = express.Router();
const Movie = require('../models/movies')
const User = require('../models/users')

// Get Search movies

router.post('/search', (req, res) => {
    const search = req.body.search
    fetch(`https://www.theaudiodb.com/api/v1/json/${process.env.MUSIC_API_KEY}/search.php?s=${search}`)
    .then(response => response.json())
    .then(data => {
        fetch(`https://www.theaudiodb.com/api/v1/json/${process.env.MUSIC_API_KEY}/searchalbum.php?s=${search}`)
        .then(response => response.json())
        .then(doc => {
            res.json({global : data , album : doc})
    })
})
})



module.exports = router;
