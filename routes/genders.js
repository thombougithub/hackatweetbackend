var express = require('express');
var router = express.Router();
const Gender = require('../models/genders')


//Get gender of movies 

router.post('/', (req,res) => {
    Gender.findOne({id: req.body.id}).then(data => {
        if(data) {
        res.json({result : true, data : data})
        } else {
            res.json({result: false, error: 'nothing found'})
        } 
    })
})

module.exports = router;