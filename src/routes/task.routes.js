const express = require('express');
const router = express.Router();

const Task = require('../models/task')

router.get('/', (req, res) => {
    Task.find(function (err, tasks)  {
        console.log(tasks);
    });
    res.json({
        status: 'API is working'
    });
});

module.exports = router;


// res.send('Hello World');
// res.json({
//     status: 'API is working'
