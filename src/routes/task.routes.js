const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks)
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.json({status: 'Task Saved'})
});

// router.get('/', (req, res) => {
//     Task.find(function (err, tasks)  {
//         console.log(tasks);
//     });
//     res.json({
//         status: 'API is working'
//     });
// });

module.exports = router;


// res.send('Hello World');
// res.json({
//     status: 'API is working'
