const express = require('express');
const router = express.Router();

const Task = require('../models/task');


// Allow cross server requests
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks)
});


router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task)
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.json({status: 'Task Saved'})
});

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task deleted'});
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
